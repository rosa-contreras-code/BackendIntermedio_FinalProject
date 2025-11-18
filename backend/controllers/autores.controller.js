const service = require('../services/autores.service');

async function list(req, res) {
    try {
        const autores = await service.getAllAutores();
        res.json(autores);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Error interno'});
    }   
}

async function getById(req, res) {
    try {
        const autor = await service.getAutorById(req.params.id);
        if (!autor) {
            return res.status(404).json({message: "Autor no encontrado"});
        }
        res.json(autor);
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: "Error interno"});
    }
}

async function create(req, res) {
    try {
        console.log("req.body:", req.body);
        const {nombre, apellidos} =  req.body;
        if (!nombre || !apellidos) {
            return res.status(400).json({message: "Complete todos los campos por favor"});
        }
        const nuevo = await service.createAutor({nombre, apellidos});
        res.status(201).json(nuevo);
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: "Error interno"})
    }
}

async function update(req, res) {
    try {
        const {nombre, apellidos} = req.body;
        if (!nombre || !apellidos) {
            return res.status(400).json({message: "Complete todos los datos por favor"});
        }
        const updated = await service.updateAutor(req.params.id,req.body);
        res.json(updated);
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: "Error interno"})
    }
}

async function remove(req, res) {
    try {
        await service.deleteAutor(req.params.id);
        res.json({message: "Autor eliminado"})
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: "Error interno"});
    }
}

module.exports = { list, getById, create, update, remove };