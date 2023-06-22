const express = require('express');
const path = require('path');

const app = express();
const port = 8080;

// Establecer la ruta estática para servir archivos desde la carpeta "public"
app.use(express.static(path.join(__dirname, '..', 'public')));

// Establecer la ruta estática para servir archivos desde la carpeta "assets"
app.use('/assets', express.static(path.join(__dirname, '..', 'assets')));

// Ruta para enviar el archivo "index.html" cuando se solicita "/"
app.get('/', (req, res) => {
  const indexPath = path.join(__dirname, '..', 'public', 'index.html');
  res.sendFile(indexPath);
});

// Ruta para el archivo "script.js"
app.get('/script.js', (req, res) => {
  const scriptPath = path.join(__dirname, '..', 'js', 'script.js');
  res.type('text/javascript');
  res.sendFile(scriptPath);
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor Express escuchando en http://localhost:${port}`);
});
