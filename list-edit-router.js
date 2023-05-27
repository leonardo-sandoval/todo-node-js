const express = require('express');
const router = express.Router();

router.post('/create-task', (req, res) => {
  const description = req.body.description;
  const task = {
    id: req.tasks.length + 1,
    description: description,
    completed: false
  };
  req.tasks.push(task);
  res.json(task);
});

router.delete('/delete-task/:taskId', (req, res) => {
  const taskId = Number(req.params.taskId);
  const index = req.tasks.findIndex(task => task.id === taskId);
  if (index !== -1) {
    const deletedTask = req.tasks.splice(index, 1);
    res.json(deletedTask);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

router.put('/update-task/:taskId', (req, res) => {
  const taskId = Number(req.params.taskId);
  const task = req.tasks.find(task => task.id === taskId);
  if (task) {
    task.completed = true;
    res.json(task);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

module.exports = router;
