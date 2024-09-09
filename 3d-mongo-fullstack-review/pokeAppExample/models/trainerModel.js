const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId;

const trainerSchema = new mongoose.Schema({
  Name: {
    type: String,
    unique: true,
    required: true,
  },
  Region: {
    type: String,
    required: true,
    default: "Kanto",
  },
  PokemonList: [
    {
      type: ObjectId,
      ref: "pokemons",
    },
  ],
});

const Trainer = mongoose.model("Trainer", trainerSchema);

module.exports = Trainer;
