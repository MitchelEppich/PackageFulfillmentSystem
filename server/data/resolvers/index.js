const { Order, SttCache } = require("../../models");

const UserResolvers = require("./User");
const LogResolvers = require("./Log");
const OrderResolvers = require("./Order");

const User = UserResolvers.User;
const Log = LogResolvers.Log;
// const Order = OrderResolvers.Order;

const axios = require("axios");

const ignoreOrderNumbers = ["8-001001-SNM", "5-006583-SWG"];

const resolvers = {
  Custom: {
    ...UserResolvers.Custom
  },
  Query: {
    allSttCaches: async (_, args) => {
      let _sttCache = (await SttCache.find({}))[0];
      if (_sttCache == null) return [];
      return _sttCache.cachedValues;
    },
    ...UserResolvers.Query,
    ...LogResolvers.Query,
    ...OrderResolvers.Query,
    fetchOrderList: (_, { input }) => {
      return axios({
        method: "GET",
        url: input.url,
        headers: {
          "Postman-Token": "1f99d336-97d3-49c0-aef9-c529ba54c8ce",
          "cache-control": "no-cache",
          Authorization: "f86f4906a3b740667322433cfb9e431d",
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          "X-com-zoho-invoice-organizationid": "59999705"
        }
      }).then(async res => {
        let data = res.data;
        let invoices = [];
        // Parse XML if xml
        if (JSON.stringify(data).includes("xml")) {
          let _break = data
            .substring(
              data.indexOf("<br/><br/>") + 10,
              data.indexOf("<br/><br/><?xml?>")
            )
            .split("<br/><br/>");
          for (let order of _break) {
            let _object = parseXml(order);
            let totalItems = 0;
            if (_object.UniqueID == null) continue;
            if (ignoreOrderNumbers.includes(_object.OrderNumber)) continue;

            let _itemList;
            try {
              _itemList =
                _object.item_list != null
                  ? categorizeOrder(
                      _object.item_list.map(a => {
                        let _break = a.Productname.split("-");
                        let _company = _object.OrderNumber.split("-")[2].trim();
                        let _prodName = _break[1].trim();
                        let _quantity = parseInt(a.ProductQty.replace("QTY"));
                        let _breakId = _break[0].split(/([0-9]+)/);
                        let _shortId = _breakId[0].trim();
                        let _amount = parseInt(_breakId[1]);

                        totalItems += _quantity;
                        return {
                          name: `${_shortId}-${_amount
                            .toString()
                            .padStart(2, "0")}-${_company}`,
                          description: _prodName,
                          quantity: _quantity,
                          type: inferType(_shortId),
                          packageId: a.PackageID
                        };
                      })
                    )
                  : [];
            } catch (e) {
              _itemList = ["error"];
            }

            invoices.push({
              invoiceId: _object.UniqueID,
              invoiceNumber: _object.OrderNumber,
              customerName: `${_object.ShipFirstName} ${_object.ShipLastName}`,
              orderDate: _object.ApprovedDate,
              shipCountry: _object.ShipCountry,
              itemList: _itemList,
              totalItems
            });
          }
        } else {
          invoices = data.invoices
            .filter(a => {
              if (a.status == "draft") return true;
              return false;
            })
            .map(a => {
              let _contact =
                a.contact_persons_details != null
                  ? a.contact_persons_details[0]
                  : undefined;
              return {
                companyName: a.company_name,
                customerName: a.customer_name,
                // csr_name : a.salesperson_name, // CSR Name // Store Name // Person Name
                // placement : a.custom_fields[0], // How the order was placed
                customerEmail: _contact != null ? _contact.email : undefined, // customer_phone : null // Person Phone // Person Email
                customerPhone: _contact != null ? _contact.phone : undefined, // customer_phone : null // Person Phone // Person Email
                // product_list : null // Itemized List
                invoiceNumber: a.invoice_number, // delivery : "person" || delivery date // How was it delivered
                // tracking_number : null
                totalCost: a.total,
                orderDate: a.date,
                invoiceId: a.invoice_id
              };
            });
        }

        // Check if saved in databse
        let index = 0;
        for (let invoice of invoices) {
          let _order = await Order.findOne({
            invoiceNumber: invoice.invoiceNumber
          });
          if (_order != null) {
            invoices[index] = {
              ...invoice,
              status: _order.status,
              lastUpdate: _order.lastUpdate,
              entryContent: _order.entryContent,
              claimed: _order.claimed,
              editBy: _order.editBy,
              notes: _order.notes
            };
          }
          index++;
        }

        return JSON.stringify(invoices);
      });
    },
    fetchOrder: (_, { input }) => {
      let totalItems = 0;
      return axios({
        method: "GET",
        url: `http://invoice.zoho.com/api/v3/invoices/${input.invoiceId}`,
        headers: {
          "Postman-Token": "1f99d336-97d3-49c0-aef9-c529ba54c8ce",
          "cache-control": "no-cache",
          Authorization: "f86f4906a3b740667322433cfb9e431d",
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          "X-com-zoho-invoice-organizationid": "59999705"
        }
      }).then(res => {
        let itemList = categorizeOrder(
          res.data.invoice.line_items.map(a => {
            totalItems += a.quantity;
            // console.log(a.name, input.invoiceId);
            return {
              name: a.name,
              description: a.description.split("-")[1].trim(),
              quantity: a.quantity,
              // packageId does not exist
              type: inferType(a.name.split("-")[0])
            };
          })
        );
        return JSON.stringify({
          itemList: itemList,
          totalItems
        });
      });
    }
  },
  ...User,
  ...Log,
  // ...Order,
  Subscription: {
    ...OrderResolvers.Subscription,
    ...UserResolvers.Subscription,
    ...LogResolvers.Subscription
  },
  Mutation: {
    ...UserResolvers.Mutation,
    ...LogResolvers.Mutation,
    ...OrderResolvers.Mutation,
    postOrderToSoti: async (_, { input }) => {
      let arr = [];
      let _sttCache = (await SttCache.find({}))[0];
      if (_sttCache == null) {
        _sttCache = new SttCache();
      }

      let config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      };

      let _content = JSON.parse(input.content);

      if (_content.product == null) {
        for (let item of _content) {
          arr.push(item.sttNumber.toString());

          let body = toUrlEncoded({
            packageid: item.packageId,
            sttno: item.sttNumber
          });
          axios
            .post(
              `https://www.cksoti.com/postupdatesttnumberperpackage/`,
              body,
              config
            )
            .then(res => {
              let _parsed = parseXml(res.data);
              console.log(_parsed.Message || _parsed.Results);
            });
        }
      } else {
        arr = _content.sttCache;
        delete _content.sttCache;
        let body = toUrlEncoded(_content);
        axios
          .post(
            `http://www.cksoti.com/postwholesaleorderdetails/`,
            body,
            config
          )
          .then(res => {
            let _parsed = parseXml(res.data);
            console.log(_parsed.Message || _parsed.Results);
          });
      }

      _sttCache.cachedValues = [..._sttCache.cachedValues, ...arr];
      _sttCache.save();
    }
  }
};

