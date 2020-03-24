let express = require("express");
let router = express.Router();

const user = require("./api/users.routes");
router.use("/user", user);

const authentication = require("./api/authentication.routes");
router.use("/authentication", authentication);

const properties = require("./api/properties.routes");
router.use("/properties", properties);

module.exports = router;
