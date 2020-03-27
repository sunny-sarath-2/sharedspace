let express = require("express");
let router = express.Router();

const {
  search,
  locationSearch,
  relatedProperties,
  recentSearch
} = require("../../Controllers/search.controller");
const { verify } = require("../../common/Common");

router.post("/", verify, search);
router.post("/location", verify, locationSearch);
router.post("/tags", verify, relatedProperties);
router.post("/recent", verify, recentSearch);

module.exports = router;
