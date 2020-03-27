let express = require("express");
let router = express.Router();

const {
  getAllProperties,
  getSinglePropertie,
  createPropertie,
  updatePropertie,
  disablePropertie
} = require("../../Controllers/properties.controller");
const { verify } = require("../../common/Common");

router.get("/all/:skip/:limit", verify, getAllProperties);
router.get("/:id", verify, getSinglePropertie);
router.post("/create", verify, createPropertie);
router.put("/update", verify, updatePropertie);
router.delete("/disable", verify, disablePropertie);

module.exports = router;
