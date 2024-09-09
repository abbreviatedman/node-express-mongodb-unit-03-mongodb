// 5a. Import mongoose
const mongoose = require("mongoose");

// 10a. Define an ObjectId variable
const ObjectId = mongoose.Schema.Types.ObjectId;

// 5b. Create a user schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
      default: "",
    },

    favoriteAlbums: [
      {
        type: ObjectId,
        ref: "Album",
      },
    ],
  },

  {
    timestamps: true,
  }
);

// 5c. Create the user model
const User = mongoose.model("User", userSchema);

// 5d. Export the User model
module.exports = User;
