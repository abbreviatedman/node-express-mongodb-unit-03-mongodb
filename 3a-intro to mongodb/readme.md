# 3A. Intro to MongoDB

---

## What this lesson covers:

- MongoDB Atlas & MongoDB Compass
- Environment Variables
- Defining a Schema
- Models

## MongoDB Atlas & MongoDB Compass

MongoDB is a Database manager that allows you to connect your data set to your application and manage it through other languages. It's a NoSQL framework, and uses various software to manage your database as an administrator.

The way MongoDB is set up is that Atlas holds the database analytics & administrative settings on the cloud, and Compass is the GUI (Graphical User Interface) that lives on your computer as an application that manages the data itself.

During this setup process, we will be going back and forth to connect these 2 interfaces. Then, we will often go back and forth between VSCode, Compass, and Atlas as needed

1. Download MongoDB Compass (https://www.mongodb.com/try/download/compass)

Download the version (Mac or Windows) that matches your machine.

2. Begin MongoDB Atlas setup (https://www.mongodb.com/try)

- Create an account. Save your username and password somewhere you can access from any machine. Write it down on paper or in a cloud-saved note or somewhere accessile.
- Upon creating an account, you will be asked a few question on how you plan on using Atlas. The answers given on this first page do not matter.
- Select M0 database, because it's free. By default, M10 may be selected, PLEASE MAKE SURE YOU SELECT THE FREE VERSION.
- Select Google Cloud, every other setting has been default.
- Create Cluster0.
- Create a database user (Username and Password). It's recommended to use the same password as for your MongoDB account—the one you saved somewhere.
- "Where would you like to connect from?" Select My Local Environment. The IP address of the computer you are on will automatically be added.
- NOTE: if you use a computer at home AND ALSO commute to class in person, you will need to whitelist BOTH IP addresses.
- Finish and close.
- Your Cluster0 should appear with a "CONNECT" button under it, click that button.
- Compass > I have MongoDB Compass Installed > Latest version.
- Copy the connection string, then go back to MongoDB Compass.
- Paste the string into the URI field. In the space where it says `<password>`, replace it with your password. SAVE THIS STRING SOMEWHERE SAFE UNTIL WE NEED IT.
- Press Connect.

By now, you should have Atlas and Compass both set up. Let's begin setting up our project.

3. In a VSCode terminal, navigate to the 3a directory and initialize the project:

```
npm init -y
```

4. Install the necessary modules for this lesson:

- express
- mongoose
- dotenv

```
npm install express mongoose dotenv
```

5. Import the necessary modules on **index.js**

```js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv"):

const app = express();
// Handles our Environment Variables
dotenv.config();
```

6. Listen to a port

```js
app.listen(3000, () => {
  console.log(`server on port 3000`);
});
```

As usual, we test the server!

- `node index.js`
- "server on port 3000" is in the console
- `ctrl + c` to shut down the server

## Environment Variables

An Environment Variable is a dynamic-named value that can affect the way running processes will behave on a computer. In the context of this lesson, we will be storing sensitive information about our database as an Environment Variable, and keeping it protected from being seen on the outside.

We need to use our URI connection string (Instructions above said in ALL CAPS to save the string somewhere SAFE) to establish a connection to MongoDB.

7. Create a file called `.env`, and place this string on the first line

```
MONGODB_URI="mongodb+srv://<USERNAME>:<PASSWORD>@cluster0.<CLUSTER-CODE>.mongodb.net/test"
```

- In place of `<USERNAME>` should be the username you created
- In place of `<PASSWORD>` should be the password you created
- In place of `<CLUSTER-CODE>` should be the generated code for your cluster
- The `/test` at the end is the name of your database

8. Create a file called `.gitignore` to protect this variable from being seen on Github

```
\.node_modules
\.env
```

This file stops the listed files from being uploaded to Github. This way, if we upload our application to share it with others, our Environment Variables (and any credentials listed on it) remain safe and unseen (as well as stopping us from uploading local node module files).

Next, we can establish a connection with our database using Mongoose

9. Establish a connection to our database. We'll create an async function to do so.

```js
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
```

`process.env.MONGODB_URI` is used to get the value from our Environment Variable.

`mongoose.set('strictQuery', false);` is a setting that mongoose currently needs.

## Defining a Schema

A Schema defines the structure of the document, with all the field names and data types. `mongoose.Schema()` will take in a javascript object, which we will use to define the keys and their type for our document.

10. Create a schema for a new collection

```js
const studentSchema = new mongoose.Schema({
  studentId: {
    type: Number,
    required: true,
  },

  name: String,
  year: Number,
  subjects: [String],
  retake: Boolean,
});
```

## Models

A database model shows the logical structure of a database, including the relationships and constraints that determine how data can be stored and accessed. In the context of MongoDB, our model will allow us to `C`reate, `R`ead, `U`pdate, and `D`estroy documents within our collection.

Let's create our model by passing in the schema and a name for our model.

11. Create our model

```js
const Student = mongoose.model("Student", studentSchema);
```

- `Student` is the name for the model, so a collection will be created with a name "students" (plural form of the name with all lowercase)
- `studentSchema` is the schema we have created just now.

Let's add a document whenever our app is loaded.

12. A) Add a document on load. We'll use an async function to do so.

```js
// 12a. Create a document via the model
const addStudent = async function() {
    const student = new Student({
        studentId: 1001,
        name: "Estudiante de Muestra",
        year: 7,
        subjects: ["Mongo", "Express", "React", "Node"],
        retake: false,
    });
}
```

By creating an object containing the values to our model `Student`, we can create a new document and use the `save()` method to save our document to the database:

12. B) Send the document to the database and call our async function.

```js
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
```

Take note that all of this code is running EVERY TIME the server turns on, which means this document will be duplicated and you will have multiple "Estudiante de Muestra" documents on your `students` collection anytime you reset the server.

Finally, let's define a GET request for the root URL that returns all the documents in the Student collection. This should return the document we added.

13. Set up a GET request to `localhost:3000`

```js
app.get("/", async (req, res) => {
    try {
        const students = await Student.find({})
        res.status(200).json(students);
    } catch (error) {
        console.log(err);
        res.send("Something bad happened");
    }
}
```

- `model.find()` find and returns documents.
- The first argument is to specify queries to receive documents that match a particular condition. Here, we leave it blank to get back all the documents.
- The try/catch will find the documents that meet the condition, and handle any error if it occurs.
- If there's no error `res.json(students)` returns the documents to the client.

Let's try running the app!

- `node index.js`
- "server on port 3000" is in the console.
- "One entry added" should show up in the console
- Use Postman or the Browser and make a GET request to `localhost:3000`
- Our document should show up in Postman (or the Browser, if that's what you used to test it)
- "students" collection should also show up in MongoDB Compass!
- MongoDB Atlas should also display a rise in it's graph, demonstrating that a connection has been established
- `ctrl + c` to shut down the server
