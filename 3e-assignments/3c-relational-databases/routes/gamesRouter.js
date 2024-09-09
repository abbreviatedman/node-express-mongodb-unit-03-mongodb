const router = require("express").Router();

const { createGame } = require("../controllers/gamesController");

// localhost:3000/api/games/createGame
router.post("/createGame", createGame);

module.exports = router;
