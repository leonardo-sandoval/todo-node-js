const express = require('express');

const app = express();
const port = 8080;

const tasks = [
  { id: 1, description: 'Hacer la compra', completed: false },
  { id: 2, description: 'Limpiar la casa', completed: true },
  { id: 3, description: 'Estudiar para el examen', completed: false }
];

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
