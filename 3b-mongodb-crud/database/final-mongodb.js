/*
    1. Set up a connection to MongoDB using mongoose:
*/
// 1a. Import mongoose, setup .env use
const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set("strictQuery", false);

// 1b. Create a connection function
function connectToMongoDB() {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("MONGODB CONNECTED");
    })
    .catch((e) => {
      console.log(e);
    });
}

// 1c. Export the function
module.exports = connectToMongoDB;
