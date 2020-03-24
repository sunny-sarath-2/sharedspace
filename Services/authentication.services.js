const User = require("../Models/User.model");

exports.login = (user_email, password) => {
  return User.find({
    user_email: user_email,
    password
  });
};
