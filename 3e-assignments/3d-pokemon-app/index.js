/*
    IMPORTS
*/
const express = require("express");
const app = express();
const path = require("path");
const connectToMongoDB = require("./db/mongodb");
require("dotenv").config();
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
// Read incoming requests properly
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// We can use HTML methods with back-end methods smoothly
app.use(methodOverride("_method"));

/*
    ROUTING
*/
const viewRouter = require("./routes/client/viewRouter");
// localhost:8080/...
app.use("/", viewRouter);

const pokemonRouter = require("./routes/api/pokemonRouter");
// localhost:8080/api/pokemon/...
app.use("/api/pokemon", pokemonRouter);

/*
    POWER
*/
const PORT = 8080;

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);

  connectToMongoDB();
});
