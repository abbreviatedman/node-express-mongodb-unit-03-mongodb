1. To add a new collection, create the following:
   **BACKEND**

- trainerModel.js
- trainerController.js
- trainerRouter.js

**FRONTEND**

- allTrainers.ejs
- oneTrainer.ejs

`trainerModel.js`

```js
const mongoose = require("mongoose");

const trainerSchema = new mongoose.Schema({
  Name: {
    type: String,
    unique: true,
    required: true,
  },
  Region: {
    type: String,
    required: true,
    default: "Kanto",
  },
});

const Trainer = mongoose.model("Trainer", trainerSchema);

module.exports = Trainer;
```

`trainerController.js`

```js
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

module.exports = {
  getAllTrainers,
};
```

`trainerRouter.js`

```js
const router = require("express").Router();

const { getAllTrainers } = require("../../controllers/api/trainerController");

// localhost:3000/api/trainers/allTrainers
router.get("/allTrainers", getAllTrainers);

module.exports = router;
```

connecting it to `index.js`:

```js
// localhost:3000/api/trainers...
const trainerRouter = require("./routes/api/trainerRouter");
app.use("/api/trainers", trainerRouter);
```

here is some starter data:

```json
[
  {
    "Name": "Ash Ketchum",
    "Region": "Kanto"
  },
  {
    "Name": "Gary Oak",
    "Region": "Kanto"
  },
  {
    "Name": "Brock",
    "Region": "Kanto"
  },
  {
    "Name": "Misty",
    "Region": "Kanto"
  },
  {
    "Name": "May",
    "Region": "Hoenn"
  },
  {
    "Name": "Dawn",
    "Region": "Sinnoh"
  },
  {
    "Name": "Serena",
    "Region": "Kalos"
  },
  {
    "Name": "Kiawe",
    "Region": "Alola"
  },
  {
    "Name": "Chloe",
    "Region": "Galar"
  },
  {
    "Name": "Raihan",
    "Region": "Galar"
  }
]
```

`allTrainers.ejs`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Pokemon App</title>
  </head>
  <body>
    <h1>Here is a list of all Trainers:</h1>
    <a href="/">Go back home</a>

    <% trainers.forEach((trainer) => { %>
    <h2>Name: <%=trainer.Name%></h2>
    <% }) %>
  </body>
</html>
```

add a link to `index.ejs`

```html
<a href="/allTrainers">See a list of all Trainers</a>
```

add to the `viewController.js`:

```js
async function renderAllTrainers(req, res) {
  try {
    let results = await Trainer.find({});

    res.render("allTrainers", { trainers: results });
  } catch (error) {
    let errorObj = {
      message: "render all trainers failure",
      payload: error,
    };

    console.log(errorObj);

    res.json(errorObj);
  }
}
```

Export it at the bottom, and import it on `viewRouter.js` so we can set up the route:

```js
// localhost:3000/allTrainers
router.get("/allTrainers", renderAllTrainers);
```

2. Read ONE trainer
   **BACKEND**

- Modify `trainerController.js`
- Modify `trainerRouter.js`

**FRONTEND**

- Create `oneTrainer.ejs`
- Link to it from `allTrainers.ejs`
- Modify `viewController.js`
- Modify `viewRouter.js`

Add this to `trainerController.js`:

```js
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
```

Export at the bottom, and import on `trainerRouter.js` before adding the route:

```js
// localhost:3000/api/trainers/oneTrainer/:name
router.get("/oneTrainer/:name", getOneTrainer);
```

link to it from `allTrainers.ejs`:

```html
<h2>
  Name:
  <a href="/oneTrainer/<%=trainer.Name%>"> <%=trainer.Name%> </a>
</h2>
```

add this function to `viewController.js`:

```js
async function renderOneTrainer(req, res) {
  try {
    let result = await Trainer.findOne({ Name: req.params.name });

    res.render("oneTrainer", { trainer: result });
  } catch (error) {
    let errorObj = {
      message: "render one trainer failure",
      payload: error,
    };

    console.log(errorObj);

    res.json(errorObj);
  }
}
```

export it at the bottom, and import it on `viewRouter.js` so we can define the route:

```js
// localhost:3000/oneTrainer/:name
router.get("/oneTrainer/:name", renderOneTrainer);
```

3. Create a trainer
   **BACKEND**

- Modify `trainerController.js`
- Modify `trainerRouter.js`

**FRONTEND**

- Create `createTrainer.ejs`
- Modify `allTrainers.ejs`
- Modify `viewController.js`
- Modify `viewRouter.js`
- Modify `trainerController.js` to redirect

add this to `trainerController.js`:

```js
async function createTrainer(req, res) {
  try {
    let newTrainer = req.body;

    await Trainer.create(newTrainer);

    res.json({
      message: "success",
      payload: newTrainer,
    });
  } catch (error) {
    let errorObj = {
      message: "create a trainer failure",
      payload: error,
    };

    console.log(errorObj);
    res.json(errorObj);
  }
}
```

Export it at the bottom, and import it on `trainerRouter.js` to define the route:

```js
// localhost:3000/api/trainers/createTrainer
router.post("/createTrainer", createTrainer);
```

Make `createTrainer.ejs`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Pokemon App</title>
  </head>
  <body>
    <h1>Fill out the form to create a new Trainer</h1>
    <br />
    <a href="/allTrainers">Back to all Trainers</a>

    <br /><br />

    <form action="/api/trainers/createTrainer" method="post">
      <label for="Name">Name</label>
      <input type="text" id="Name" name="Name" />

      <br /><br />

      <label for="Region">Region</label>
      <input type="text" id="Region" name="Region" />

      <br /><br />

      <input type="submit" value="Create Trainer" />
    </form>
  </body>
</html>
```

