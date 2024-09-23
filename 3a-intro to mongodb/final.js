/*
    5. Import the necessary modules
*/
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv');

const app = express();
// Handles our Environment Variables
dotenv.config();

/*
    9. Establish a connection to our database
*/
const connectToMongoDb = async function () {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Connected to Atlas cluster.');
    } catch (error) {
        console.log(error);
    }
}

mongoose.set("strictQuery", false);
connectToMongoDb();

/*
    10. Create a schema for a new collection
*/
const studentSchema = new mongoose.Schema({
    studentId: {
        type: Number,
        required: true,
    },

    name: String,
    year: Number,
    subjects: [String],
    retake: Boolean
});

/*
    11. Create our model
*/
const Student = mongoose.model("Student", studentSchema);

/*
    12. Add a document on load
*/
// 12a. Create a document via the model
const addStudent = async function() {
    const student = new Student({
        studentId: 1001,
        name: "Estudiante de Muestra",
        year: 7,
        subjects: ["Mongo", "Express", "React", "Node"],
        retake: false,
    });

    // 12b. Send the document to the database
    try {
        await student.save()
        console.log("One entry added");
    } catch(err) {
        console.log(err);
    }
}

addStudent();


/*
    13. Set up a GET request to `localhost:3000`
*/
app.get("/", async (req, res) => {
    try {
        const students = await Student.find({})
        res.status(200).json(students);
    } catch (error) {
        console.log(err);
        res.send("Something bad happened");
    }
})

/*
    6. Listen to a port
*/
app.listen(3000, () => {
  console.log(`server on port 3000`);
});
