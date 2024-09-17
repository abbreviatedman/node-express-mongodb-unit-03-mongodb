/*
    7. Set up the users router
*/


// 7a. Import express, router, and controller functionality
const express = require("express");
const router = express.Router();
const { createUser } = require("./usersController");

// 7b. Route the ability to create a user at localhost:3000/api/users
//   We deal with the network code here, and leave the database code to the
//   controller.
router.post("/", async function (req, res) {
  try {
    const newUser = await createUser(req.body);
    res.json({
      message: "success",
      payload: newUser,
    });
  } catch (error) {
    const errorPacket = {
      message: "failure",
      payload: error,
    };

    console.log(errorPacket);
    res.json(errorPacket);
  }
});

// 7c. Export the router
module.exports = router;
