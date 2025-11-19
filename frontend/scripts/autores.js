async function loadAutores() {
  try {
    const res = await fetch(`${API}/autores`);
    const data = await res.json();
    const tbody = document.querySelector("#autoresTable tbody");

    tbody.innerHTML = "";

    data.forEach((autor) => {
      const tr = `
        <tr>
          <td>${autor.id}</td>
          <td>${autor.nombre}</td>
          <td>${autor.apellidos}</td>
          <td class='text-center'>
            <button class='btn btn-sm btn-warning me-1' onclick= 'editAutor(${autor.id})' data-toogle="tooltip" data-placement="top" title="Editar">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>

            <button class='btn btn-sm btn-danger me-1' onclick= 'deleteAutor(${autor.id})' data-toogle="tooltip" data-placement="top" title="Eliminar">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </td>
        </tr>
      `;
      tbody.insertAdjacentHTML("beforeend", tr);
    });
    //Actualiza la lista de autores en el select list
    fillAutorSelect(data);
  } catch (error) {
    console.error("Ocurrió un error al intentar obtener los autores", error);
  }
}

function openAutorModal(){
  document.getElementById('autorModalTitle').textContent = 'Agregar autor';
  document.getElementById('autorId').value = '';
  document.getElementById('autorNombre').value = '';
  document.getElementById('autorApellidos').value = '';
  document.getElementById('autorError').textContent = '';
}

async function editAutor(id){
  try {
    const res = await fetch(`${API}/autores/${id}`);
    const autor = await res.json();
    document.getElementById('autorModalTitle').textContent = 'Editar autor';
    document.getElementById('autorId').value = autor.id;
    document.getElementById('autorNombre').value = autor.nombre;
    document.getElementById('autorApellidos').value = autor.apellidos;
    document.getElementById('autorError').textContent = '';
    new bootstrap.Modal(document.getElementById('autorModal')).show();
  } catch (error) {
    console.error('Ocurrió un error al consultar el autor:', error);
  }
}

document.getElementById("autorForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = document.getElementById('autorId').value;
  const nombre = document.getElementById('autorNombre').value.trim();
  const apellidos = document.getElementById('autorApellidos').value.trim();

  if (!nombre || !apellidos) {
    document.getElementById('autorError').textContent = 'Completa todos los campos';
    return;
  }

  try {
    if (id) {
      await fetch(`${API}/autores/${id}`, {
        method: "PUT", headers:{"Content-Type" : "application/json"},
        body: JSON.stringify({nombre, apellidos})
      });
    }else{
      await fetch(`${API}/autores`, {
        method: "POST", headers:{"Content-Type" : "application/json"},
        body: JSON.stringify({nombre, apellidos})
      });
    }
    const modal = bootstrap.Modal.getInstance(document.getElementById('autorModal'));
    modal.hide();
    loadAutores();
  } catch (error) {
    console.error("Ocurrió un error al intentar guardar el autor", error)
     alert("Ocurrió un error al intentar guardar");
  }
});

async function deleteAutor(id) {
  if (!confirm("¿Desea eliminar el autor?")) {
    return
  }
  try {
    await fetch(`${API}/autores/${id}`, {
      method: "DELETE"
    });
    loadAutores();
  } catch (error) {
    console.error("Ocurrió un error al intentar eliminar el autor:", error);
    alert("Ocurrió un error al intentar eliminar");
  }
}

function fillAutorSelect(autores){
  const select = document.getElementById("libroAutor");
  select.innerHTML = "<option value = ''>-- Selecciona un autor --</option>";
  autores.forEach(autor => {
    const option = `
      <option value="${autor.id}">${autor.nombre} ${autor.apellidos}</option>
    `;
    select.insertAdjacentHTML("beforeend", option);
  });
}