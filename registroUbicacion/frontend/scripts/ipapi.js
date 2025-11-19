async function obtenerUbicacion() {
  const API_UBICACION = `https://api.ipapi.com/api/201.144.19.34?access_key=1bb642d3128f2283dc6be8f2c6f3d8cc
&format=1`;
  await fetch(API_UBICACION)
    .then((response) => response.json())
    .then((datosUbicacion) => {
      const latitud = datosUbicacion.latitude;
      const longitud = datosUbicacion.longitude;
      document.getElementById("latitud").value = latitud;
      document.getElementById("longitud").value = longitud;
      obtenerHora(latitud, longitud);
    });
}

function obtenerHora(lat, lon) {
  const API_HORA = `https://www.timeapi.io/api/Time/current/coordinate?latitude=${lat}&longitude=${lon}`;
  fetch(API_HORA, { method: "GET" })
    .then((response) => response.json())
    .then((data) => {
      console.log("Hora exacta:", data);
      document.getElementById("fechaHora").value = data.date + " " +data.time;
      document.getElementById("fecha").value =`${data.year}-${data.month}-${data.day}`;
      document.getElementById("hora").value =data.time;
    })
    .catch((err) => console.error("Error con la API hora:", err));
}
