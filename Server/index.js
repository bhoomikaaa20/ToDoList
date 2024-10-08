const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const todomodel = require("./Models/todo");
const dotenv = require("dotenv");

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then((res) => console.log("Connected to db"))
  .catch((err) => console.log("Error"));

app.post("/add", (req, res) => {
  const task = req.body.task;

  todomodel
    .create({
      task: task,
    })
    .then((result) => {
      res.json(result); // Send the result as JSON response
    })
    .catch((error) => {
      res.json(error); // Send the error as JSON response
    });
});

app.get("/get", (req, res) => {
  todomodel
    .find()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  todomodel
    .findByIdAndUpdate({ _id: id }, { done: true })
    .then((result) => res.json(result))
    .catch((error) => res.json(error));
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  todomodel
    .findByIdAndDelete({ _id: id })
    .then((result) => res.json(result))
    .catch((error) => res.json(error));
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
