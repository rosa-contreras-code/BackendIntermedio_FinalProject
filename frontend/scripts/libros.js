async function loadLibros() {
  try {
    const res = await fetch(`${API}/libros`);
    const data = await res.json();
    const tbody = document.querySelector("#librosTable tbody");

    tbody.innerHTML = "";

    data.forEach((libro) => {
      const tr = `
        <tr>
          <td>${libro.id}</td>
          <td>${libro.titulo}</td>
          <td>${libro.paginas}</td>
          <td>${libro.fechaPublicacion ? libro.fechaPublicacion.split('T')[0] : ''}</td>
          <td>${libro.autor}</td>
          <td class='text-center'>
            <button class='btn btn-sm btn-warning me-1' onclick= 'editLibro(${libro.id})' data-toogle="tooltip" data-placement="top" title="Editar">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>

            <button class='btn btn-sm btn-danger me-1' onclick= 'deleteLibro(${libro.id})' data-toogle="tooltip" data-placement="top" title="Eliminar">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </td>
        </tr>
      `;
      tbody.insertAdjacentHTML("beforeend", tr);
    });
  } catch (error) {
    console.error("Error al intentar obtener los libros", error);
  }
}


function openLibroModal(){
  document.getElementById('libroModalTitle').textContent = 'Agregar libro';
  document.getElementById('libroId').value = '';
  document.getElementById('libroTitulo').value = '';
  document.getElementById('libroPaginas').value = 0;
  document.getElementById('libroFecha').value = '';
  document.getElementById('libroAutor').value = '';
  document.getElementById('libroError').textContent = '';
}

async function editLibro(id){
  try {
    const res = await fetch(`${API}/libros/${id}`);
    const libro = await res.json();
    document.getElementById('libroModalTitle').textContent = 'Editar libro';
    document.getElementById('libroId').value = libro.id;
    document.getElementById('libroTitulo').value = libro.titulo;
    document.getElementById('libroPaginas').value = libro.paginas;
    document.getElementById('libroFecha').value = libro.fechaPublicacion.split('T')[0];
    document.getElementById('libroAutor').value = libro.autorId;
    document.getElementById('libroError').textContent = '';
    new bootstrap.Modal(document.getElementById('libroModal')).show();
  } catch (error) {
    console.error('Ocurrió un error al consultar el libro:', error);
  }
}

document.getElementById("libroForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = document.getElementById('libroId').value;
  const titulo = document.getElementById('libroTitulo').value.trim();
  const paginas = Number(document.getElementById('libroPaginas').value);
  const fechaPublicacion = document.getElementById('libroFecha').value;
  const autorId = document.getElementById('libroAutor').value;

  if (!titulo || !paginas || !paginas > 0 || !fechaPublicacion || !autorId) {
    document.getElementById('libroError').textContent = 'Completa todos los campos';
    return;
  }

  try {
    data = {titulo, paginas, fechaPublicacion, autorId};
    if (id) {
      await fetch(`${API}/libros/${id}`, {
        method: "PUT", headers:{"Content-Type" : "application/json"},
        body: JSON.stringify(data)
      });
    }else{
      await fetch(`${API}/libros`, {
        method: "POST", headers:{"Content-Type" : "application/json"},
        body: JSON.stringify(data)
      });
    }
    const modal = bootstrap.Modal.getInstance(document.getElementById('libroModal'));
    modal.hide();
    loadLibros();
  } catch (error) {
    console.error("Ocuarrió un error al intentar guardar el libro", error)
     alert("Ocurrió un error al intentar guardar");
  }
});

async function deleteLibro(id) {
  if (!confirm("¿Desea eliminar el libro?")) {
    return
  }
  try {
    await fetch(`${API}/libros/${id}`, {
      method: "DELETE"
    });
    loadLibros();
  } catch (error) {
    console.error("Ocurrió un error al intentar eliminar el libro:", error);
    alert("Ocurrió un error al intentar eliminar");
  }
}
