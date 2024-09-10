# Assignment 3B. Meal Planner

---

## Goals

- Create an API that is connected to a database on Mongo DB
- Allow users to `C`reate, `R`ead, `U`pdate, and `D`elete data that exists on the server

---

![Meal Planner](https://i.imgur.com/3ru0Ld1.jpg)

You are tasked with creating a Meal Planner API! The purpose is to plan your meals for a certain day ahead of time, and maybe add/edit/delete meals based on how the day actually went.

Your database only needs one collection, to store the plan for a day. When it comes to the schema, these are the most important things to track:

- Date
- Breakfast Meal
- Lunch Meal
- Dinner Meal

Things such as Snacks or Dessert are optional.

Your API should be able to perform the following actions:

- `C`reate a plan for a new date
- `R`ead the meal plans for every date
- `U`pdate meals after eating them (select the documents by date)
- `D`elete a plan, if the user decided not to follow it that day, or if editing a plan would take longer than deleting and creating a new one

You do **not** need to have any EJS or an interface of any kind. This is _just_ an API.

Stretch goals:

- `R`ead all meals of a certain type. For example, only reading `Breakfast` meals. (Hint: https://mongoosejs.com/docs/api/query.html#Query.prototype.select() )
