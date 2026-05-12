const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// ESTA LÍNEA es la que te falta:
app.use(express.static(path.join(__dirname, '../../frontend')));

// Esta es para que al entrar a localhost:3000 te mande el index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/index.html'));
});

app.listen(port, () => {
  
});