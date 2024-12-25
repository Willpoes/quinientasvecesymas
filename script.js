function mostrarPoema(ruta) {
    fetch(ruta)
        .then(response => {
            if (!response.ok) {
                throw new Error("No se pudo cargar el poema.");
            }
            return response.text();
        })
        .then(texto => {
            document.getElementById("contenido-poema").textContent = texto;
            document.getElementById("poema-modal").style.display = "flex";
        })
        .catch(error => {
            console.error(error);
            document.getElementById("contenido-poema").textContent =
                "Hubo un error al cargar el poema.";
        });
}

function cerrarPoema() {
    document.getElementById("poema-modal").style.display = "none";
    document.getElementById("contenido-poema").textContent = "";
}

document.addEventListener("DOMContentLoaded", function () {
    // Cargar los poemas desde el archivo JSON
    fetch("poemas.json")
        .then(response => response.json())
        .then(poemas => {
            const poemaContainer = document.getElementById("poema-container");

            // Crear una tarjeta por cada poema
            poemas.forEach(poema => {
                const poemaCard = document.createElement("div");
                poemaCard.classList.add("poema-card");
                poemaCard.setAttribute("onclick", `mostrarPoema('${poema.archivo}')`);

                poemaCard.innerHTML = `
            <div class="img-container">
              <img src="${poema.imagen}" alt="${poema.nombre}">
            </div>
            <div class="info">
              <p class="numero">${poema.numero}</p>
              <h2 class="nombre">${poema.nombre}</h2>
            </div>
          `;
                // Insertar la tarjeta en el contenedor
                poemaContainer.appendChild(poemaCard);
            });
        })
        .catch(error => console.error("Error cargando los poemas:", error));
});
