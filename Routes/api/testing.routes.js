const express = require("express");
const router = express.Router();

const {
  createTestProperties,
  createTestUsers
} = require("../../Controllers/testing.controller");
const { verify } = require("../../common/Common");

router.post("/create/properties", verify, createTestProperties);
router.post("/create/users", verify, createTestUsers);

module.exports = router;
