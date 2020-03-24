const mongoose = require("mongoose");

let users_schema = mongoose.Schema({
  user_firstName: { type: String, required: true },
  user_lastName: { type: String, required: true },
  user_primary_phone: { type: Number, required: true },
  user_email: { type: String, required: true },
  password: { type: String, required: true },
  created_date: { type: Date, default: Date.now },
  created_ip: { type: String, default: "0.0.0.0" },
  last_access_date: { type: Date, default: Date.now },
  last_access_ip: { type: String, default: "0.0.0.0" },
  disabledAt: Date,
  disabledReason: String,
  disabled: { type: Boolean, default: false },
  user_type: { type: Number, required: true }
});

const users_model = mongoose.model("users", users_schema);

module.exports = users_model;
