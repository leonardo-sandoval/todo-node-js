const express = require('express');
const app = express();
const port = 8080;

const tasks = [
  { id: 1, description: 'Hacer la compra', completed: false },
  { id: 2, description: 'Limpiar la casa', completed: true },
  { id: 3, description: 'Estudiar para el examen', completed: false }
];

// Middleware para validar métodos HTTP válidos
const validateMethod = (req, res, next) => {
  if (req.method !== 'GET' && req.method !== 'POST' && req.method !== 'PUT') {
    res.status(400).send('Invalid request method');
  } else {
    next();
  }
};

// Middleware para validar los parámetros en el router list-view-router
const validateParams = (req, res, next) => {
  const taskId = req.params.id;
  if (!taskId || isNaN(taskId)) {
    res.status(400).send('Invalid task ID');
  } else {
    next();
  }
};

// Middleware para manejar errores en las solicitudes POST y PUT en el router list-edit-router
const validateRequestData = (req, res, next) => {
  if (req.method === 'POST') {
    if (Object.keys(req.body).length === 0) {
      res.status(400).send('Empty request body');
    } else if (!req.body.description || typeof req.body.description !== 'string' || typeof req.body.completed !== 'boolean') {
      res.status(400).send('Invalid or missing task data');
    } else {
      next();
    }
  } else if (req.method === 'PUT') {
    if (Object.keys(req.body).length === 0) {
      res.status(400).send('Empty request body');
    } else if (!req.body.id || isNaN(req.body.id) || !req.body.description || typeof req.body.description !== 'string' || typeof req.body.completed !== 'boolean') {
      res.status(400).send('Invalid or missing task data');
    } else {
      next();
    }
  } else {
    next();
  }
};

app.use(express.json());
app.use(validateMethod);

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', validateRequestData, (req, res) => {
  const { description, completed } = req.body;
  const newTask = {
    id: tasks.length + 1,
    description,
    completed
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.put('/tasks/:id', validateParams, validateRequestData, (req, res) => {
  const taskId = parseInt(req.params.id);
  const { description, completed } = req.body;
  const taskIndex = tasks.findIndex(task => task.id === taskId);

  if (taskIndex === -1) {
    res.status(404).send('Task not found');
  } else {
    tasks[taskIndex] = {
      ...tasks[taskIndex],
      description,
      completed
    };
    res.json(tasks[taskIndex]);
  }
});

app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
