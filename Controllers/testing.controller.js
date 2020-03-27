const Joi = require("joi");
const randomCoordinates = require("random-coordinates");
const cities = require("cities");
const md5 = require("md5");
var Fakerator = require("fakerator");
var fakerator = Fakerator();

const { outputFormat } = require("../common/Common");
const { createPropertie } = require("../Services/properties.services");
const { createUser,getUsersOnCondition } = require("../Services/user.services");

exports.createTestProperties = async (req, res) => {
  try {
    const params = Joi.attempt(req.body, createTestPropertiesSchema);
    const { total_properties, starting_with } = params;
    // let coordiates = randomCoordinates();
    // coordiates = coordiates.split(",");
    // let locationDetails = cities.gps_lookup(coordiates[0], coordiates[1]);
    const totalOwners = await getUsersOnCondition("user_type",2);
    const totalLength = totalOwners.length;
    var oneYearBack = new Date();
    oneYearBack.setFullYear(oneYearBack.getFullYear() - 1);
    for (let i = starting_with; i <= total_properties; i++) {
        let data = totalOwners[Math.floor(Math.random() * Math.floor(totalLength))]   
        let fakeUser = fakerator.entity.user();
        let title = fakerator.lorem.word()
        let propertie = {
        propertie_title: title,
        propertie_description: fakerator.lorem.paragraph(),
        propertie_images: ["https://picsum.photos/200/300","https://picsum.photos/200/300","https://picsum.photos/200/300"],
        propertie_thumbnail: "https://picsum.photos/200/300",
        propertie_owner: data._id,
        propertie_tags: [fakeUser.address.state,fakeUser.address.city,title,fakeUser.address.country],
        propertie_location: {
          type: "Point",
          coordinates: [fakeUser.address.geo.longitude, fakeUser.address.geo.latitude]
        },
        propertie_area: fakeUser.address.state,
        propertie_city: fakeUser.address.city,
        propertie_country: fakeUser.address.country,
        propertie_created_date: fakerator.date.between(oneYearBack, new Date()),
        propertie_last_updated_date: fakerator.date.between(oneYearBack, new Date())
    };
      await createPropertie(propertie);
      console.log(i)
    }
    res
      .status(200)
      .json(
        outputFormat(
          { totalLength},
          "properties details",
          200,
          null
        )
      );
  } catch (error) {
    res.status(200).json(outputFormat(null, error.message, 200, error));
  }
};

exports.createTestUsers = async (req, res) => {
  try {
    const params = Joi.attempt(req.body, createTestUsersSchema);
    const { total_users, starting_with } = params;
    var oneYearBack = new Date();
    oneYearBack.setFullYear(oneYearBack.getFullYear() - 1);
    // for (let i = starting_with; i <= total_users; i++) {
    //   let fakeUser = fakerator.entity.user();
    //   let user = {
    //     user_firstName: fakeUser.firstName,
    //     user_lastName: fakeUser.lastName,
    //     user_primary_phone: 1231231233,
    //     user_email: fakeUser.email,
    //     password: md5(123),
    //     created_ip: fakeUser.ip,
    //     last_access_ip: fakeUser.ip,
    //     user_type:
    //       Math.floor(Math.random(1) * Math.floor(3)) == 0
    //         ? 1
    //         : Math.floor(Math.random(1) * Math.floor(3)),
    //     created_date: fakerator.date.between(oneYearBack, new Date())
    //   };
    //   await createUser(user);
    //   console.log(i);
    // }
    res
      .status(200)
      .json(
        outputFormat(
          { user: fakerator.entity.user() },
          "properties details",
          200,
          null
        )
      );
  } catch (error) {
    res.status(200).json(outputFormat(null, error.message, 200, error));
  }
};

const createTestPropertiesSchema = Joi.object().keys({
  total_properties: Joi.number().required(),
  starting_with: Joi.number().required()
});

const createTestUsersSchema = Joi.object().keys({
  total_users: Joi.number().required(),
  starting_with: Joi.number().required()
});