Make sure to add a link from `allTrainers.ejs`

Modify `trainerController.js`:

```js
function renderCreateTrainerForm(req, res) {
  res.render("createTrainer");
}
```

export it at the bottom and import it on `trainerRouter.js` to define the route:

```js
// localhost:3000/createTrainer
router.get("/createTrainer", renderCreateTrainerForm);
```

finally, modify the backend `trainerController.js` so that creating a trainer redirects you to that trainer's page:

```js
// res.json({
//     message: "success",
//     payload: newTrainer
// })

res.redirect(`/oneTrainer/${newTrainer.Name}`);
```

4. Connect Trainers to Pokemon (Many-to-many relationship)

**USER STORY**

- A user can go to a `oneMon` Pokemon page and select a trainer to be captured by (dropdown menu of trainers)

**BACKEND**

- add a trainer reference to the pokemon model `pokemonModel.js`
- add a pokemon reference to the trainer model `trainerModel.js`
- make a `pokemonCapturedByTrainer` function on the `pokemonController.js`
- make a route on `pokemonRouter.js`

on `pokemonModel.js`:

```js
const ObjectId = mongoose.Schema.Types.ObjectId

{
    ...schema, // shortened schema code
    TrainerList: [{
        type: ObjectId,
        ref: "trainers"
    }]
}
```

on `trainerModel.js`:

```js
const ObjectId = mongoose.Schema.Types.ObjectId

{
    ...schema, //shortened schema code
    PokemonList: [{
        type: ObjectId,
        ref: "pokemons"
    }]
}
```

add the function to `pokemonController.js`:

```js
async function pokemonCapturedByTrainer(req, res) {
  try {
    // target the pokemon
    let targetPokemon = await Pokemon.findOne({ Name: req.params.name });

    // target the trainer
    let targetTrainer = await Trainer.findOne({ _id: req.body.id });

    // Make sure the Pokemon has a TrainerList
    if (!targetPokemon.TrainerList) {
      targetPokemon.TrainerList = [];
    }

    // Make sure the Trainer has a PokemonList
    if (!targetTrainer.PokemonList) {
      targetTrainer.PokemonList = [];
    }

    // Put the trainer ID on the pokemon's TrainerList
    targetPokemon.TrainerList.addToSet(targetTrainer._id);

    // Save this change
    await targetPokemon.save();

    // put the pokemon ID on the trainer's PokemonList
    targetTrainer.PokemonList.addToSet(targetPokemon._id);

    // save this change
    await targetTrainer.save();

    res.json({
      message: "success",
      payload: {
        targetPokemon,
        targetTrainer,
      },
    });
  } catch (error) {
    let errorObj = {
      message: "pokemon captured by trainer failure",
      payload: error,
    };

    console.log(errorObj);

    res.json(errorObj);
  }
}
```

Make sure to export at the bottom, and import it on `pokemonRouter.js` to define the route:

```js
// localhost:3000/api/pokemon/pokemonCapturedByTrainer/:name
router.put("/pokemonCapturedByTrainer/:name", pokemonCapturedByTrainer);
```

**FRONTEND**

- Modify `viewController.js` > `renderOnePokemonPage()` to render with the full list of all trainers
- on `oneMon.ejs` list the trainers on this page that are already attached
- Modify `oneMon.ejs` to include a new form.
- In this form, have a drop down where the value is the trainer's \_id and the text is the trainer's name (don't include trainers that are already on the list)
- In this form, have a button to submit. It should redirect to this same page
- Modify `pokemonController.js` to handle the redirect
- Modify `viewController.js` > `renderOneTrainer()` to give the trainer the list of pokemon it owns
- Modify `oneTrainer.ejs` to show the PokemonList

on `renderOnePokemonPage()` on the `viewController.js`, this is the modification:

```js
let allTrainers = await Trainer.find({});

res.render("oneMon", { pokemon: result, allTrainers: allTrainers });
```

trainers who own this pokemon on `oneMon.ejs`:

```html
<ul>
  <strong>List of trainers who own a <%=pokemon.Name%>:</strong>

  <% allTrainers.forEach((trainer) => { %> <% if
  (pokemon.TrainerList.includes(trainer._id)) { %>
  <li><%=trainer.Name%></li>
  <% } %> <% }) %>
</ul>
```

here is the form to select a trainer:

```html
<form
  action="/api/pokemon/pokemonCapturedByTrainer/<%=pokemon.Name%>?_method=PUT"
  method="post"
>
  <select name="id">
    <% allTrainers.forEach((trainer) => { %> <%
    if(!pokemon.TrainerList.includes(trainer._id)) { %>
    <option value="<%=trainer._id%>"><%= trainer.Name %></option>
    <% } %> <% }) %>
  </select>

  <input type="submit" value="Catch That Pokemon!" />
</form>
```

handling the redirect on `pokemonController.js` > `renderOnePokemonPage()`:

```js
// res.json({
//     message: "success",
//     payload: {
//         targetPokemon,
//         targetTrainer
//     }
// })

res.redirect(`/oneMon/${targetPokemon.Name}`);
```

modify `viewController.js` > `renderOneTrainer()`:

```js
let allPokemon = await Pokemon.find({});

res.render("oneTrainer", { trainer: result, allPokemon: allPokemon });
```

modify `oneTrainer.ejs` to show the trainer's list of owned pokemon:

```html
<ul>
  <strong>List of Pokemon who <%=trainer.Name%> owns:</strong>

  <% allPokemon.forEach((mon) => { %> <% if
  (trainer.PokemonList.includes(mon._id)) { %>
  <li><%=mon.Name%></li>
  <% } %> <% }) %>
</ul>
```
