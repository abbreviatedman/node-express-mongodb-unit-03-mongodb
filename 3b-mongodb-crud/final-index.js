/*
    0. Starter code - Modules
*/
const express = require("express");
const app = express();
const logger = require("morgan");

/*
    3. Import the database connection on `index.js`
*/
const connectToMongoDB = require("./database/mongodb");

/*
    0. Starter code - Middleware
*/
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(logger("dev"));

/*
    7. Import the router
*/
const snackRouter = require("./routes/snackRouter");

app.use("/api", snackRouter);

/*
    0. Starter code - Server start
*/
const PORT = 8080;

app.listen(PORT, () => {
  console.log(`server is on port ${PORT}...`);
  /*
       4. Establish the connection when the server runs
    */
  connectToMongoDB();
});
