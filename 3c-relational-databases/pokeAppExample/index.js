/*
    IMPORTS
*/
const express = require("express");
const app = express();
const path = require("path");
const connectToMongoDB = require("./database/mongodb");
const methodOverride = require("method-override");

/*
    MIDDLEWARE
*/
// Set view engine to EJS
app.set("view engine", "ejs");
// Set view engine to look at the "views" folder
app.set("views", path.join(__dirname, "views"));
// Use the "public" folder to read static files such as CSS
app.use(express.static(path.join(__dirname, "public")));
//
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// HTML only knows GET / POST
app.use(methodOverride("_method"));

/*
    ROUTES
*/
// localhost:3000/...
const viewRouter = require("./routes/client/viewRouter");
app.use("/", viewRouter);

// localhost:3000/api/pokemon/...
const pokemonRouter = require("./routes/api/pokemonRouter");
app.use("/api/pokemon", pokemonRouter);

// localhost:3000/api/trainers...
const trainerRouter = require("./routes/api/trainerRouter");
app.use("/api/trainers", trainerRouter);

/*
    PORT
*/
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`server ${PORT}`);
  connectToMongoDB();
});
