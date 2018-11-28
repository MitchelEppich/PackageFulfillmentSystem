const { Log } = require("../../models");

const { logFilters } = require("./functions");

const resolvers = {
  Query: {
    log: (_, { input }) => {
      return Log.findOne(input);
    },
    allLogs: (_, { filter }) => {
      let query = filter ? { $or: logFilters(filter) } : {};
      return Log.find(query);
    }
  },
  Log: {},
  Mutation: {
    createActionLog: (_, { input }) => {
      let log = new Log({
        ...input
      });

      log.save();

      return log.toObject();
    }
  }
};

module.exports = resolvers;
