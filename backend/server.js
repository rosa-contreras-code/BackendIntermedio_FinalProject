const express = require('express');
const cors = require('cors');

const autoresRoutes = require('./routes/autores.routes');
const librosRoutes = require('./routes/libros.routes');

const app = express();
app.use(express.json());
app.use(cors())

//Rutas
app.use('/api/autores', autoresRoutes);
app.use('/api/libros', librosRoutes);


const PORT = process.env.PORT || 300;
app.listen(PORT, async () => {
    console.log(`Servidor corriendo en http:localhost:${PORT}`);
})