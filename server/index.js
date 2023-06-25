const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const cors = require('cors'); // Agregado el módulo 'cors'
require('dotenv').config();

const app = express();
const port = 8000;
const secret = process.env.JWT_SECRET;

const users = [
  { username: 'user1', password: 'password1' }
];

// Middleware para verificar el token JWT
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token inválido' });
    }

    req.user = decoded;
    next();
  });
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Agregar el middleware 'cors'
app.use(cors());

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

// Ruta de autenticación para generar un token JWT
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }

  const token = jwt.sign({ username: user.username }, secret);
  res.json({ token });
});

// Ruta protegida que requiere un token JWT válido
app.get('/protected', verifyToken, (req, res) => {
  res.json({ message: 'Acceso permitido' });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor Express escuchando en http://localhost:${port}`);
});
