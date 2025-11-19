const express = require('express');
const router = express.Router();
const ctrl = require('./controllers/ubicacion.controller');
const cors = require('cors');

router.get('/', ctrl.list);
router.post('/', ctrl.create);

const app = express();
app.use(express.json());
app.use(cors())

app.use('/api/ubicacion', router);


const PORT = process.env.PORT || 300;
app.listen(PORT, async () => {
    console.log(`Servidor corriendo en http:localhost:${PORT}`);
})