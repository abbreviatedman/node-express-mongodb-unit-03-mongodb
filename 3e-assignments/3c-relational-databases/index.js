/*
    IMPORTS
*/
const express = require("express");
const app = express();
const connectToMongoDB = require("./db/mongodb");
const logger = require("morgan");
const path = require("path");

/*
    MIDDLEWARE
*/
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(logger("dev"));

/*
    ROUTES
*/
const viewRouter = require("./routes/viewRouter");
// localhost:3000/...
app.use("/", viewRouter);

const gamesRouter = require("./routes/gamesRouter");
// localhost:3000/api/games/...
app.use("/api/games", gamesRouter);

const userRouter = require("./routes/usersRouter");
// localhost:3000/api/users...
app.use("/api/users", userRouter);

/*
    APP LISTENING
*/
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`server is on port ${PORT}`);

  connectToMongoDB();
});
