const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 8000;

// Utilizar middleware
app.use(cors());
app.use(bodyParser.json());

// Lista de tareas
let tasks = [];

// Endpoint para crear una nueva tarea
app.post('/tasks', (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: 'Se requiere un título y una descripción' });
  }

  const newTask = {
    id: tasks.length + 1,
    title,
    description,
    completed: false
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Endpoint para actualizar una tarea
app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const { title, description, completed } = req.body;

  const task = tasks.find(task => task.id === taskId);

  if (!task) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  if (title) {
    task.title = title;
  }

  if (description) {
    task.description = description;
  }

  if (completed !== undefined) {
    task.completed = completed;
  }

  res.json(task);
});

// Endpoint para eliminar una tarea
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);

  const index = tasks.findIndex(task => task.id === taskId);

  if (index === -1) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  tasks.splice(index, 1);
  res.sendStatus(204);
});

// Endpoint para obtener todas las tareas
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Endpoint para obtener las tareas completas
app.get('/tasks/completed', (req, res) => {
  const completedTasks = tasks.filter(task => task.completed);
  res.json(completedTasks);
});

// Endpoint para obtener las tareas incompletas
app.get('/tasks/incomplete', (req, res) => {
  const incompleteTasks = tasks.filter(task => !task.completed);
  res.json(incompleteTasks);
});

// Endpoint para obtener una sola tarea
app.get('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);

  const task = tasks.find(task => task.id === taskId);

  if (!task) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  res.json(task);
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor Express escuchando en http://localhost:${port}`);
});
