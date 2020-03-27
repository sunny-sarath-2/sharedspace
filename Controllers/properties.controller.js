let Joi = require("joi");
const {
  createPropertie,
  getAllProperties,
  getSinglePropertie,
  checkGeo
} = require("../Services/properties.services");
const { outputFormat } = require("../common/Common");

exports.getAllProperties = async (req, res) => {
  const { skip, limit } = req.params;
  res
    .status(200)
    .json(
      outputFormat(
        await getAllProperties(Number(skip), Number(limit)),
        "properties details",
        200,
        null
      )
    );
};

exports.getSinglePropertie = async (req, res) => {
  const { id } = req.params;
  res
    .status(200)
    .json(
      outputFormat(
        await getSinglePropertie(id),
        "properties details",
        200,
        null
      )
    );
};

exports.createPropertie = async (req, res) => {
  try {
    let params = Joi.attempt(req.body, createPropertieSchema);
    let propertie = {
      propertie_title: params.propertie_title,
      propertie_description: params.propertie_description,
      propertie_images: params.propertie_images,
      propertie_thumbnail: params.propertie_thumbnail,
      propertie_owner: params.propertie_owner,
      propertie_tags: params.propertie_tags,
      propertie_location: {
        type: "Point",
        coordinates: params.propertie_location
      },
      propertie_area: params.propertie_area,
      propertie_city: params.propertie_city,
      propertie_country: params.propertie_country
    };
    let result = await createPropertie(propertie);
    res
      .status(200)
      .json(outputFormat(result, "propertie created successfully", 200, null));
  } catch (error) {
    res.status(200).json(outputFormat(null, error.message, 200, error));
  }
};

exports.updatePropertie = async (req, res) => {
  res.status(200).json(outputFormat(null, "under development", 200, null));
};

exports.disablePropertie = async (req, res) => {
  res.status(200).json(outputFormat(null, "under development", 200, null));
};

const createPropertieSchema = Joi.object().keys({
  propertie_title: Joi.string().required(),
  propertie_description: Joi.string().required(),
  propertie_images: Joi.array().items(Joi.string().required()),
  propertie_thumbnail: Joi.string().required(),
  propertie_owner: Joi.string().required(),
  propertie_tags: Joi.array().items(Joi.string().required()),
  propertie_location: Joi.array().items(Joi.number().required()),
  propertie_area: Joi.string().required(),
  propertie_city: Joi.string().required(),
  propertie_country: Joi.string().required()
});
