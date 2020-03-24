const express = require("express");

//modules
const app = express();
const bodyParser = require("body-parser");
require("./Models/db/mongodb");
const config = require("./config");
console.log(config);
const { generateToken, verify, verify_token } = require("./common/Common");
//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.headers.origin) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
  }
  next();
});
app.use(verify_token);

const api = require("./Routes/api.route");
app.use("/api", api);
//error handling
app.use((req, res, next) => {
  const error = new Error("not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 400).json({
    error: {
      message: error.message
    }
  });
});

app.listen(config.httpPort, () => {
  console.log(`${config.httpPort} is up now`);
});
