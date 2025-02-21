const express = require("express");
const routerAPI = require('./routes/index.js');
const cors = require('cors');

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Middleware para habilitar CORS
app.use(cors());

// Configurar las rutas
routerAPI(app);

// Iniciar el servidor en el puerto 80
app.listen(80, () => {
  console.log("Servidor iniciado en el puerto 80");
});










