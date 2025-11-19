const pool = require("../config/db");

async function getAllRegisters() {
  const [rows] = await pool.query("SELECT * FROM horas"); 
  return rows;
}

async function createRegister(register) {
  const [result] = await pool.query(
    "INSERT INTO horas (latitud, longitud, fecha, hora) VALUES (?,?,?,?)",
    [register.latitud, register.longitud, register.fecha, register.hora]
  );
  return { latitud: register.latitud, longitud: register.longitud, fecha: register.fecha, hora: register.hora};
}


module.exports = {
  getAllRegisters,
  createRegister,
};