let User = require("../Models/User.model");

exports.getAllUsers = (skip = 0, limit = 20) => {
  return User.find()
    .skip(skip)
    .limit(limit);
};

exports.getSingleUser = id => {
  return User.findById(id);
};

exports.createUser = async userDetails => {
  let newUser = new User(userDetails);
  return newUser.save();
};

exports.checkEmailExistence = email => {
  return User.find({
    user_email: email
  });
};
