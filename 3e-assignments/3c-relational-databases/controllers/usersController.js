const User = require("../models/usersModel");
const Game = require("../models/gamesModel");

async function getUsers(req, res) {
  try {
    let results = await User.find({});

    res.json({
      message: "success",
      payload: results,
    });
  } catch (error) {
    let errorObj = {
      message: "get user failure",
      payload: error,
    };

    console.log(errorObj);

    res.json(errorObj);
  }
}

async function createUser(req, res) {
  try {
    await User.create(req.body);

    res.json({
      message: "success",
      payload: await User.find({}),
    });
  } catch (error) {
    let errorObj = {
      message: "create user failure",
      payload: error,
    };

    console.log(errorObj);

    res.json(errorObj);
  }
}

async function userLikesGame(req, res) {
  try {
    // target correct user
    let targetUser = await User.findOne({ _id: req.params.id });

    // package of updated list of liked games on user collection
    let updatedUser = {
      likedGames: [...targetUser.likedGames, req.body.gameId],
    };

    // update the user document
    await User.updateOne(
      { _id: req.params.id },
      { $set: updatedUser },
      { upsert: true }
    );

    // target correct game
    let targetGame = await Game.findOne({ _id: req.body.gameId });

    // package of updated list of users who liked this game
    let updatedGame = {
      usersLiked: [...targetGame.usersLiked, req.params.id],
    };

    // update the game document
    await Game.updateOne(
      { _id: req.body.gameId },
      { $set: updatedGame },
      { upsert: true }
    );

    res.json({
      message: "success",
      payload: [updatedUser, updatedGame],
    });
  } catch (error) {
    let errorObj = {
      message: "user Likes Game failure",
      payload: error,
    };

    console.log(errorObj);

    res.json(errorObj);
  }
}

module.exports = {
  createUser,
  getUsers,
  userLikesGame,
};
