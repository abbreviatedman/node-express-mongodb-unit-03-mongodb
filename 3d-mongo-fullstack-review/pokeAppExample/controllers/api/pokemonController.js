const Pokemon = require("../../models/pokemonModel");
const Trainer = require("../../models/trainerModel");

async function getAllPokemon(req, res) {
  try {
    let results = await Pokemon.find({});

    res.json({
      message: "success",
      payload: results,
    });
  } catch (error) {
    let errorObj = {
      message: "get all pokemon failure",
      payload: error,
    };

    console.log(errorObj);

    res.json(errorObj);
  }
}

async function getOnePokemon(req, res) {
  try {
    let result = await Pokemon.findOne({ Name: req.params.name });

    res.json({
      message: "success",
      payload: result,
    });
  } catch (error) {
    let errorObj = {
      message: "get one pokemon failure",
      payload: error,
    };

    console.log(errorObj);

    res.json(errorObj);
  }
}

async function createOnePokemon(req, res) {
  try {
    let newPokemon = {
      PokedexNo: req.body.PokedexNo,
      Name: req.body.Name,
      Type: req.body.Type,
      Moves: req.body.Moves.split(", "),
    };

    await Pokemon.create(newPokemon);

    // res.json({
    //     message: "success",
    //     payload: newPokemon
    // })

    res.redirect(`/oneMon/${newPokemon.Name}`);
  } catch (error) {
    let errorObj = {
      message: "create one pokemon failure",
      payload: error,
    };

    console.log(errorObj);

    res.json(errorObj);
  }
}

async function deleteOnePokemon(req, res) {
  try {
    await Pokemon.deleteOne({ Name: req.params.name });

    // res.json({
    //     message: "success",
    //     payload: `deleted ${req.params.name}`
    // })

    res.redirect("/allMons");
  } catch (error) {
    let errorObj = {
      message: "delete one pokemon failure",
      payload: error,
    };

    console.log(errorObj);

    res.json(errorObj);
  }
}

async function updateOnePokemon(req, res) {
  try {
    let targetPokemon = await Pokemon.findOne({ Name: req.params.name });

    let updatedPokemon = {
      PokedexNo: req.body.PokedexNo
        ? req.body.PokedexNo
        : targetPokemon.PokedexNo,
      Name: req.body.Name ? req.body.Name : targetPokemon.Name,
      Type: req.body.Type ? req.body.Type : targetPokemon.Type,
      Moves: req.body.Moves ? req.body.Moves.split(", ") : targetPokemon.Moves,
    };

    await Pokemon.updateOne(
      { Name: req.params.name },
      { $set: updatedPokemon },
      { upsert: true }
    );

    // res.json({
    //     message: "success",
    //     payload: updatedPokemon
    // })

    res.redirect(`/oneMon/${updatedPokemon.Name}`);
  } catch (error) {
    let errorObj = {
      message: "update one pokemon failure",
      payload: error,
    };

    console.log(errorObj);

    res.json(errorObj);
  }
}

async function pokemonCapturedByTrainer(req, res) {
  try {
    // target the pokemon
    let targetPokemon = await Pokemon.findOne({ Name: req.params.name });

    // target the trainer
    let targetTrainer = await Trainer.findOne({ _id: req.body.id });

    // Make sure the Pokemon has a TrainerList
    if (!targetPokemon.TrainerList) {
      targetPokemon.TrainerList = [];
    }

    // Make sure the Trainer has a PokemonList
    if (!targetTrainer.PokemonList) {
      targetTrainer.PokemonList = [];
    }

    // Put the trainer ID on the pokemon's TrainerList
    targetPokemon.TrainerList.addToSet(targetTrainer._id);

    // Save this change
    await targetPokemon.save();

    // put the pokemon ID on the trainer's PokemonList
    targetTrainer.PokemonList.addToSet(targetPokemon._id);

    // save this change
    await targetTrainer.save();

    // res.json({
    //     message: "success",
    //     payload: {
    //         targetPokemon,
    //         targetTrainer
    //     }
    // })

    res.redirect(`/oneMon/${targetPokemon.Name}`);
  } catch (error) {
    let errorObj = {
      message: "pokemon captured by trainer failure",
      payload: error,
    };

    console.log(errorObj);

    res.json(errorObj);
  }
}

module.exports = {
  getAllPokemon,
  getOnePokemon,
  createOnePokemon,
  deleteOnePokemon,
  updateOnePokemon,
  pokemonCapturedByTrainer,
};
