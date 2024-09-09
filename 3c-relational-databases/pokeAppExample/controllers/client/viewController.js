const Pokemon = require("../../models/pokemonModel");
const Trainer = require("../../models/trainerModel");

function getIndexPage(req, res) {
  res.render("index");
}

async function renderAllPokemon(req, res) {
  try {
    let results = await Pokemon.find({});

    res.render("allMons", { pokemon: results });
  } catch (error) {
    let errorObj = {
      message: "render all pokemon failure",
      payload: error,
    };

    console.log(errorObj);

    res.json(errorObj);
  }
}

async function renderOnePokemonPage(req, res) {
  try {
    let result = await Pokemon.findOne({ Name: req.params.name });

    let allTrainers = await Trainer.find({});

    res.render("oneMon", { pokemon: result, allTrainers: allTrainers });
  } catch (error) {
    let errorObj = {
      message: "render one pokemon failure",
      payload: error,
    };

    console.log(errorObj);

    res.json(errorObj);
  }
}

function renderCreatePokemonForm(req, res) {
  res.render("createMon");
}

async function renderUpdatePokemonForm(req, res) {
  try {
    let result = await Pokemon.findOne({ Name: req.params.name });

    res.render("updateMon", { pokemon: result });
  } catch (error) {
    let errorObj = {
      message: "render update pokemon failure",
      payload: error,
    };

    console.log(errorObj);

    res.json(errorObj);
  }
}

async function renderAllTrainers(req, res) {
  try {
    let results = await Trainer.find({});

    res.render("allTrainers", { trainers: results });
  } catch (error) {
    let errorObj = {
      message: "render all trainers failure",
      payload: error,
    };

    console.log(errorObj);

    res.json(errorObj);
  }
}

async function renderOneTrainer(req, res) {
  try {
    let result = await Trainer.findOne({ Name: req.params.name });

    let allPokemon = await Pokemon.find({});

    res.render("oneTrainer", { trainer: result, allPokemon: allPokemon });
  } catch (error) {
    let errorObj = {
      message: "render one trainer failure",
      payload: error,
    };

    console.log(errorObj);

    res.json(errorObj);
  }
}

function renderCreateTrainerForm(req, res) {
  res.render("createTrainer");
}

module.exports = {
  getIndexPage,
  renderAllPokemon,
  renderOnePokemonPage,
  renderCreatePokemonForm,
  renderUpdatePokemonForm,
  renderAllTrainers,
  renderOneTrainer,
  renderCreateTrainerForm,
};
