const uuid = require('uuid');
const moment = require('moment');
const tasks = [
  {
    id: uuid.v4(),
    title: 'Today',
    description: 'Clean the house',
    status: 'on hold',
    createdAt: moment().format("MMMM Do YYYY, h:mm:ss a"),
    duedate: "03-10-2023",
  },
  {
    id: uuid.v4(),
    title: 'Tomorrow',
    description: 'Eat breakfast',
    status: 'on hold',
    createdAt: moment().format("MMMM Do YYYY, h:mm:ss a"),
    duedate: "03-10-2023",
  },
  {
    id: uuid.v4(),
    title: 'Future',
    description: 'Eat Dinner and sleep',
    status: 'in progress',
    createdAt: moment().format("MMMM Do YYYY, h:mm:ss a"),
    duedate: "03-10-2023",
  },
];

module.exports = tasks;