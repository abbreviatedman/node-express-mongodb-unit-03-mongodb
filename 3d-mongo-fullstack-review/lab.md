# LAB - Fullstack With Mongo, Express, Ejs, Node

---

## REQUIREMENTS - CLIENT FUNCTIONALITY

The client should be able to do the following on this application:

- `C`reate a Document
- `R`ead all Documents, or just one
- `U`pdate one Document
- `D`elete one Document

## BONUS

Create a second collection that is related to the first

- On a page showing information about one document on Collection 1, set up a link to one document on Collection 2
- On a page showing information about one document on Collection 2, set up a link to one document on Collection 1

---

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

3. Install bare minimum modules

- In terminal, use command `npm install express morgan mongoose dotenv ejs method-override`

## Procedures

- Test that the server can run before creating ANY functionality
- Create a homepage view and TEST THAT IT CAN BE SEEN FROM THE BROWSER
- Test a connection to your database

- Set up a Model, Controller, and Route for a single collection
- - Test that it can be seen on the back-end via Postman

- Set up views to see your collection
- - 1 page to `R`ead the ENTIRE collection
- - 1 page to `R`ead 1 document within the collection

- Set up for the client to `C`reate a document
- - Back-end functionality, tested via Postman
- - 1 page for the client to input data via a form
- - Plug the back-end to receive the action from the front-end

- Set up for the client to `U`pdate a document
- - Back-end functionality, tested via Postman
- - 1 page for the client to input data via a form
- - Plug the back-end to receive the action from the front-end

- Set up for the client to `D`elete a document
- - Back-end functionality, tested via Postman
- - 1 page for the client to delete it via a button
- - Plug the back-end to receive the action from the front-end
