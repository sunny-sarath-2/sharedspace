let express = require("express");
let router = express.Router();

const {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUserDetails,
  disableUser,
  typeChange
} = require("../../Controllers/user.controller");

const { verify } = require("../../common/Common");

router.get("/all/:skip/:limit", verify, getAllUsers);
router.get("/:id", verify, getSingleUser);
router.post("/create", createUser);
router.put("/update", verify, updateUserDetails);
router.delete("/disable", verify, disableUser);
router.post("/change-type", verify, typeChange);

module.exports = router;
