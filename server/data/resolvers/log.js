const { Log } = require("../../models");

const { logFilters } = require("./functions");

const { PubSub, withFilter } = require("graphql-subscriptions");

const pubsub = new PubSub();

const resolvers = {
  Query: {
    log: (_, { input }) => {
      return Log.findOne(input);
    },
    allLogs: (_, { filter }) => {
      let query = filter ? { $or: logFilters(filter) } : {};
      return Log.find(query).sort({ createdAt: -1 });
    }
  },
  Log: {},
  Subscription: {
    logUpdate: {
      subscribe: withFilter(
        () => pubsub.asyncIterator("logUpdate"),
        (payload, variables) => {
          // console.log(payload, variables);
          return true;
        }
      )
    }
  },
  Mutation: {
    createActionLog: (_, { input }) => {
      let log = new Log({
        ...input
      });

      pubsub.publish("logUpdate", {
        logUpdate: { ...log.toObject() }
      });

      log.save();

      return log.toObject();
    }
  }
};

module.exports = resolvers;
