const env = process.env.NODE_ENV || "development";
const envFile = require(`./env/${env}`);
const secrets = require("./secrets");

let flattenObject = function(ob) {
  var toReturn = {};

  for (var i in ob) {
    if (!ob.hasOwnProperty(i)) continue;

    if (typeof ob[i] == "object") {
      var flatObject = flattenObject(ob[i]);
      for (var x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue;

        toReturn[x] = flatObject[x];
        // toReturn[i + "." + x] = flatObject[x];
      }
    } else {
      toReturn[i] = ob[i];
    }
  }
  return toReturn;
};
let result = flattenObject(secrets);
result.env = envFile;
let data = flattenObject(result);

module.exports = data;
