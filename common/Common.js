const jwt = require("jsonwebtoken");

exports.verify_token = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    // Forbidden
    req.token = null;
    next();
  }
};

exports.verify = (req, res, next) => {
  jwt.verify(req.token, "secret", (err, authdata) => {
    if (err)
      res.status(404).send({
        status: 400,
        result: [],
        error: err,
        message: "unauthorized"
      });
    else {
      req.authdata = authdata;
      next();
    }
  });
};

exports.generateToken = result => {
  console.log(result);
  try {
    const token = jwt.sign({ data: result }, "secret", { expiresIn: "8h" });
    return token;
  } catch (err) {
    return null;
    console.log(err);
  }
};

exports.outputFormat = (result = null, message, status = 404, error = null) => {
  return {
    result,
    message,
    status,
    error
  };
};
