# 3D. MongoDB-fullstack-review

Steps:

1. Structure - create the following files/folders:

- index.js
- .env
- controllers/
- database/
- models/
- public/
- routes/
- views/

2. Initiate node project

- Open terminal
- navigate to the root folder (the ls command should show the structure)
- use command `npm init -y`

3. Test that the server can run

- In terminal, use command `npm install express`
- Write on `index.js`:
- - Import Express
- - Create the `app` variable
- - Declare a port, and do `app.listen(PORT)`
- In terminal, use command `node index.js`

4. Create views for client to see, using EJS

- In terminal, use command `npm install ejs`
- Create file `./views/index.ejs`
- Start with a boiler plate, and add a heading in the body to be seen
- Create folder `./routes/client/` and file `./routes/client/viewRouter.js`

- Write on `viewRouter.js`:
- - Import Express
- - Create `router` variable
- - Write a `router.get("/")` to respond with the ejs file
- - `module.exports = router`

- Create folder `./controllers/client` and file `.controllers/client/viewController.js`
- - Create a function called `getIndexPage` and migrate the function from `viewRouter.js` as this one
- - Export the function at the bottom
- - Import the function on `viewRouter.js` and use the function in the `router.get("/")`

- Write on `index.js`:
- - Import path
- - Write Middleware for:
- - - Setting the view engine to EJS
- - - Set the views to look at the `./views/`
- - - Use the `./public` folder for static files (CSS)

- - Import the router file
- - Use the base URL when using `viewRouter.js`

- Run the server and TEST IT

5. Test basic connection to database

- Write on `.env` file, define MONGODB_URI with your database connection string
- - Open up Compass
- - connect to your cluster
- - Copy connection string from the `...` in the top left
- - Change the extension at the end to rename your database (`...mongodb.net/fullStack`)

- In terminal, `npm install mongoose dotenv`
- Create `./database/mongodb.js`:
- - Import mongoose
- - `require("dotenv").config()`
- - `mongoose.set('strictQuery', false);`
- - Create a connection function
- - Export the connection function

- On `index.js`:
- - Import `./database/mongodb.js`
- - Run the function in the callback of `app.listen()`

- Run the server and TEST IT

6. Set up a model, controller, and routes for a single collection

- Move the allPokemon.json file into the `models` folder

- Create file `./models/pokemonModel.js`:
- - Import mongoose
- - Define a schema
- - Model the schema
- - Export the model

- Create folder `./controllers/api`
- Create file `./controllers/api/pokemonController.js`:
- - Import the Model
- - Write a function that returns the entire `pokemon` collection
- - Export the controller functions

- Create folder `./routes/api/`
- Create file `./routes/api/pokemonRouter.js`:
- - Import Express & create `router` variable
- - Import the appropriate controller
- - Write a GET method to extension `/allPokemon`
- - Export the router

- On `index.js`:
- - Import the `pokemonRouter.js`
- - Use URL extension `/api/pokemon` for this router

- In MongoDB Compass, create a database called `fullstack` with a collection called `pokemons` (yes, it is spelled like that)
- Use `./models/allPokemon.json` to insert the data via Compass

- Run the server, and TEST THE GET METHOD VIA POSTMAN

7. Create an EJS view for ALL pokemon

- Create file `./views/allMons.ejs`:
- - Start with a boiler plate
- - Use EJS `forEach()` to loop over data and generate elements for each property in the `pokemons` collection:
- - - PokedexNo - h2
- - - Name - h3

- On `./controllers/view/viewController.js`:
- - Import the pokemonModel
- - Define the async function `renderAllPokemon`
- - Export the function

- On `./routes/viewRouters/viewRouter.js`:
- - Import the function from the viewController
- - Write a GET method for URL extension `/allMons`, use the `renderAllPokemon` as the callback

- Run server and TEST IT

8. Create a back-end route for ONE pokemon using dynamic parameters

- On `./controllers/api/pokemonController.js`:
- - Define function `getOnePokemon`
- - Export `getOnePokemon`

- On `./routes/api/pokemonRouter.js`:
- - Import `getOnePokemon`
- - Write a GET method for URL extension `/onePokemon/:name`, use the `getOnePokemon` as the callback

- Run server and TEST IT

9. Create a front-end view for ONE pokemon using dynamic parameters

- Create `./views/oneMon.ejs`:
- - PokedexNo - h2
- - Name - h2
- - Type - h3
- - Moves - ul > forEach(li)

- On `./controllers/view/viewController.js`:
- - Define function `renderOnePokemonPage`
- - Export `renderOnePokemonPage`

