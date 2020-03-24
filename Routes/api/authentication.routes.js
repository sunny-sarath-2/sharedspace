let express = require("express");
let router = express.Router();

const {
  login,
  forgetPassword
} = require("../../Controllers/authentication.controller");
const { verify } = require("../../common/Common");

router.post("/login", login);
router.post("/forget-password", verify, forgetPassword);

module.exports = router;
