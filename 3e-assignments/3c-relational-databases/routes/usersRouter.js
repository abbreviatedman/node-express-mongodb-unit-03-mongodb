const router = require("express").Router();

const {
  createUser,
  getUsers,
  userLikesGame,
} = require("../controllers/usersController");

// localhost:3000/api/users/getUsers
router.get("/getUsers", getUsers);

// localhost:3000/api/users/createUser
router.post("/createUser", createUser);

// localhost:3000/api/users/userLikesGame/:id
router.put("/userLikesGame/:id", userLikesGame);

module.exports = router;
