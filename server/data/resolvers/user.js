const { User } = require("../../models");

const { userFilters } = require("./functions");

const resolvers = {
  Query: {
    user: (_, { input }) => {
      return User.findOne(input);
    },
    allUsers: (_, { filter }) => {
      let query = filter ? { $or: userFilters(filter) } : {};
      return User.find(query);
    }
  },
  User: {},
  Mutation: {
    verifyCredentials: async (_, { input }) => {
      let user = await User.findOne({
        badge: input.badge
      });

      if (user == null) return;
      if (user.username.toLowerCase() != input.username.toLowerCase()) return;

      user.token = user.createToken();

      user.save();

      return user.toObject();
    },
    registerCredentials: async (_, { input }) => {
      let name = input.name;
      input = name.toLowerCase().split(" ");
      let username = input[0][0] + input[1];
      let badge;
      let user;
      do {
        badge = `${Math.random()
          .toString(36)
          .replace(/[^a-z]+/g, "")
          .substr(0, 5)}`;
        user = await User.findOne({ badge: badge });
      } while (user != null);

      user = new User({
        username: username,
        name: name,
        badge: badge
      });

      user.token = user.createToken();

      user.save();

      return user.toObject();
    }
  }
};

module.exports = resolvers;
