let express = require("express");

let resolvers = require("../data/resolvers");

const { PubSub, withFilter } = require("graphql-subscriptions");

const pubsub = new PubSub();

let router = express.Router();

router.post("/update", updateUser);

async function updateUser(req, res) {
  let _post = req.body;
  console.log(_post);
  console.log(pubsub.publish("userUpdate", _post));
  console.log("subed");
}

module.exports = router;
