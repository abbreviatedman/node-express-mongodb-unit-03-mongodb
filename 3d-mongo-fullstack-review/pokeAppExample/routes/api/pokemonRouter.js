const router = require("express").Router();

// localhost:3000/api/pokemon/...

const {
  getAllPokemon,
  getOnePokemon,
  createOnePokemon,
  deleteOnePokemon,
  updateOnePokemon,
  pokemonCapturedByTrainer,
} = require("../../controllers/api/pokemonController");

// localhost:3000/api/pokemon/allPokemon
router.get("/allPokemon", getAllPokemon);

// localhost:3000/api/pokemon/onePokemon/:name
router.get("/onePokemon/:name", getOnePokemon);

// localhost:3000/api/pokemon/createOnePokemon
router.post("/createOnePokemon", createOnePokemon);

// localhost:3000/api/pokemon/deleteOnePokemon/:name
router.delete("/deleteOnePokemon/:name", deleteOnePokemon);

// localhost:3000/api/pokemon/updateOnePokemon/:name
router.put("/updateOnePokemon/:name", updateOnePokemon);

// localhost:3000/api/pokemon/pokemonCapturedByTrainer/:name
router.put("/pokemonCapturedByTrainer/:name", pokemonCapturedByTrainer);

module.exports = router;
