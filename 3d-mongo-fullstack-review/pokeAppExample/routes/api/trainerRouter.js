const router = require("express").Router();

const {
  getAllTrainers,
  getOneTrainer,
  createTrainer,
} = require("../../controllers/api/trainerController");

// localhost:3000/api/trainers/allTrainers
router.get("/allTrainers", getAllTrainers);

// localhost:3000/api/trainers/oneTrainer/:name
router.get("/oneTrainer/:name", getOneTrainer);

// localhost:3000/api/trainers/createTrainer
router.post("/createTrainer", createTrainer);

module.exports = router;
