const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const tasks = require('./tasks');
const app = express();

app.use('/css', express.static("css"));
app.use(methodOverride('_method'));
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, '/views'));

app.get("/", (req, res) => {
  res.render('index', { tasks: tasks });
})

//body parser middleware
app.use(express.json()); //allows json request, fetch from client, allows to parse json inf from body
app.use(express.urlencoded({ extended: false })); //allows us to access inf coming from forms

//tasks api router
const taskRouter = require('./routes/task');
app.use('/tasks', taskRouter);  // /tasks: mounted on



//Static server
app.use(express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));