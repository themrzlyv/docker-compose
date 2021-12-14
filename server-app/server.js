const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const Mongoose = require('mongoose');
const { TodoModel } = require("./TodoModel");

const PORT = process.env.PORT || 3050;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  TodoModel.find({})
    .then((todoList) => res.status(200).json(todoList))
    .catch((e) => res.status(500).json(e));
});

app.post("/todo", (req, res) => {
  const todo = new TodoModel({
    ...req.body,
    completed: false,
    created_at: new Date(),
  });

  todo
    .save()
    .then((savedTodo) => res.status(200).json(savedTodo))
    .catch((e) => res.status(400).json(e));
});

app.listen(PORT, async () => {
  console.log(`Server is running on ${PORT}`);
  await Mongoose.connect("mongodb://custom-mongo-server:27017/testdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.warn("Mongo is connected!");
});