const toUrlEncoded = obj =>
  Object.keys(obj)
    .map(k => encodeURIComponent(k) + "=" + encodeURIComponent(obj[k]))
    .join("&");

let inferType = input => {
  /*
    0 - Autoflower
    1 - Feminized
    2 - Regular
    3 - CBD
    4 - Low
    5 - ERROR
    6 - Mix
  */
  input = input.toUpperCase();
  if (input == "DWA" || input == "DLF") return 4;
  if (input.slice(-1) == "A" || input == "AFM") return 0;
  if (input.slice(-1) == "F" || input == "FMM") return 1;
  if (input.slice(-1) == "R") return 2;
  if (input.slice(-1) == "M") return 6;
  if (input.slice(0, 2) == "CB") return 3;
  return 5;
};

let categorizeOrder = order => {
  let _new = {};
  order
    .sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    })
    .map(a => {
      let _break = a.name.split("-"),
        company = _break[2],
        quantity = _break[1];

      if (_new[company] == null) _new[company] = {};
      if (_new[company][quantity] == null) _new[company][quantity] = {};

      let index = Object.keys(_new[company][quantity]).length;
      _new[company][quantity][index] = a;
    });

  return _new;
};

let parseXml = (order, _itemizing = false) => {
  let _new = {};
  while (order.length != 0) {
    if (order.indexOf("<br/>") == 0) {
      if (!_itemizing) {
        if (_new["item_list"] == null) _new["item_list"] = [];
        order = order.substring(5, order.length);
        _new["item_list"].push(parseXml(order, true));
      } else break;
    }

    _res = acquireAttribute(order);
    _new[_res.key] = _res.value;
    order = _res.string;
  }

  return _new;
};

let acquireAttribute = string => {
  let key = string.indexOf("<") + 1;
  let $key = string.indexOf(">");
  let val = $key + 1;
  let $val = string.substring(key).indexOf("<") + 1;

  let _key = string.substring(key, $key);
  let _value = string.substring(val, $val);

  let $ = string.substring($val).indexOf(">") + $val + 1;

  return { string: string.substring($), key: _key, value: _value };
};

module.exports = resolvers;
