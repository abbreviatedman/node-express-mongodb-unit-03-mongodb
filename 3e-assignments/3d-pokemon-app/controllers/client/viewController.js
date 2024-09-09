const Pokemon = require("../../models/pokemonModel");

function getIndexPage(req, res) {
  res.render("index");
}

async function renderAllPokemon(req, res) {
  try {
    let result = await Pokemon.find({});

    res.render("allMons", { pokemon: result });
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

    res.render("oneMon", { pokemon: result });
  } catch (error) {
    let errorObj = {
      message: "render one pokemon failure",
      payload: error,
    };

    console.log(errorObj);

    res.json(errorObj);
  }
}

async function renderCreatePokemonForm(req, res) {
  try {
    res.render("createMon");
  } catch (error) {
    let errorObj = {
      message: "render create pokemon form failure",
      payload: error,
    };

    console.log(errorObj);

    res.json(errorObj);
  }
}

async function renderUpdatePokemonForm(req, res) {
  try {
    let result = await Pokemon.findOne({ Name: req.params.name });

    res.render("updateMon", { pokemon: result });
  } catch (error) {
    let errorObj = {
      message: "render update pokemon form failure",
      payload: error,
    };

    console.log(errorObj);

    res.json(errorObj);
  }
}

module.exports = {
  getIndexPage,
  renderAllPokemon,
  renderOnePokemonPage,
  renderCreatePokemonForm,
  renderUpdatePokemonForm,
};
