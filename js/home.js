const contenedorCards = document.querySelector("#content-cards");

const noticias = JSON.parse(localStorage.getItem("noticias")) || [];

const cargarNoticias = () => {
  noticias.forEach((noticia) => {
    const columna = document.createElement("div");
    columna.classList = "col";

    const tarjeta = `
    <div class="card h-100">
        <img class="card-img" src=${noticia.urlToImage} class="card-img-top" alt=${noticia.title} />
        <div class="card-body">
            <h5 class="card-title">${noticia.title}</h5>
            <p class="card-text">
                ${noticia.description}
            </p>
        </div>
        <div class="card-footer">
            <div class="d-grid">
            <a class="btn btn-primary" href=${noticia.url} target="_blank">Ver más...</a>
            </div>
        </div>
     </div>`;
    columna.innerHTML = tarjeta;

    contenedorCards.appendChild(columna);
  });
};

cargarNoticias();
