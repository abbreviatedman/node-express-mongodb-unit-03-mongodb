/*
    5. Import the necessary modules
*/
const express = require("express");
const app = express();
const mongoose = require("mongoose");
// Handles our Environment Variables
require("dotenv").config();

/*
    9. Establish a connection to our database
*/
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

/*
    10. Create a schema for a new collection
*/
const studentSchema = new mongoose.Schema({
  roll_no: {
    type: Number,
    required: true,
  },
  name: String,
  year: Number,
  subjects: [String],
});

/*
    11. Create our model
*/
const Student = mongoose.model("Student", studentSchema);

/*
    12. Add a document on load
*/
// 12a. Create a document via the model
const stud = new Student({
  roll_no: 1001,
  name: "Estudiante de Muestra",
  year: 7,
  subjects: ["Mongo", "Express", "React", "Node"],
});
// 12b. Send the document to the database
stud.save().then(
  () => console.log("One entry added"),
  (err) => console.log(err)
);

/*
    13. Set up a GET request to `localhost:8080`
*/
app.get("/", (req, res) => {
  Student.find({}, (err, found) => {
    if (!err) {
      res.send(found);
    } else {
      console.log(err);
      res.send("Something bad happened");
    }
  }).catch((err) => console.log(`error: ${err}`));
});

/*
    6. Listen to a port
*/
app.listen(8080, () => {
  console.log(`server on port 8080`);
});
