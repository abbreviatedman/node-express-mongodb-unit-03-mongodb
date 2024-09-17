/*
    5. Set up a Model for the database
*/
const mongoose = require("mongoose");

const snackSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      unique: true,
      required: true,
    },

    category: {
      type: String,
      default: "",
    },

    calories: {
      type: Number,
      default: 0,
    },

    delicious: {
      type: Boolean,
      default: true,
    },

    comments: {
      type: Array,
      default: [],
    },
  },

  {
    timestamps: true,
  }
);

const Snack = mongoose.model("Snack", snackSchema);

module.exports = Snack;
