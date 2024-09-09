// 3a. Import express, router, and controller functionality
const express = require("express");
const router = express.Router();
const { createAlbum } = require("./albumsController");

// 3b. Deal with a request for a POST to /api/albums
//   We deal with the network code here, and leave the database code to the
//   controller.
router.post("/", async function (req, res) {
  try {
    const newAlbum = await createAlbum(req.body);
    res.json({
      message: "success",
      payload: newAlbum,
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

// 3c. Export the router
module.exports = router;
