let express = require("express");

let userRoutes = require("./user");

let router = express.Router();

router.use("/user", userRoutes);

module.exports = router;
