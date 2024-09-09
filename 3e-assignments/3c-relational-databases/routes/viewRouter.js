const router = require("express").Router();

const {
  getHomePage,
  getUsersPage,
  getGamesPage,
  getOneUserPage,
  getOneGamePage,
} = require("../controllers/viewController");

// localhost:3000/
router.get("/", getHomePage);

// localhost:3000/users
router.get("/users", getUsersPage);

// localhost:3000/users/:id
router.get("/users/:id", getOneUserPage);

// localhost:3000/games/:id
router.get("/games/:id", getOneGamePage);

// localhost:3000/games
router.get("/games", getGamesPage);

module.exports = router;
