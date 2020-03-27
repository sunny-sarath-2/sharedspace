const Joi = require("joi");
const {
  locationSearch,
  relatedProperties,
  search,
  recentSearch
} = require("../Services/search.services");
const { outputFormat } = require("../common/Common");
const { storeUserSearch } = require("../Services/user.services");
exports.search = async (req, res) => {
  try {
    let params = Joi.attempt(req.body, searchSchema);
    const { search_type, area, city, limit, skip, sort } = params;
    res
      .status(200)
      .json(
        outputFormat(
          await search(search_type, { area, city }, limit, skip, sort),
          "properties",
          200
        )
      );
    if (search_type == 1) storeUserSearch(city, req.authdata.data._id);
    else if (search_type == 2) storeUserSearch(area, req.authdata.data._id);
  } catch (error) {
    res.status(404).json(outputFormat(null, error.message, 404, error));
  }
};

exports.locationSearch = async (req, res) => {
  try {
    let params = Joi.attempt(req.body, locationSearchSchema);
    const { coordinates, distance, limit, skip, sort } = params;
    res
      .status(200)
      .json(
        outputFormat(
          await locationSearch(coordinates, distance, limit, skip, sort),
          "properties",
          200
        )
      );
  } catch (error) {
    res.status(404).json(outputFormat(null, error.message, 404, error));
  }
};

exports.relatedProperties = async (req, res) => {
  try {
    let params = Joi.attempt(req.body, relatedPropertiesSchema);
    const { tags, search_id, limit, skip } = params;
    res
      .status(200)
      .json(
        outputFormat(
          await relatedProperties(tags, search_id, limit, skip),
          "related properties",
          200
        )
      );
  } catch (error) {
    res.status(404).json(outputFormat(null, error.message, 404, error));
  }
};

exports.recentSearch = async (req, res) => {
  try {
    let params = Joi.attempt(req.body, recentSearchSchema);
    const { user_id, limit, skip } = params;
    res
      .status(200)
      .json(
        outputFormat(
          await recentSearch(user_id, limit, skip),
          "related properties",
          200
        )
      );
  } catch (error) {
    res.status(404).json(outputFormat(null, error.message, 404, error));
  }
};

const locationSearchSchema = Joi.object().keys({
  coordinates: Joi.array()
    .items(Joi.number().required())
    .min(2)
    .max(2),
  distance: Joi.number().required(),
  limit: Joi.number().required(),
  skip: Joi.number().required(),
  sort: Joi.number().required()
});

const relatedPropertiesSchema = Joi.object().keys({
  search_id: Joi.string().required(),
  tags: Joi.array()
    .items(Joi.string().required())
    .min(1),
  limit: Joi.number(),
  skip: Joi.number()
});

const searchSchema = Joi.object().keys({
  search_type: Joi.number().required(),
  city: Joi.string(),
  area: Joi.string(),
  limit: Joi.number().required(),
  skip: Joi.number().required(),
  sort: Joi.number().required()
});

const recentSearchSchema = Joi.object().keys({
  user_id: Joi.string().required(),
  limit: Joi.number(),
  skip: Joi.number()
});
