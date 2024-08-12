const data = require("../../db.json"); // Adjust the path to your JSON file

exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };
};
