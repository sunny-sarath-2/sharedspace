let Properties = require("../Models/Properties.model");

exports.getAllProperties = (skip = 0, limit = 20) => {
  return Properties.find()
    .skip(skip)
    .limit(limit);
};

exports.getSinglePropertie = id => {
  return Properties.findById(id);
};

exports.createPropertie = propertie => {
  const newPropertie = new Properties(propertie);
  return newPropertie.save();
};

exports.updatePropertie = () => {};

exports.disablePropertie = () => {};

exports.checkGeo = () => {
  return Properties.find({
    propertie_location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [17.438692, 78.394647]
        },
        $maxDistance: 2000
      }
    }
  });
};
