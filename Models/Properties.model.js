const mongoose = require("mongoose");

const propertie_schema = mongoose.Schema({
  propertie_title: { type: String, required: true },
  propertie_description: { type: String, required: true },
  propertie_images: { type: [String], required: true },
  propertie_thumbnail: { type: String, required: true },
  propertie_owner: { type: mongoose.Types.ObjectId, required: true },
  propertie_tags: { type: [String], required: true },
  propertie_location: {
    type: { type: String, enum: ["Point"], required: true },
    coordinates: { type: [Number], required: true }
  },
  propertie_area: { type: String, required: true },
  propertie_city: { type: String, required: true },
  propertie_country: { type: String, required: true },
  propertie_created_date: { type: Date, default: Date.now },
  propertie_last_updated_date: { type: Date, default: Date.now },
  disabled: { type: Boolean, default: false },
  disabledAt: Date,
  disabledReason: String
});

const propertie_model = mongoose.model("properties", propertie_schema);

module.exports = propertie_model;
