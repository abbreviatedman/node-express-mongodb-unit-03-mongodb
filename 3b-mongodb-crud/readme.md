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
<!-- 0. Install dependencies -->

```
npm install
```

Now it's time to test that the server is running:

- Use `node index.js` in the terminal.
- `"server is on port 8080..."` should show up in the terminal if dependencies were installed
- Use `ctrl + c` to shut down the server

## Database

We will start by establishing a basic connection to MongoDB. In the `./database` folder, write the following on `mongodb.js`

1. Set up a connection to MongoDB using mongoose:
<!-- 1. Set up a connection to MongoDB using mongoose: -->

```js
// 1a. Import mongoose, setup .env use
const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set("strictQuery", false);

// 1b. Create a connection function
function connectToMongoDB() {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("MONGODB CONNECTED");
    })
    .catch((e) => {
      console.log(e);
    });
}

// 1c. Export the function
module.exports = connectToMongoDB;
```

Next, we should make sure the correct connection string is protected by placing it in the `.env` file:

2. Place your MongoDB connection string in .env
<!-- 2. Place your MongoDB connection string in .env -->

```
MONGODB_URI="mongodb+srv://<USERNAME>:<PASSWORD>@cluster0.<CLUSTER-CODE>.mongodb.net/CRUD-test"
```

The end of this URI should say `.net/CRUD-test`. This way we keep the databases in our cluster separated properly.

3. Import the database connection on `index.js`
<!-- 3. Import the database connection on `index.js` -->

```js
const connectToMongoDB = require("./database/mongodb");
```

4. Establish the connection when the server runs
<!-- 4. Establish the connection when the server runs -->

```js
app.listen(PORT, () => {
  console.log(`server is on port ${PORT}...`);
  /*
       4. Establish the connection when the server runs
    */
  connectToMongoDB();
});
```

- Use `node index.js` in the terminal.
- `"server is on port 8080..."` AND `"MONGODB CONNECTED"` should show up in the terminal. If it doesn't double check that your connection URI on `.env` is correct
- Use `ctrl + c` to shut down the server

## Models

Next, we will set up our Model. This is accomplished by first setting up a Schema (collection blueprint), and exporting the model to be used elsewhere. Go to `./models/snackModel.js` to begin creating our model:

5. Set up a Model for the database
<!-- 5. Set up a Model for the database -->

```js
const mongoose = require("mongoose");

const snackSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      default: "",
      unique: true,
    },
    category: {
      type: String,
      default: "",
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

## Routes

Let's set up the Routes so that we can get to CRUD functionality, and test the server again as quickly as possible.

Go to `./routes/snackRouter.js` to begin:

6. Set up basic router settings
<!-- 6. Set up basic router settings -->

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
<!-- 7. Import the router -->

```js
const snackRouter = require("./routes/snackRouter");

app.use("/api", snackRouter);
```

Before continuing, make sure to test the server

- Use `node index.js` in the terminal.
- `"server is on port 8080..."` AND `"MONGODB CONNECTED"` should show up in the terminal.
- Use `ctrl + c` to shut down the server

## `C`reate

We need to set up a way to `C`reate to our database so that we have something to `R`ead later. Let's go back to `./routes/snackRouter.js` and set up our ability to do this:

8. Write a router method to POST to the database
<!-- 8. Write a router method to post to the database -->

```js
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
```

Time to test it in postman:

- Use `node index.js` in the terminal.
- Go to Postman and make a POST request to `localhost:8080/api/create-snack`
- Go to the body tab, and create a JSON object to fill out the fields
- Hit Send, and check Compass to see that it exists
- Use `ctrl + c` to shut down the server

## `R`ead

Now that we have some snacks in our database, let' make sure that the server can read the information on it's own

9. Write a router method to GET from the database
<!-- 9. Write a router method to GET from the database -->

```js
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
```

Time to test it in postman:

- Use `node index.js` in the terminal.
- Go to Postman and make a GET request to `localhost:8080/api`
- Hit Send, and see if the data comes back
- Use `ctrl + c` to shut down the server

## `U`pdate

10. Write a router method to PUT into the database
<!-- 10. Write a router method to PUT into the database -->

```js
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
```

The `Model.updateOne()` function takes in 3 arguments:

- 1. `{ _id: req.params.id }` This contains the search terms. Best practice is to target documents using the ID that was generated by the database. This is secure & accurate, and it's best to always target things by ID (or any other unique field in the document that makes it easy to target)
- 2. `$set` is the incoming set of updates to the document. Usually exists in the `req.body`
- 3. `upsert` is a combination of update & insert. It will change (update) old information to the new, incoming information. It will also add (insert) new information attached to the document that didn't previously exist

Time to test it in postman:

- Use `node index.js` in the terminal.
- Go to Postman and make a PUT request to `localhost:8080/api/update-snack`
- Go to the body tab, and create a JSON object to fill out the fields
- Hit Send, and see if the data has been updated in Compass
- Use `ctrl + c` to shut down the server

## `D`estroy

11. Write a router method to DELETE from the database
<!-- 11. Write a router method to DELETE from the database -->

```js
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
```

Time to test it in postman:

- Use `node index.js` in the terminal.
- Go to Postman and make a DELETE request to `localhost:8080/api/delete-snack`
- Make sure to use an ID from a snack in your database
- Hit Send, and see if the data has been updated in Compass
- Use `ctrl + c` to shut down the server
