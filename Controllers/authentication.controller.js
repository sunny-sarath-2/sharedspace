const { login } = require("../Services/authentication.services");
let Joi = require("joi");
const md5 = require("md5");

const { outputFormat, generateToken } = require("../common/Common");

exports.login = async (req, res) => {
  try {
    let params = Joi.attempt(req.body, loginSchema);
    const { email, password } = params;
    let result = await login(email, md5(password));
    let token = null;
    if (!!result) {
      let { user_firstName, user_email, _id } = result[0];
      token = generateToken({ user_firstName, user_email, _id });
    }
    res
      .status(200)
      .json(
        outputFormat(
          { result, accessToken: token },
          "successfully logged in",
          200,
          null
        )
      );
  } catch (error) {
    res.status(404).json(outputFormat(null, error.message, 404, error));
  }
};

exports.forgetPassword = async (req, res) => {
  res.status(200).json(outputFormat(null, "under development", 200, null));
};

const loginSchema = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required()
});
