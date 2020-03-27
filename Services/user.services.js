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

exports.getUsersOnCondition = (conditionOn, condition) => {
  return User.find({
    [conditionOn]: condition
  });
};

exports.storeUserSearch = async (search, user) => {
  let userDetails = await User.findById(user);
  let finalResult = !!userDetails.search_history
    ? userDetails.search_history
    : [];
  if (finalResult.length < 5) {
    if (!finalResult.includes(search)) {
      finalResult.push(search);
    }
  } else {
    if (!finalResult.includes(search)) {
      finalResult.shift();
      finalResult.push(search);
    }
  }

  await User.updateOne(
    { _id: user },
    { $set: { search_history: finalResult } }
  );
};
