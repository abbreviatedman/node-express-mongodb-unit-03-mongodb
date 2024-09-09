// 1a. Import mongoose
const mongoose = require("mongoose");

// 9a. Define an ObjectId variable
const ObjectId = mongoose.Schema.Types.ObjectId;

// 1b. Create an album schema
const albumSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
      default: "",
    },

    artist: {
      type: String,
      lowercase: true,
      required: true,
      default: "",
    },

    userFavorites: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
  },

  {
    timestamps: true,
  }
);

// 1c. Create the album model
const Album = mongoose.model("Album", albumSchema);

// 1d. Export the album model
module.exports = Album;
