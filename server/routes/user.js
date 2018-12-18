let express = require("express");

let resolvers = require("../data/resolvers");

let router = express.Router();

router.post("/update", updateUser);

async function updateUser(req, res) {
  let _post = req.body;
  resolvers.Custom.publishUserUpdate(null, {
    input: { userUpdate: JSON.parse(_post.userUpdate) }
  });
}

module.exports = router;
