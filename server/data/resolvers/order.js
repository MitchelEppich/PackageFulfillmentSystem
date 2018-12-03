const { Order } = require("../../models");

const { PubSub, withFilter } = require("graphql-subscriptions");

const pubsub = new PubSub();

const resolvers = {
  Query: {},
  Order: {},
  Subscription: {
    orderUpdate: {
      subscribe: withFilter(
        () => pubsub.asyncIterator("orderUpdate"),
        (payload, variables) => {
          // console.log(payload, variables);
          return true;
        }
      )
    }
  },
  Mutation: {
    cacheOrder: async (_, { input }) => {
      // Check if exist
      let order = await Order.findOne({ invoiceId: input.invoiceId });

      if (order != null) return resolvers.Mutation.updateOrder(_, { input });

      // Create new order
      order = new Order({
        ...input,
        editBy: [input.who]
      });

      order.save();

      pubsub.publish("orderUpdate", {
        orderUpdate: { ...order.toObject() }
      });

      return order.toObject();
    },
    updateOrder: async (_, { input }) => {
      let order;
      try {
        let operation = {
          $set: { ...input }
        };

        if (input.who != null) {
          operation["$push"] = { editBy: input.who };
        }

        order = await Order.findOneAndUpdate(
          { $or: [{ invoiceId: input.invoiceId }] },
          operation,
          { new: true }
        );

        pubsub.publish("orderUpdate", {
          orderUpdate: { ...order.toObject() }
        });

        return order.toObject();
      } catch (error) {
        console.log("No order was found -> ", input);
        return null;
      }
    }
  }
};

module.exports = resolvers;
