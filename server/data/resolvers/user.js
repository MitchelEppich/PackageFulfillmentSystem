const { User, Log } = require("../../models");

const { userFilters } = require("./functions");

const { PubSub, withFilter } = require("graphql-subscriptions");

const pubsub = new PubSub();

const resolvers = {
  Query: {
    user: async (_, { input }) => {
      let _user = await User.findOne(input);
      if (_user == null) return null;
      if (_user["online"] == null) _user["online"] = true;
      else _user["online"] = !_user["online"];
      _user.save();
      return _user;
    },
    allUsers: async (_, { filter }) => {
      let query = filter ? { $or: userFilters(filter) } : {};
      let users = await User.find(query);

      // let _index = 0;
      // for (let user of users) {
      //   let _log = await Log.findOne({ who: user.username });
      //   if (_log != null) {
      //     user.lastAction = _log.task;
      //     users[_index] = user;
      //   }
      //   _index++;
      // }
      return users;
    }
  },
  User: {},
  Subscription: {
    userUpdate: {
      subscribe: withFilter(
        () => pubsub.asyncIterator("userUpdate"),
        (payload, variables) => {
          // console.log(payload, variables);
          return true;
        }
      )
    }
  },
  Mutation: {
    verifyCredentials: async (_, { input }) => {
      let user = await User.findOne({
        badge: input.badge
      });

      if (user == null) return;
      if (user.username.toLowerCase() != input.username.toLowerCase()) return;

      user.token = user.createToken();

      user.online = true;
      // user.lastAction = await Log.findOne({ who: user.username });

      pubsub.publish("userUpdate", {
        userUpdate: { ...user.toObject() }
      });

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
    },
    updateUser: async (_, { input }) => {
      let user;
      try {
        let operation = {
          $set: { ...input }
        };

        user = await User.findOneAndUpdate(
          { $or: [{ username: input.username }] },
          operation,
          { new: true }
        );

        pubsub.publish("userUpdate", {
          userUpdate: { ...user.toObject() }
        });

        return user.toObject();
      } catch (error) {
        console.log("No user was found -> ", input);
        return null;
      }
    }
  }
};

module.exports = resolvers;
