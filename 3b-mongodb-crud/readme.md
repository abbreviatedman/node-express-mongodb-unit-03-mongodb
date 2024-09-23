# 3B. MongoDB CRUD

---

## What this lesson covers:

- Getting Started
- Database
- Models
- Routes
- `C`reate
- `R`ead
- `U`pdate
- `D`estroy

---

## Getting Started

There are some starter files in this lesson, most of which are empty. It's already standard to have a Separation of Concerns by separating things into various folders, which can also provide us a good structure for the lesson. There will be a FINAL and START versions of each file we are editing. We will also be editing the `index.js` file.

To begin, there should be a package.json provided. This means we can install all the dependencies with one command:

0. Install dependencies

```
npm install
```

Now it's time to test that the server can run:

- Use `node index.js` in the terminal.
- `"server is on port 3000..."` should show up in the terminal if dependencies were installed
- Use `ctrl + c` to shut down the server

## Database

We will start by establishing a basic connection to MongoDB. In the `./database` folder, write the following in `mongodb.js`

1. Set up a connection to MongoDB using mongoose:

```js
// 1a. Import mongoose, setup .env use
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config()

// 1b. Create a connection function
const connectToMongoDb = async function () {
  mongoose.set("strictQuery", false);
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MONGODB CONNECTED");
  } catch (error) {
    console.log(error);
  }
};

// 1c. Export the function
module.exports = connectToMongoDb;
```

Next, we should make sure the correct connection string is protected by placing it in the `.env` file:

2. Place your MongoDB connection string in .env

```
MONGODB_URI="mongodb+srv://<USERNAME>:<PASSWORD>@cluster0.<CLUSTER-CODE>.mongodb.net/crud-test"
```

The end of this URI should say `.net/crud-test`. "crud-test" will be the name of the database. This way we keep the databases in our cluster separated properly.

3. Import the database connection in `index.js`

```js
const connectToMongoDb = require("./database/mongodb");
```

4. Establish the connection when the server runs

```js
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`server is on port ${PORT}...`);
  /*
       4. Establish the connection when the server runs
    */
  connectToMongoDb();
});
```

- Use `node index.js` in the terminal.
- `"server is on port 3000..."` AND `"MONGODB CONNECTED"` should show up in the terminal. If it doesn't double check that your connection URI on `.env` is correct
  - Another potential error you may get here is if your current IP is not whitelisted. Check MongoDB's Atlas interface on the web.
- Use `ctrl + c` to shut down the server

## Models

Next, we will set up our Model. This is accomplished by first setting up a Schema (collection blueprint), and exporting the model to be used elsewhere. Go to `./models/snackModel.js` to begin creating our model:

5. Set up a Model for the database

```js
const mongoose = require("mongoose");

const snackSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      unique: true,
      required: true,
    },

    category: {
      type: String,
      default: '',
    },

    calories: {
      type: Number,
      default: 0,
    },

    delicious: {
      type: Boolean,
      default: true,
    },

    comments: {
      type: Array,
      default: [],
    },
  },

  {
    timestamps: true,
  }
);

const Snack = mongoose.model("Snack", snackSchema);

module.exports = Snack;
```

- Type defines the data type
- Default sets a value for properties that may be missing
- Unique makes sure that only unique values are entered into the collection
- The second argument to `mongoose.Schema` is a configuration object. In this case, we're saying that for this model, MongoDB should store a timestamps for the last times each document was created and updated.

## Routes

Let's set up the Routes so that we can get to CRUD functionality, and test the server again as quickly as possible.

Go to `./routes/snacksRouter.js` to begin:

6. Set up basic router settings

```js
/*
    6a. Set up basic router settings
*/
const express = require("express");
const router = express.Router();
// Import the Model
const Snack = require("../models/snackModel");

/*
    6b. Export the router
*/
module.exports = router;
```

Now that the basics are set up, let's go back to `index.js` and import the router

7. Import the router

```js
const snacksRouter = require("./routes/snacksRouter");

app.use("/api", snacksRouter);
```

Before continuing, make sure to test the server

- Use `node index.js` in the terminal.
- `"server is on port 3000..."` AND `"MONGODB CONNECTED"` should show up in the terminal.
- Use `ctrl + c` to shut down the server

## `C`reate

We need to set up a way to `C`reate to our database so that we have something to `R`ead later. Let's go back to `./routes/snacksRouter.js` and set up our ability to do this:

8. Write a router method to POST to the database

```js
router.post("/snacks", async (req, res) => {
  try {
    const createdSnack = await Snack.create(req.body);
    res.json({
      message: "success",
      payload: createdSnack,
    });
  } catch (error) {
    console.log("create-snack function failed");
    console.log(error);
  }
});
```

Time to test it in postman:

- Use `node index.js` in the terminal.
- Go to Postman and make a POST request to `localhost:3000/api/snacks`
- Go to the body tab, and create a JSON object to fill out the fields
- Hit Send, and check Compass to see that it exists
- Use `ctrl + c` to shut down the server

## `R`ead

Now that we have some snacks in our database, let's make sure that the server can read the information on its own

9. Write a request handler function for GET requests to localhost:3000/api/snacks

```js
router.get("/snacks", async (req, res) => {
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
```

Time to test it in Postman:

- Use `node index.js` in the terminal.
- Go to Postman and make a GET request to `localhost:3000/api/snacks`
- Hit Send, and see if the data comes back
- Use `ctrl + c` to shut down the server

## `U`pdate

10. Write a request handler function for PUT reqeuests to localhost:3000/api/snacks

```js
router.put("snacks/:id", async (req, res) => {
  try {
    await Snack.updateOne(
      { _id: req.params.id },
      { $set: req.body },
      { upsert: true }
    );

    let updatedSnack = await Snack.findById(req.params.id);
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
```

The `Model.updateOne()` function takes in 3 arguments:

- 1. `{ _id: req.params.id }` This contains the search terms. Best practice is to target documents using the ID that was generated by the database. This is secure & accurate, and it's best to always target things by ID (or any other unique field in the document that makes it easy to target)
- 2. `$set` is the incoming set of updates to the document. Usually exists in the `req.body`
- 3. `upsert` is a combination of update & insert. It will change (update) old information to the new, incoming information. It will also add (insert) new information attached to the document that didn't previously exist

Time to test it in postman:

- Use `node index.js` in the terminal.
- Go to Postman and make a PUT request to `localhost:3000/api/snacks/[a snack ID]`
- Go to the body tab, and create a JSON object to fill out the fields
- Hit Send, and see if the data has been updated in Compass
- Use `ctrl + c` to shut down the server

## `D`estroy

11. Write a request handler function to DELETE reqeuests to localhost:3000/api/snacks

```js
router.delete("/snacks/:id", async (req, res) => {
  try {
    await Snack.findByIdAndDelete(req.params.id);
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
```

Time to test it in postman:

- Use `node index.js` in the terminal.
- Go to Postman and make a DELETE request to `localhost:3000/api/snacks/[a snack ID]`
- Make sure to use an ID from a snack in your database
- Hit Send, and see if the data has been updated in Compass
- Use `ctrl + c` to shut down the server
