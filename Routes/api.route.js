let express = require("express");
let router = express.Router();

const user = require("./api/users.routes");
router.use("/user", user);

const authentication = require("./api/authentication.routes");
router.use("/authentication", authentication);

const properties = require("./api/properties.routes");
router.use("/properties", properties);

const search = require("./api/search.routes");
router.use("/search", search);

const testing = require("./api/testing.routes");
router.use("/testing", testing)

module.exports = router;