- On `./routes/viewRouters/viewRouter.js`:
- - Import `renderOnePokemonPage`
- - Write a GET method for URL extension `/oneMon/:name`, use the `renderOnePokemonPage` as the callback

- On `./views/allMons.ejs`:
- - Wrap the names in an `<a>` tag, using `/oneMon/<%=mon.Name%>` as the href

10. Create a back-end route for CREATE one pokemon

- On `./controllers/api/pokemonController.js`:
- - Define function `createOnePokemon`
- - Export `createOnePokemon`

- On `./routes/api/pokemonRouter.js`:
- - Import `createOnePokemon`
- - Write a POST method for URL extension `/createOnePokemon`

- Remember to use the proper middleware on index.js:

```js
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
```

- TEST THIS MUCH USING POSTMAN

11. Create a front-end view for CREATE one pokemon

- Create file `./views/createMon.ejs`
- - Uses a form to collect what would normally be the `req.body`
- - Set up the form to make a POST request to URL `localhost:3000/api/createOnePokemon`

- On `./routes/viewRouters/viewRouter.js`:
- - Write a GET method for URL extension `/createOneMon` to render the view

- On `./controllers/view/viewController.js`:
- - Define function `renderCreatePokemonForm` to render the view only
- - Export `renderCreatePokemonForm`

- On `./views/allMons.ejs`:
- - Add a link that goes to `/createOneMon`

- TEST IT, MAKE SURE THE VIEW SHOWS

12. Connect back-end to receive front-end form data to CREATE one pokemon

- On `./controllers/api/pokemonController.js`:
- - Edit function `createOnePokemon` to accept form data
- - Parse the Moves list to be an array instead of a string
- - Redirect to `localhost:3000/oneMon/:name`

13. Create a back-end route to DELETE one pokemon

- On `./controllers/api/pokemonController.js`:
- - Define function `deleteOnePokemon`
- - Export `deleteOnePokemon`

- On `./routes/api/pokemonRouter.js`:
- - Import `deleteOnePokemon`
- - Write DELETE method for URL extension `/deleteOnePokemon/:name`

- TEST IT SO FAR

14. Create a front-end button to DELETE one pokemon from the database

- In Terminal:
- - Use command `npm install method-override` (blame EJS)

- On `index.js`:
- - Import Method Override at the top `const methodOverride = require('method-override');`
- - Use the middleware as such: `app.use(methodOverride('_method'));`

- On `./views/oneMon.ejs`:
- - Make a Delete button on the bottom of the page. It should send to the backend delete method via the form's action
- - Use `?_method=DELETE` at the end of the form's action attribute
- - Use `name="_method"` inside the delete button

15. Connect the back-end to respond to front-end DELETE request appropriately

- On `./controllers/api/pokemonController.js`:
- - Redirect client to the `/allMons` URL extension

16. Create a back-end route to UPDATE one pokemon

- On `./controllers/api/pokemonController.js`:
- - Define `updateOnePokemon`
- - Export `updateOnePokemon`

- On `./routes/api/pokemonRouter.js`:
- - Import `updateOnePokemon`
- - Write PUT method for URL extension `/api/updateOnePokemon/:name`

- TEST IT IN POSTMAN

17. Create a front-end view to UPDATE one pokemon

- Create `./views/updateMon.ejs`:
- - Will contain form similar to `./views/createMon.ejs` but the placeholder will be the original document's properties
- - There will be an "Update Pokemon" button that sends this document to the back-end
- - Use the method override to override the "post" method

- On `./views/oneMon.ejs`:
- - Place a link to update THIS document (`/updateMon/<%=pokemon.Name%>`)

- On `./controllers/view/viewController.js`:
- - Define `renderUpdatePokemonForm`, render `updateMon.ejs` WITH the pokemon data
- - Export `renderUpdatePokemonForm`

- On `./routes/viewRouters/viewRouter.js`:
- - Import `renderUpdatePokemonForm`
- - Write a GET method for URL extension `/updateMon/:name`

18. Connect the back-end to respond to front-end PUT request appropriately

- On `./controllers/api/pokemonController.js`:
- - Redefine the `updatedMon` variable to capture front-end form data
- - Redirect the clients back to the `oneMon.ejs` of the updated pokemon

## CLIENT FUNCTIONALITY

The client can currently do the following on this application:

- `C`reate a Pokemon
- `R`ead all Pokemon, or just one
- `U`pdate one Pokemon
- `D`elete one Pokemon
