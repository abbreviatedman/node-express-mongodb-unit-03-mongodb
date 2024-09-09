const User = require("../models/usersModel");
const Game = require("../models/gamesModel");

function getHomePage(req, res) {
  res.render("home");
}

async function getUsersPage(req, res) {
  try {
    let results = await User.find({});

    res.render("users", { users: results });
  } catch (error) {
    let errorObj = {
      message: "getUsersPage failure",
      payload: error,
    };

    console.log(errorObj);

    res.json(errorObj);
  }
}

async function getOneUserPage(req, res) {
  try {
    let foundUser = await User.findOne({ _id: req.params.id });

    let gamesArray = [];

    foundUser.likedGames.forEach(async (gameId) => {
      let gameDoc = await Game.findOne({ _id: gameId });

      gamesArray.push(gameDoc);

      if (gamesArray.length === foundUser.likedGames.length) {
        res.render("oneUser", { user: foundUser, games: gamesArray });
      }
    });
  } catch (error) {
    let errorObj = {
      message: "getOneUserPage failure",
      payload: error,
    };

    console.log(errorObj);

    res.json(errorObj);
  }
}

async function getOneGamePage(req, res) {
  try {
    let foundGame = await Game.findOne({ _id: req.params.id });

    let usersArray = [];

    foundGame.usersLiked.forEach(async (userId) => {
      let userDoc = await User.findOne({ _id: userId });

      usersArray.push(userDoc);

      if (usersArray.length === foundGame.usersLiked.length) {
        res.render("oneGame", { game: foundGame, users: usersArray });
      }
    });
  } catch (error) {
    let errorObj = {
      message: "getOneGamePage failure",
      payload: error,
    };

    console.log(errorObj);

    res.json(errorObj);
  }
}

async function getGamesPage(req, res) {
  try {
    let results = await Game.find({});

    res.render("games", { games: results });
  } catch (error) {
    let errorObj = {
      message: "getGamesPage failure",
      payload: error,
    };

    console.log(errorObj);

    res.json(errorObj);
  }
}

module.exports = {
  getHomePage,
  getUsersPage,
  getGamesPage,
  getOneUserPage,
  getOneGamePage,
};
