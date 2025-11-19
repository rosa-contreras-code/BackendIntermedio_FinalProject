const service = require('../services/ubicacion.service');

async function list(req, res) {
    try {
        const registers = await service.getAllRegisters();
        res.json(registers);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Error interno'});
    }   
}

async function create(req, res) {
    try {
        console.log("req.body:", req.body);
        const {latitud, longitud, fecha, hora} =  req.body;
        if (!latitud || !longitud || !fecha || !hora) {
            return res.status(400).json({message: "Complete todos los campos por favor"});
        }
        const nuevo = await service.createRegister({latitud, longitud, fecha, hora});
        res.status(201).json(nuevo);
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: "Error interno"})
    }
}

module.exports = { list, create };