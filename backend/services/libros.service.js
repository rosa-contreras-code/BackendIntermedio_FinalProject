const pool = require("../config/db");

async function getAllLibros() {
  const [rows] = await pool.query(
    `SELECT l.id, l.titulo, l.paginas, l.fechaPublicacion, CONCAT(a.nombre, a.apellidos) AS autor
     FROM libros AS l 
     LEFT JOIN autores AS a ON l.autorId = a.id 
     ORDER BY l.id ASC`);
  return rows;
}

async function getLibroById(id) {
  const [rows] = await pool.query(
    `SELECT l.*, CONCAT(a.nombre," ",a.apellidos) AS autor
     FROM libros AS l 
     LEFT JOIN autores AS a ON l.autorId = a.id 
     WHERE l.id = ?`, [id]);
  return rows[0];
}

async function createLibro(libro) {
  const [result] = await pool.query(
    "INSERT INTO libros (titulo, paginas, fechaPublicacion, autorId) VALUES (?,?,?,?)",
    [libro.titulo, libro.paginas, libro.fechaPublicacion, libro.autorId]
  );
  return { id: result.insertId, titulo, paginas, fechaPublicacion, autorId};
}

async function updateLibro(id, libro) {
  await pool.query(
    "UPDATE libros SET titulo = ?, paginas = ?, fechaPublicacion = ?, autorId = ? WHERE id = ?",
    [libro.titulo, libro.paginas, libro.fechaPublicacion, libro.autorId, id]
  );
  return getLibroById(libro.id);
}

async function deleteLibro(id) {
  await pool.query("DELETE FROM libros WHERE id = ?", [id]);
  return;
}

module.exports = {
  getAllLibros,
  getLibroById,
  createLibro,
  updateLibro,
  deleteLibro,
};
