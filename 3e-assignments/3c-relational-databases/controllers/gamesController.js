const Game = require("../models/gamesModel");

async function createGame(req, res) {
  try {
    await Game.create(req.body);

    res.json({
      message: "success",
      payload: await Game.find({}),
    });
  } catch (error) {
    let errorObj = {
      message: "createGame failure",
      payload: error,
    };

    console.log(errorObj);

    res.json(errorObj);
  }
}

module.exports = {
  createGame,
};
