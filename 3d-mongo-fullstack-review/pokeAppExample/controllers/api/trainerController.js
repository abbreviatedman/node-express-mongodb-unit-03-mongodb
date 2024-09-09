const Trainer = require("../../models/trainerModel");

async function getAllTrainers(req, res) {
  try {
    let results = await Trainer.find({});

    res.json({
      message: "success",
      payload: results,
    });
  } catch (error) {
    let errorObj = {
      message: "get all trainers failure",
      payload: error,
    };

    console.log(errorObj);
    res.json(errorObj);
  }
}

async function getOneTrainer(req, res) {
  try {
    let result = await Trainer.findOne({ Name: req.params.name });

    res.json({
      message: "success",
      payload: result,
    });
  } catch (error) {
    let errorObj = {
      message: "get one trainer failure",
      payload: error,
    };

    console.log(errorObj);
    res.json(errorObj);
  }
}

async function createTrainer(req, res) {
  try {
    let newTrainer = req.body;

    await Trainer.create(newTrainer);

    // res.json({
    //     message: "success",
    //     payload: newTrainer
    // })

    res.redirect(`/oneTrainer/${newTrainer.Name}`);
  } catch (error) {
    let errorObj = {
      message: "create a trainer failure",
      payload: error,
    };

    console.log(errorObj);
    res.json(errorObj);
  }
}

module.exports = {
  getAllTrainers,
  getOneTrainer,
  createTrainer,
};
