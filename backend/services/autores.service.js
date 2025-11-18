const pool = require("../config/db");

async function getAllAutores() {
  const [rows] = await pool.query("SELECT * FROM autores ORDER BY id  ASC"); //Usamos ? y array de parámetros: esto crea prepared statements y evita SQL injection.
  return rows;
}

async function getAutorById(id) {
  const [rows] = await pool.query("SELECT * FROM autores WHERE id = ?", [id]);
  return rows[0];
}

async function createAutor(autor) {
  const [result] = await pool.query(
    "INSERT INTO autores (nombre, apellidos) VALUES (?,?)",
    [autor.nombre, autor.apellidos]
  );
  return { id: result.insertId, nombre: autor.nombre, apellidos: autor.apellidos };
}

async function updateAutor(id, autor) {
  await pool.query(
    "UPDATE autores SET nombre = ?, apellidos = ? WHERE id = ?",
    [autor.nombre, autor.apellidos, id]
  );
  return getAutorById(id);
}

async function deleteAutor(id) {
  await pool.query("DELETE FROM autores WHERE id = ?", [id]);
  return;
}

module.exports = {
  getAllAutores,
  getAutorById,
  createAutor,
  updateAutor,
  deleteAutor,
};
