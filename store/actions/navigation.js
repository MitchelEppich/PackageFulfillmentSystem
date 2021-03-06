/*******************************************/
/*User Actions for all user related
dispatch actions*/
/******************************************/

import gql from "graphql-tag";
import { makePromise, execute } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import fetch from "node-fetch";

import moment from "moment";

const actionTypes = {
  FOCUS_COMPANY: "FOCUS_COMPANY",
  FETCH_ORDER: "FETCH_ORDER",
  FETCH_LOGS: "FETCH_LOGS",
  FETCH_USERS: "FETCH_USERS",
  MODIFY_USER: "MODIFY_USER",
  MODIFY_LOGS: "MODIFY_LOGS",
  DELETE_USER: "DELETE_USER",
  SET_ORDER_FILTER: "SET_ORDER_FILTER",
  MODIFY_FOCUS_ORDER: "MODIFY_FOCUS_ORDER",
  POST_ORDER: "POST_ORDER"
};

import OrderHandler from "./orderHandler";
import ItemHandler from "./itemHandler";

const getActions = uri => {
  const objects = {
    setOrderFilter: input => {     
      let _value = input.value
      let _orderFilter = input.filter
      if (_value == "all") {
        _orderFilter=input.filterKeys
      } else if (_value == "none") {
        _orderFilter=[]
      } else {

        if (_orderFilter.includes(_value)) {
          _orderFilter = _orderFilter.filter(a => {
            if (a == _value) return false;
            return true;
          })
        } else _orderFilter.push(_value)
      }
      return {
        type: actionTypes.SET_ORDER_FILTER,
        input: _orderFilter
      };
    },
    focusCompany: (input, orders) => {
      return dispatch => {
        let company = input.company;
        let orderHandler = OrderHandler(uri);

        if (
          Math.abs(
            moment(input.orderCache[company.short].updatedAt).diff(
              moment(),
              "minutes"
            )
          ) < 5
        ) {
          dispatch({
            type: actionTypes.FOCUS_COMPANY,
            input: {
              ...input.company,
              orders: input.orderCache[company.short].order
            },
            name: input.company.name,
            user: input.user
          });
        } else {
          let OrderHandlerActions = OrderHandler(uri);
          dispatch(
            OrderHandlerActions.clearCompanyCache({
              company: company,
              orderCache: input.orderCache
            })
          );
          dispatch(
            orderHandler.fetchOrderList({
              url: company.url,
              company: company,
              orderCache: input.orderCache
            })
          ).then(orders => {
            dispatch({
              type: actionTypes.FOCUS_COMPANY,
              input: { ...input.company, orders: orders },
              name: input.company.name,
              user: input.user
            });
          });
        }
      };
    },
    fetchUsers: () => {
      return dispatch => {
        const link = new HttpLink({ uri, fetch: fetch });

        const operation = {
          query: query.getUsers
        };

        return makePromise(execute(link, operation))
          .then(data => {
            let users = data.data.allUsers;
            dispatch({
              type: actionTypes.FETCH_USERS,
              users: users
            });
            return Promise.resolve(users);
          })
          .catch(error => console.log(error));
      };
    },
    modifyUser: input => {
      let _promptUsers = input.promptUsers;
      let _user = input.user;

      let _index = 0;
      for (let _u of _promptUsers) {
        if (_u.username == _user.username) {
          _promptUsers[_index] = _user;
          break;
        }
        _index++;
      }

      return {
        type: actionTypes.MODIFY_USER,
        input: _promptUsers
      };
    },
    deleteUser: input => {
      return dispatch => {
        const link = new HttpLink({ uri, fetch: fetch });

        const operation = {
          query: mutation.deleteUser,
          variables: { username: input.username }
        };

        makePromise(execute(link, operation))
          .then(data => {
            let _promptUsers = input.promptUsers.filter(a => {
              if (a.username == input.username) return false;
              return true;
            });

            dispatch({
              type: actionTypes.DELETE_USER,
              input: _promptUsers
            });
          })
          .catch(error => console.log(error));
      };
    },
    postOrder: input => {
      return dispatch => {
        let _itemList = Object.values(input.itemList);
        let _company = input.focusCompany.short;
        let _content =
          _company == "wholesale"
            ? buildContent(input.focusOrder, input.itemList)
            : JSON.stringify(
                _itemList.map(a => {
                  return {
                    packageId: a.packageId,
                    sttNumber: `${a.prefix}${a.value}`
                  };
                })
              );

        const link = new HttpLink({ uri, fetch: fetch });
        const operation = {
          query: mutation.postRegularOrder,
          variables: { content: _content }
        };

        makePromise(execute(link, operation))
          .then(data => {
            console.log(data.data.postOrder);

            dispatch({ type: actionTypes.POST_ORDER });
          })
          .catch(error => console.log(error));
      };
    },
    fetchOrder: input => {
      return dispatch => {
        if (
          input.order.entryContent != null &&
          input.order.entryContent != "{}"
        ) {
          let ItemHandlerActions = ItemHandler(uri);
          dispatch(
            ItemHandlerActions.modifyValues({
              entryContent: input.order.entryContent
            })
          );
        }

        if (input.company.short == "wholesale") {
          const link = new HttpLink({ uri, fetch: fetch });
          const operation = {
            query: query.fetchOrder,
            variables: { invoiceId: input.order.invoiceId }
          };

          return makePromise(execute(link, operation)).then(data => {
            let _new = JSON.parse(data.data.fetchOrder);
            dispatch({
              type: actionTypes.FETCH_ORDER,
              order: {
                ...input.order,
                itemList: _new.itemList,
                totalItems: _new.totalItems
              },
              user: input.user,
              company: input.company,
              orderCache: input.orderCache
            });
            return Promise.resolve(_new);
          });
        } else {
          dispatch({
            type: actionTypes.FETCH_ORDER,
            order: input.order,
            user: input.user,
            company: input.company,
            orderCache: input.orderCache
          });
        }
      };
    },
    modifyFocusOrder: input => {
      return {
        type: actionTypes.MODIFY_FOCUS_ORDER,
        input: input.order
      };
    },
    fetchLogs: input => {
      return dispatch => {
        const link = new HttpLink({ uri, fetch: fetch });

        const operation = {
          query: query.fetchLogs
          // variables: { invoice_id: input.order.invoice_id }
        };

        return makePromise(execute(link, operation)).then(data => {
          let _new = data.data.allLogs;
          dispatch({
            type: actionTypes.FETCH_LOGS,
            logs: _new
          });
          return Promise.resolve(_new);
        });
      };
    },
    modifyLogs: input => {
      let _promptLogs = input.promptLogs;
      let _log = input.log;

      return {
        type: actionTypes.MODIFY_LOGS,
        input: [_log, ..._promptLogs]
      };
    }
  };

  return { ...objects };
};
const query = {
  getUsers: gql`
    query {
      allUsers {
        username
        name
        badge
        locked
        online
        lastAction
        admin
      }
    }
  `,
  fetchOrder: gql`
    query($invoiceId: String) {
      fetchOrder(input: { invoiceId: $invoiceId })
    }
  `,
  fetchLogs: gql`
    query {
      allLogs {
        who
        task
        createdAt
      }
    }
  `
};

