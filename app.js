//jshint esversion : 6

const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js');

const app = express();

app.set('view engine', 'ejs');

let tasks = [];
let workTasks = [];

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.get("/", function(request, response) {

  let day = date.getDate();

  response.render("list", {
    listTitle: day,
    newTasks: tasks
  });
});

app.get("/work", function(request, response) {
  response.render("list", {
    listTitle : "Work",
    newTasks: workTasks
  });
});

app.post("/", function(request, response) {
  let task = request.body.item;
  if(request.body.list === "Work") {

    workTasks.push(task);
    response.redirect("/work");
  } else {

    tasks.push(task);
    response.redirect("/");
  }
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
