const bodyTable = document.querySelector("#cuerpo-tabla");

const noticias = JSON.parse(localStorage.getItem("noticias")) || [];
const myModal = new bootstrap.Modal(document.getElementById("modal"), {
  keyboard: false,
  backdrop: "static",
});

let actualizar = {
  state: false,
  id: null,
};

const cargarTabla = () => {
  bodyTable.innerHTML = "";
  noticias.forEach((noticia) => {
    const fila = document.createElement("tr");

    const celdas = `<th scope="row">${noticia.author}</th>
                        <td>${noticia.title}</td>
                        <td>${noticia.publishedAt}</td>
                        <td>${noticia.description}</td>
                        <td >
                        <div class="d-flex gap-2 ">
                        <button class="btn btn-danger btn-sm" onclick="eliminarNoticia(${noticia.id})">
                          <i class="fa fa-trash-o" aria-hidden="true"></i>
                        </button>
                        <button class="btn btn-warning btn-sm" onclick="actualizarNoticia(${noticia.id})" >
                          <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                        </button>
                        
                        </div> 
                        </td>`;

    fila.innerHTML = celdas;
    bodyTable.appendChild(fila);
  });
};

//Borrar Noticia
function eliminarNoticia(id) {
  const index = noticias.findIndex((item) => {
    return item.id === id;
  });

  let validar = confirm(
    `Esta seguro que quiere eliminar la noticia ${noticias[index].title}?`
  );
  if (validar) {
    noticias.splice(index, 1);
    localStorage.setItem("noticias", JSON.stringify(noticias));
    cargarTabla();
  }
}

//Abrir modal
function abrirModal() {
  if (!actualizar.state) {
    document.querySelector("#formularioModal").reset();
    document.querySelector("#btn-submit").classList = "btn btn-primary";
    document.querySelector("#btn-submit").innerText = "Guardar";
  } else {
    document.querySelector("#btn-submit").classList = "btn btn-warning";
    document.querySelector("#btn-submit").innerText = "Actualizar";
  }
  myModal.show();
}

//Crear noticia
function guardarNoticia(e) {
  e.preventDefault();
  let author = document.querySelector("#autorText").value;
  let title = document.querySelector("#tituloText").value;
  let description = document.querySelector("#descripcionText").value;
  let url = document.querySelector("#urlText").value;
  let urlToImage = document.querySelector("#imagenUrl").value;
  let publishedAt = new Date();

  if (actualizar.state) {
    noticias[actualizar.id].author = author;
    noticias[actualizar.id].title = title;
    noticias[actualizar.id].description = description;
    noticias[actualizar.id].url = url;
    noticias[actualizar.id].urlToImage = urlToImage;
    noticias[actualizar.id].publishedAt = publishedAt;
  } else {
    let datos = {
      author,
      title,
      description,
      url,
      urlToImage,
      publishedAt,
    };

    noticias.push(datos);
  }

  localStorage.setItem("noticias", JSON.stringify(noticias));
  document.querySelector("#formularioModal").reset();
  cargarTabla();
  actualizar = {
    state: false,
    id: null,
  };
  myModal.hide();
}

//mostrar noticia para actualizar
function actualizarNoticia(id) {
  const index = noticias.findIndex((item) => {
    return item.id === id;
  });
  actualizar = {
    state: true,
    id: index,
  };

  document.querySelector("#autorText").value = noticias[index].author;
  document.querySelector("#tituloText").value = noticias[index].title;
  document.querySelector("#descripcionText").value =
    noticias[index].description;
  document.querySelector("#urlText").value = noticias[index].url;
  document.querySelector("#imagenUrl").value = noticias[index].urlToImage;

  abrirModal();
}

document
  .querySelector("#formularioModal")
  .addEventListener("submit", guardarNoticia);

document.querySelector("#cerrarModal").addEventListener("click", function () {
  document.querySelector("#formularioModal").reset();
  actualizar = {
    state: false,
    id: null,
  };
});

cargarTabla();
