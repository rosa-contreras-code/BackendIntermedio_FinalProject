const service = require('../services/libros.service');

async function list(req, res) {
    try {
        const libros = await service.getAllLibros();
        res.json(libros);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Error interno'});
    }   
}

async function getById(req, res) {
    try {
        const libro = await service.getLibroById(req.params.id);
        if (!libro) {
            return res.status(404).json({message: "Libro no encontrado"});
        }
        res.json(libro);
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: "Error interno:"});
    }
}

async function create(req, res) {
    try {
        console.log("req:", req);
        console.log("req.body:", req.body);
        const {titulo, paginas, fechaPublicacion, autorId} =  req.body;
        if (!titulo || !paginas || !fechaPublicacion || !autorId) {
            return res.status(400).json({message: "Complete todos los campos por favor"});
        }
        const nuevo = await service.createLibro(req.body);
        res.status(201).json(nuevo);
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: "Error interno"})
    }
}

async function update(req, res) {
    try {
        const {titulo, paginas, fechaPublicacion, autorId} =  req.body;
        if (!titulo || !paginas || !fechaPublicacion || !autorId) {
            return res.status(400).json({message: "Complete todos los datos por favor"});
        }
        const updated = await service.updateLibro(req.params.id, req.body);
        res.json(updated);
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: "Error interno"})
    }
}

async function remove(req, res) {
    try {
        await service.deleteLibro(req.params.id);
        res.json({message: "Libro eliminado"})
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: "Error interno"});
    }
}

module.exports = { list, getById, create, update, remove };