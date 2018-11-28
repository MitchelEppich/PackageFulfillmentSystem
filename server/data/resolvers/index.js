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
        url: "http://invoice.zoho.com/api/v3/invoices",
        headers: {
          "Postman-Token": "1f99d336-97d3-49c0-aef9-c529ba54c8ce",
          "cache-control": "no-cache",
          Authorization: "f86f4906a3b740667322433cfb9e431d",
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          "X-com-zoho-invoice-organizationid": "59999705"
        }
      }).then(res => {
        let invoices = res.data.invoices.map(a => {
          return {
            invoice_id: a.invoice_id,
            customer_name: a.customer_name,
            invoice_number: a.invoice_number,
            status: a.status,
            date: a.date
          };
        });
        return JSON.stringify(invoices);
      });
    },
    fetchOrder: (_, { input }) => {
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
        return JSON.stringify(
          res.data.invoice.line_items.map(a => {
            return {
              name: a.name,
              description: a.description,
              quantity: a.quantity
            };
          })
        );
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

module.exports = resolvers;
