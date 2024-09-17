/*
    1. Set up a connection to MongoDB using mongoose:
*/
// 1a. Import mongoose, setup .env use
const mongoose = require("mongoose");
require("dotenv").config();

// 1b. Create a connection function
const connectToMongoDb = async function () {
  mongoose.set("strictQuery", false);
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MONGODB CONNECTED");
  } catch (error) {
    console.log(error);
  }
};

// 1c. Export the function
module.exports = connectToMongoDb;
