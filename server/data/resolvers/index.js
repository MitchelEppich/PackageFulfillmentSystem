const UserResolvers = require("./User");
const LogResolvers = require("./Log");

const User = UserResolvers.User;
const Log = LogResolvers.Log;

const axios = require("axios");

const resolvers = {
  Query: {
    ...UserResolvers.Query,
    ...LogResolvers.Query,
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
      }).then(res => {
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

            invoices.push({
              invoice_id: _object.UniqueID,
              customer_name: `${_object.ShipFirstName} ${_object.ShipLastName}`,
              invoice_number: _object.OrderNumber,
              date: _object.ApprovedDate,
              item_list: _object.item_list.map(a => {
                let _break = a.Productname.split("-");
                let _company = _object.OrderNumber.split("-")[2];
                let _prodName = _break[1];
                let _quantity = parseInt(a.ProductQty.replace("QTY"));
                let _shortId = _break[0];
                return {
                  name: `${_shortId}-${_quantity
                    .toString()
                    .padStart(2, "0")}-${_company}`,
                  description: `${_company} - ${_prodName}`,
                  quantity: _quantity,
                  type: 0
                };
              })
            });
          }
        } else {
          invoices = data.invoices
            .filter(a => {
              if (a.status == "draft") return true;
              return false;
            })
            .map(a => {
              return {
                invoice_id: a.invoice_id,
                customer_name: a.customer_name,
                invoice_number: a.invoice_number,
                status: a.status,
                date: a.date
              };
            });
        }
        return JSON.stringify(invoices);
      });
    },
    fetchOrder: (_, { input }) => {
      let totalItems = 0;
      return axios({
        method: "GET",
        url: `http://invoice.zoho.com/api/v3/invoices/${input.invoice_id}`,
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

            /*
             0 - Autoflower
             1 - Feminized
             2 - Regular
             3 - CBD
             4 - Low
            */
            let description = a.description;
            let type = 0;
            // if (!description.includes("auto")) type = 0;
            // else if (!description.includes("fem")) type = 1;
            // else if (!description.includes("reg")) type = 2;
            // else if (!description.includes("reg")) type = 2;

            return {
              name: a.name,
              description: description,
              quantity: a.quantity,
              type: type
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
  Mutation: {
    ...UserResolvers.Mutation,
    ...LogResolvers.Mutation
  }
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
