const router = require("express").Router();

const {
  getAllPokemon,
  getOnePokemon,
  createOnePokemon,
  deleteOnePokemon,
  updateOnePokemon,
} = require("../../controllers/api/pokemonController");

// localhost:8080/api/pokemon/allPokemon
router.get("/allPokemon", getAllPokemon);

// localhost:8080/api/pokemon/onePokemon/:name
router.get("/onePokemon/:name", getOnePokemon);

// localhost:8080/api/pokemon/createOnePokemon
router.post("/createOnePokemon", createOnePokemon);

// localhost:8080/api/pokemon/deleteOnePokemon/:name
router.delete("/deleteOnePokemon/:name", deleteOnePokemon);

// localhost:8080/api/pokemon/updateOnePokemon/:name
router.put("/updateOnePokemon/:name", updateOnePokemon);

module.exports = router;
