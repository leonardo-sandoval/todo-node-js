const express = require('express');
const router = express.Router();

router.get('/completed-tasks', (req, res) => {
  const completedTasks = req.tasks.filter(task => task.completed);
  res.json(completedTasks);
});

router.get('/incomplete-tasks', (req, res) => {
  const incompleteTasks = req.tasks.filter(task => !task.completed);
  res.json(incompleteTasks);
});

module.exports = router;
