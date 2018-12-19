const { User, Log } = require("../../models");

const { userFilters } = require("./functions");

const { PubSub, withFilter } = require("graphql-subscriptions");

const pubsub = new PubSub();

const axios = require("axios");

const resolvers = {
  Query: {
    user: async (_, { input }) => {
      let config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      };

      let body = toUrlEncoded({ ...input, CLIENT_ACR: "PFS" });

      return axios
        .post("http://localhost:3000/api/user/", body, config)
        .then(res => {
          let _user = res.data;
          _user = inferPermissions(_user, "PFS");
          return _user;
        });
    },
    allUsers: async (_, { filter }) => {
      let config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      };

      return axios.get("http://localhost:3000/api/user/", config).then(res => {
        let _users = res.data;
        _users = _users.map(user => {
          return inferPermissions(user, "PFS");
        });
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
          // console.log(payload, variables);
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
          _user = inferPermissions(_user, "PFS");
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
          _user = inferPermissions(_user, "PFS");
          return _user;
        });
    }
  },
  Custom: {
    publishUserUpdate: (_, { input }) => {
      let _user = input.userUpdate;
      _user = inferPermissions(_user, "PFS");
      pubsub.publish("userUpdate", { userUpdate: input.userUpdate });
    }
  }
};

const toUrlEncoded = obj =>
  Object.keys(obj)
    .map(k => encodeURIComponent(k) + "=" + encodeURIComponent(obj[k]))
    .join("&");

function inferPermissions(user, CLIENT_ACR) {
  let _new = user;

  let _permissions =
    _new.permissions != null && _new.permissions.length != 0
      ? _new.permissions
          .filter(a => {
            if (a.includes(CLIENT_ACR)) return true;
            return false;
          })[0]
          .split(":")
      : [CLIENT_ACR, 0, 0];
  _new.admin = _permissions[1] == "1";
  _new.locked = _permissions[2] == "1";
  return _new;
}

module.exports = resolvers;
