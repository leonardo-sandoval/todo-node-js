const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const listViewRouter = require('./list-view-router');
const listEditRouter = require('./list-edit-router');

const tasks = [];

// Middleware para procesar el cuerpo de las solicitudes en formato JSON
app.use(bodyParser.json());

// Pasar la matriz de tareas a los routers
app.use((req, res, next) => {
  req.tasks = tasks;
  next();
});

// Rutas
app.use('/list-view', listViewRouter);
app.use('/list-edit', listEditRouter);

// Ruta de inicio
app.get('/', (req, res) => {
  res.send('¡Bienvenido/a a la lista de tareas!');
});

// Iniciar el servidor
app.listen(8000, () => {
  console.log('Servidor iniciado en el puerto 8000');
});
