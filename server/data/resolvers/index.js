

const resolvers = {
  Query: {
    sendString:(_, args) => {
      return args;
    }
  }
};

module.exports = resolvers;
