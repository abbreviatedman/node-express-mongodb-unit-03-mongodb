const router = require("express").Router();

const {
  getIndexPage,
  renderAllPokemon,
  renderOnePokemonPage,
  renderCreatePokemonForm,
  renderUpdatePokemonForm,
} = require("../../controllers/client/viewController");

// localhost:8080/
router.get("/", getIndexPage);

// localhost:8080/allMons
router.get("/allMons", renderAllPokemon);

// localhost:8080/oneMon/:name
router.get("/oneMon/:name", renderOnePokemonPage);

// localhost:8080/createOneMon
router.get("/createOneMon", renderCreatePokemonForm);

// localhost:8080/updateMon/:name
router.get("/updateMon/:name", renderUpdatePokemonForm);

module.exports = router;
