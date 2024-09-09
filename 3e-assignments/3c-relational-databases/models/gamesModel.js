const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId;

const gamesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    usersLiked: {
      type: [
        {
          type: ObjectId,
          ref: "user",
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

const Game = mongoose.model("Game", gamesSchema);

module.exports = Game;
