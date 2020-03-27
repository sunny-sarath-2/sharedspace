const Properties = require("../Models/Properties.model");
const Users = require("../Models/User.model");

exports.search = (type, input, limit, skip, sort, authdata) => {
  switch (type) {
    case 1: // search by city
      let { city } = input;
      return Properties.find({
        propertie_city: city
      })
        .limit(limit)
        .skip(skip)
        .sort({ propertie_created_date: sort });
      break;
    case 2: // search by area
      let { area } = input;
      return Properties.find({
        propertie_area: area
      })
        .limit(limit)
        .skip(skip)
        .sort({ propertie_created_date: sort });
      break;
    case 3: //search created date new to old
      return Properties.find()
        .sort({ propertie_created_date: -1 })
        .limit(limit)
        .skip(skip);
      break;
    case 4: //search created date old to new
      return Properties.find()
        .sort("propertie_created_date")
        .limit(limit)
        .skip(skip);
      break;
    default:
      return [];
      break;
  }
};

exports.locationSearch = (
  coordiantes,
  distance,
  limit = 10,
  skip = 0,
  sort = -1
) => {
  return Properties.find({
    propertie_location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: coordiantes
        },
        $maxDistance: distance
      }
    }
  })
    .limit(limit)
    .skip(skip)
    .sort({ propertie_created_date: sort });
};

exports.relatedProperties = (
  tags = [],
  id = null,
  limit = 10,
  skip = 0,
  authdata
) => {
  return Properties.find({
    propertie_tags: { $in: tags },
    _id: { $ne: id }
  })
    .limit(limit)
    .skip(skip)
    .sort({ propertie_created_date: -1 });
};

exports.recentSearch = async (id, limit = 10, skip = 0) => {
  let userDetails = await Users.findById(id);
  return Properties.find({
    propertie_tags: { $in: userDetails.search_history }
  })
    .limit(limit)
    .skip(skip);
};
