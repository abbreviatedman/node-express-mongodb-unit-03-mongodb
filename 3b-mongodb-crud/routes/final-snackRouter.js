/*
    6a. Set up basic router settings
*/
const express = require("express");
const router = express.Router();
// import the snack model
const Snack = require("../models/snackModel");

/*
    9. Write a router method to GET from the database
*/
// localhost:8080/api/
router.get("/", async (req, res) => {
  try {
    let foundSnacks = await Snack.find({});

    res.json({
      message: "success",
      payload: foundSnacks,
    });
  } catch (error) {
    console.log("error finding all snacks");
    console.log(error);
  }
});

/*
    8. Write a router method to post to the database
*/
// localhost:8080/api/create-snack
router.post("/create-snack", async (req, res) => {
  try {
    await Snack.create(req.body);

    res.json({
      message: "success",
      payload: req.body,
    });
  } catch (error) {
    console.log("create-snack function failed");
    console.log(error);
  }
});

/*
    10. Write a router method to PUT into the database
*/
// localhost:8080/api/update-snack/:id
router.put("/update-snack/:id", async (req, res) => {
  try {
    await Snack.updateOne(
      { _id: req.params.id },
      { $set: req.body },
      { upsert: true }
    );

    let updatedSnack = await Snack.find({ _id: req.params.id });

    res.json({
      message: "success",
      payload: updatedSnack,
    });
  } catch (error) {
    let errorPacket = {
      message: "update snack failure",
      payload: error,
    };

    res.json(errorPacket);

    console.log(errorPacket);
  }
});

/*
    11. Write a router method to DELETE from the database
*/
// localhost:8080/api/delete-snack/:id
router.delete("/delete-snack/:id", async (req, res) => {
  try {
    await Snack.findByIdAndDelete({ _id: req.params.id });

    res.json({
      message: "success",
      payload: await Snack.find({}),
    });
  } catch (error) {
    let errorPacket = {
      message: "delete snack failure",
      payload: error,
    };

    res.json(errorPacket);

    console.log(errorPacket);
  }
});

/*
    6b. Export the router
*/
module.exports = router;
