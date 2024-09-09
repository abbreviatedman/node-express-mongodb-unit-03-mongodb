const express = require("express");
const router = express.Router();

// localhost:3000/...

const {
  getIndexPage,
  renderAllPokemon,
  renderOnePokemonPage,
  renderCreatePokemonForm,
  renderUpdatePokemonForm,
  renderAllTrainers,
  renderOneTrainer,
  renderCreateTrainerForm,
} = require("../../controllers/client/viewController");

// localhost:3000/
router.get("/", getIndexPage);

// localhost:3000/allMons
router.get("/allMons", renderAllPokemon);

// localhost:3000/oneMon/:name
router.get("/oneMon/:name", renderOnePokemonPage);

// localhost:3000/createOneMon
router.get("/createOneMon", renderCreatePokemonForm);

// localhost:3000/updateMon/:name
router.get("/updateMon/:name", renderUpdatePokemonForm);

// localhost:3000/allTrainers
router.get("/allTrainers", renderAllTrainers);

// localhost:3000/oneTrainer/:name
router.get("/oneTrainer/:name", renderOneTrainer);

// localhost:3000/createTrainer
router.get("/createTrainer", renderCreateTrainerForm);

module.exports = router;
