require("dotenv").config();

module.exports = {
  mongoURI: process.env.MONGO_DB_ACCESS_KEY,
};
