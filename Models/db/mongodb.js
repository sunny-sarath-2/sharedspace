const mongoose = require("mongoose");
const { server, database } = require("../../config");

const uri = `mongodb://${server}/${database}`;

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected");
  })
  .catch(err => {
    console.log("error" + err);
  });

module.exports = mongoose;
