const { User, Log } = require("../../models");

const { userFilters } = require("./functions");

const { PubSub, withFilter } = require("graphql-subscriptions");

const pubsub = new PubSub();

const axios = require("axios");

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
      let config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      };

      let body = toUrlEncoded({ CLIENT_ACR: "PFS" });

      return axios
        .post("http://localhost:3000/api/user/", body, config)
        .then(res => {
          let _users = res.data;
          return _users;
        });
    }
  },
  User: {},
  Subscription: {
    userUpdate: {
      subscribe: withFilter(
        () => pubsub.asyncIterator("userUpdate"),
        (payload, variables) => {
          console.log(payload, variables);
          return true;
        }
      )
    }
  },
  Mutation: {
    verifyCredentials: async (_, { input }) => {
      let config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      };

      let body = toUrlEncoded({ ...input, CLIENT_ACR: "PFS" });

      return axios
        .post("http://localhost:3000/api/user/verify/", body, config)
        .then(res => {
          let _user = res.data;
          return _user;
        });
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
    deleteUser: async (_, { input }) => {
      try {
        let _user = await User.findOne({ username: input.username });

        _user.remove();

        return _user.toObject();
      } catch (error) {
        console.log("No user was found -> ", input);
        return null;
      }
    },
    updateUser: async (_, { input }) => {
      console.log(input);
      let config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      };

      let body = toUrlEncoded({
        ...input,
        CLIENT_ACR: "PFS"
      });

      return axios
        .post("http://localhost:3000/api/user/update/", body, config)
        .then(res => {
          let _user = res.data;
          return _user;
        });
    }
  }
};

const toUrlEncoded = obj =>
  Object.keys(obj)
    .map(k => encodeURIComponent(k) + "=" + encodeURIComponent(obj[k]))
    .join("&");

module.exports = resolvers;
