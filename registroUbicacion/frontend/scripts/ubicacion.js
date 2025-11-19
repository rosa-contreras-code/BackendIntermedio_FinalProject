async function loadRegisters() {
  try {
    const res = await fetch(`${API}/ubicacion`);
    const data = await res.json();
    const tbody = document.querySelector("#ubicacionTable tbody");

    tbody.innerHTML = "";

    data.forEach((register) => {
      const tr = `
        <tr>
          <td>${register.latitud}</td>
          <td>${register.longitud}</td>
          <td>${register.fecha.split('T')[0]}</td>
          <td>${register.hora}</td>
        </tr>
      `;
      tbody.insertAdjacentHTML("beforeend", tr);
    });
  } catch (error) {
    console.error("Ocurrió un error al intentar obtener los registros", error);
  }
}

document.getElementById("btnSaveNew").addEventListener("click", async (e) => {
  e.preventDefault();

  obtenerUbicacion();
  const latitud = document.getElementById("latitud").value;
  const longitud = document.getElementById("longitud").value;
  const fecha = document.getElementById("fecha").value;
  const hora = document.getElementById("hora").value;

  if (!latitud || !longitud || !fecha || !hora) {
    document.getElementById("autorError").textContent =
      "Completa todos los campos";
    return;
  }

  try {
      await fetch(`${API}/ubicacion`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ latitud, longitud, fecha, hora }),
      });
      loadRegisters();
  } catch (error) {
    console.error("Ocurrió un error al intentar guardar el registro", error);
    alert("Ocurrió un error al intentar guardar");
  }
});