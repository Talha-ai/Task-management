const express = require('express');
const tasks = require('../tasks');
const uuid = require('uuid');  //for unique id
const moment = require('moment');  //for curr time
const router = express.Router();

router.get('/', (req, res) => {
  res.render('tasks/task', { tasks: tasks });
});

router.get('/new', (req, res) => {
  res.render('tasks/new');
});

router.get('/:id/details', (req, res) => {
  const taskId = req.params.id;
  const foundTask = tasks.find(task => task.id === taskId);
  res.render('tasks/detail', { foundTask })
})


router.get('/:id/edit', (req, res) => {
  const taskId = req.params.id;
  const foundTask = tasks.find(task => task.id === taskId);
  res.render('tasks/edit', { foundTask })
})


router.post('/', (req, res) => {
  const newTask = {
    id: uuid.v4(),
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    createdAt: moment().format("MMMM Do YYYY, h:mm:ss a"),
    duedate: req.body.duedate
  }

  if (!newTask.description) {
    // res.status(404).json({ msg: 'Please include a description' });
    res.redirect('/tasks/new');
  }

  tasks.push(newTask);
  res.redirect('/tasks');
});





router
  .route('/:id')
  .get((req, res) => {
    const taskId = req.params.id;
    const foundTask = tasks.find(task => task.id === taskId);
    if (!foundTask) {
      return res.status(404).json({ msg: `No task with the id of ${taskId}` });
    }

    res.json(tasks.filter(task => task.id === taskId));
  })
  .patch((req, res) => {
    const taskId = req.params.id;
    const foundTask = tasks.find(task => task.id === taskId);
    if (!foundTask) {
      return res.status(404).json({ msg: `No task with the id of ${taskId}` });
    }

    const newtitle = req.body.title;
    const newDesp = req.body.newDesp;
    const newstatus = req.body.status;
    const newduedate = req.body.duedate;


    if (newtitle !== undefined) {
      foundTask.title = newtitle;
    }
    if (newDesp !== undefined) {
      foundTask.description = newDesp;
    }
    if (newstatus !== undefined) {
      foundTask.status = newstatus;
    }
    if (newduedate !== undefined) {
      foundTask.duedate = newduedate;
    }


    res.redirect('/tasks');
  })
  .delete((req, res) => {
    const taskId = req.params.id;
    const index = tasks.findIndex(task => task.id === taskId);

    if (index === -1) {
      return res.status(404).json({ msg: `No task with the id of ${taskId}` });
    }

    tasks.splice(index, 1); // Remove the task at the specified index
    res.redirect('/tasks');
  })


module.exports = router;




// const found = tasks.some(task => task.id === parseInt(req.params.id));
// if (found) {
//   res.json(tasks.filter(task => task.id === parseInt(req.params.id)));
// }
// else {
//   res.status(404).json({ mssg: `No task with the id of ${req.params.id}` });
// }


// router.get('/:id', (req, res) => {
//   const found = tasks.some(task => task.id === parseInt(req.params.id));
//   if (found) {
//     res.json(tasks.filter(task => task.id === parseInt(req.params.id)));
//   }
//   else {
//     res.status(400).json({ mssg: `No task with the id of ${req.params.id}` });
//   }
// });

// // PUT route
// router.put('/:id', (req, res) => {
//   const taskId = parseInt(req.params.id);
//   const foundTask = tasks.find(task => task.id === taskId);

//   if (!foundTask) {
//     return res.status(404).json({ msg: `No task with the id of ${taskId}` });
//   }

//   const { description, completed } = req.body;

//   if (description !== undefined) {
//     foundTask.description = description;
//   }

//   if (completed !== undefined) {
//     foundTask.completed = completed;
//   }

//   res.json({ msg: "Task Updated", task: foundTask });
// });


// // DELETE route
// router.delete('/:id', (req, res) => {
//   const taskId = parseInt(req.params.id);
//   const index = tasks.findIndex(task => task.id === taskId);

//   if (index === -1) {
//     return res.status(404).json({ msg: `No task with the id of ${taskId}` });
//   }

//   tasks.splice(index, 1); // Remove the task at the specified index
//   res.json({ msg: 'Task deleted', tasks });
// });


//update
// router.put('/:id', (req, res) => {
//   const found = tasks.some(task => task.id === parseInt(req.params.id));
//   if (found) {
//     const updTask = req.body;
//     tasks.forEach(task => {
//       if (task.id === parseInt(req.params.id)) {
//         task.description = updTask.description ? updTask.description : task.description;
//         task.completed = updTask.completed ? updTask.completed : task.completed;

//         res.json({ msg: "Task Updated", task });
//       }
//     });
//   }
//   else {
//     res.status(400).json({ mssg: `No task with the id of ${req.params.id}` });
//   }
// });

//delete

// router.delete('/:id', (req, res) => {
//   const found = tasks.some(task => task.id === parseInt(req.params.id));
//   if (found) {
//     res.json({
//       msg: 'Task deleted',
//       tasks: tasks.filter(task => task.id !== parseInt(req.params.id))
//     });
//   }
//   else {
//     res.status(400).json({ mssg: `No task with the id of ${req.params.id}` });
//   }
// });