const mutation = {
  deleteUser: gql`
    mutation($username: String) {
      deleteUser(input: { username: $username }) {
        username
      }
    }
  `,
  postRegularOrder: gql`
    mutation($content: String) {
      postOrderToSoti(input: { content: $content })
    }
  `
};

let buildContent = (order, itemValues) => {
  let _product = buildProduct(order.itemList, itemValues);

  return JSON.stringify({
    storename: order.companyName || order.customerName || "ADD STORE NAME",
    personplacingorder: order.customerName || "ADD CUSTOMER NAME",
    persontakingorder: "(default) Vanessa",
    orderplaced: `${moment(order.orderDate).format(
      "DD-MMM-YY"
    )} SELECT( phone , email )`,
    email: order.customerPhone || "",
    phone: order.customerEmail || "",
    product: _product.product,
    sttCache: _product.sttNumbers,
    price: `${order.totalCost.toFixed(2)} CAD`,
    invoicenumber: order.invoiceNumber,
    shipped: moment().format("YY-MM-DD HH:mm:ss"),
    trackingnumber: "",
    currentDate: moment(order.orderDate).format("YY-MM-DD HH:mm:ss")
  });
};

let buildProduct = (items, values) => {
  let _product = "";
  let _sttNumbers = [];

  let _company = Object.keys(items);

  for (let company of _company) {
    // DECLARE WHICH COMPANY
    // _product += `COMPANY->${company}::>>`;
    let _quantity = Object.keys(items[company]);
    // Add products to the company
    for (let quantity of _quantity) {
      for (let item of Object.values(items[company][quantity])) {
        let _value = values[item.name];
        let _sttNumber;
        if (_value != null) {
          _sttNumber = _value.prefix + _value.value;
          _sttNumbers.push(_sttNumber);
        }
        _product += `(ID=${item.name})-(QTY=${
          item.quantity
        })-(STT=${_sttNumber})//`;
      }
    }
  }

  return { product: _product, sttNumbers: _sttNumbers };
};

export default uri => {
  const actions = getActions(uri);
  return {
    // TYPES
    ...actionTypes,
    // ACTIONS
    ...actions
  };
};
