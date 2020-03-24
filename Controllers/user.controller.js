let Joi = require("joi");
const md5 = require("md5");
const {
  getAllUsers,
  getSingleUser,
  createUser,
  checkEmailExistence
} = require("../Services/user.services");
const { outputFormat } = require("../common/Common");

exports.getAllUsers = async (req, res) => {
  const { skip, limit } = req.params;
  res
    .status(200)
    .json(
      outputFormat(
        await getAllUsers(Number(skip), Number(limit)),
        "users details",
        200,
        null
      )
    );
};

exports.getSingleUser = async (req, res) => {
  const { id } = req.params;
  res
    .status(200)
    .json(outputFormat(await getSingleUser(id), "user details", 200, null));
};

exports.createUser = async (req, res) => {
  try {
    let params = Joi.attempt(req.body, createUserSchema);
    params.password = params.password.toLowerCase();
    let user = {
      user_firstName: params.user_firstName,
      user_lastName: params.user_lastName,
      user_primary_phone: params.user_primary_phone,
      user_email: params.user_email,
      password: md5(params.password),
      created_ip: params.created_ip,
      last_access_ip: params.created_ip,
      user_type: 1
    };
    let emailVerification = await checkEmailExistence(params.user_email);
    if (emailVerification.length != 0) {
      console.log(emailVerification);
      throw new Error("email already exisits");
    }
    let result = await createUser(user);
    res
      .status(200)
      .json(outputFormat(result, "successfully created user", 200));
  } catch (error) {
    res.status(404).json(outputFormat(null, error.message, 404, error));
  }
};

exports.updateUserDetails = async (req, res) => {
  res.status(200).json(outputFormat(null, "under development", 200, null));
};

exports.disableUser = async (req, res) => {
  res.status(200).json(outputFormat(null, "under development", 200, null));
};

exports.typeChange = async (req, res) => {
  res.status(200).json(outputFormat(null, "under development", 200, null));
};

const createUserSchema = Joi.object()
  .keys({
    user_firstName: Joi.string().required(),
    user_lastName: Joi.string().required(),
    user_primary_phone: Joi.number().required(),
    user_email: Joi.string().required(),
    password: Joi.string().required(),
    created_ip: Joi.string()
  })
  .options({ abortEarly: false });
