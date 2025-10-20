/**
 * Realiza la búsqueda de Pokémon en la lista global 'pokemones'.
 * @param {string} sza - La cadena de búsqueda.
 */
function buscadorfuncion(sza) {
    const listaDiv = document.getElementById("la-lista");
    
    if (sza.length >= 3) {
        const filtrados = pokemones.filter(pokemon => 
            pokemon.name.toLowerCase().includes(sza.toLowerCase())
        );
        listaDiv.innerHTML = generarLista(filtrados);
    } else {
        // Muestra la lista completa cuando el buscador está vacío
        listaDiv.innerHTML = generarLista(pokemones);
    }
}

/**
 * Genera el HTML para la lista de Pokémon.
 * @param {Array<Object>} arraypokemones - Lista de objetos Pokémon ({name, url}).
 * @returns {string} - El HTML de la lista.
 */
function generarLista(arraypokemones) {
    let listaHTML = "";
    if (arraypokemones.length === 0) {
        return "<p style='text-align: center; width: 100%; margin: 20px;'>No se encontraron Pokémon con este criterio.</p>";
    }
    
    for (let i = 0; i < arraypokemones.length; i++) {
        // Extraer el ID de forma segura desde la URL
        let urlParts = arraypokemones[i].url ? arraypokemones[i].url.split("/") : [];
        let id = urlParts.length > 2 ? urlParts[urlParts.length - 2] : null; 

        if (id) {
            listaHTML += `
            <div class="c-lista-pokemon poke-${id}" onclick="Detalle('${id}')">
                <p>#${id}</p>
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png" width="auto" height="60" loading="lazy" alt="${arraypokemones[i].name}">
                <p>${arraypokemones[i].name}</p>
            </div>`;
        }
    }

    return listaHTML;
}

/**
 * Realiza el filtrado por tipo usando la API y actualiza la lista.
 * @param {string} Elfiltro - El tipo de Pokémon ("All" o un nombre de tipo).
 */
async function FiltroLocal(Elfiltro) {
    const listaDiv = document.getElementById("la-lista");
    listaDiv.innerHTML = "Cargando filtro...";
    
    if (Elfiltro === "All") {
        // Si el filtro es "All", usa la lista completa ya cargada
        listaDiv.innerHTML = generarLista(pokemones);
    } else {
        // Si es un tipo, usa la función de conexión para obtener la lista filtrada
        const resultadosFiltro = await conexionLista(Elfiltro);
        listaDiv.innerHTML = generarLista(resultadosFiltro);
    }
}


/**
 * Renderiza la vista principal de la aplicación (Home).
 */
function Home() {
    var root = document.getElementById("root");
    root.innerHTML = ""; // Limpiar vista

    // Contenedor principal para evitar que el contenido se esconda bajo el nav
    const mainContainer = document.createElement("div");
    mainContainer.style.paddingBottom = "70px"; 
    
    // Buscador
    const buscador = document.createElement("input");
    buscador.classList.add("selectors"); 
    buscador.type = "text";
    buscador.placeholder = "Buscar Pokémon...";
    buscador.addEventListener("input", () => {
        buscadorfuncion(buscador.value);
    });

    // Contenedor de filtros de tipo
    const tipos = [
        "All", "normal", "fighting", "flying", "poison", "ground", "rock", "bug",
        "ghost", "steel", "fire", "water", "grass", "electric", "psychic", "ice",
        "dragon", "dark", "fairy", "stellar", "unknown"
    ];

    const contenedorFiltro = document.createElement("div");
    contenedorFiltro.classList.add("selectors"); 
    
    for (let i = 0; i < tipos.length; i++) {
        const btn = document.createElement("button");
        const tipoNombre = tipos[i].charAt(0).toUpperCase() + tipos[i].slice(1);
        btn.textContent = tipoNombre;
        
        btn.addEventListener("click", () => {
            FiltroLocal(tipos[i]); 
        });

        contenedorFiltro.appendChild(btn);
    }

    // Contenedor de la lista de Pokémon
    const listaHTML = generarLista(pokemones); 
    var contenedorLista = document.createElement("div");
    contenedorLista.classList.add("c-contenedor-lista"); 
    contenedorLista.id = "la-lista"; 
    contenedorLista.innerHTML = listaHTML;

    // Agregar elementos al DOM
    root.appendChild(buscador);
    root.appendChild(contenedorFiltro);
    root.appendChild(contenedorLista);
}