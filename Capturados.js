// Las variables 'misNumeros', 'pokemones' y 'totalPokes' ahora están en Conexion.js

/**
 * Genera y muestra 4 Pokémon aleatorios, y los añade a la lista de capturados si no están.
 */
function Aleatorios() {
    // Verificar si la lista de Pokémon está cargada
    if (pokemones.length === 0) {
        alert("Los datos de Pokémon aún no están cargados. Inténtalo de nuevo en un momento.");
        return;
    }
    
    if (misNumeros.length >= totalPokes) {
        alert("¡Has capturado a todos los Pokémon!");
        return;
    }
    
    const nuevosDiv = document.getElementById("nuevos");
    nuevosDiv.innerHTML = "";
    
    let pokesAleatoriosHTML = "";
    let nuevosCapturados = [];
    
    for (let i = 0; i < 4; i++) {
        let num;
        let isNew = false;
        
        // Bucle para asegurar que se escoge un Pokémon que NO esté ya capturado
        do {
            num = Math.floor(Math.random() * totalPokes) + 1;
            // Verificar si ya está capturado o en la lista de los 4 nuevos
            if (!misNumeros.includes(num) && !nuevosCapturados.includes(num)) {
                isNew = true;
            }
        } while (!isNew); 

        // Marcar como 'nuevo' para esta tanda
        nuevosCapturados.push(num); 
        
        // El índice del array de pokemones es num - 1
        const nombrePoke = pokemones[num - 1] ? pokemones[num - 1].name : `Pokémon ${num}`;


        pokesAleatoriosHTML += `
            <div class="c-lista-pokemon c-un_aleatorio" onclick="Detalle('${num}')">
                <p>#${num}</p>
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${num}.png" alt="${nombrePoke}" width="60" height="60">
                <p>${nombrePoke}</p>
            </div>`;

        // Añadir al array global de capturados
        misNumeros.push(num);
        
        // Actualizar el div del álbum directamente para el nuevo capturado
        const unpokeDiv = document.getElementById(`c-unpoke-${num}`);
        if (unpokeDiv) {
            unpokeDiv.innerHTML = `
            <div onclick="Detalle('${num}')">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${num}.png" width="auto" height="45" loading="lazy" alt="${num}">
                <p>${num}</p>
            </div>`;
            unpokeDiv.classList.add("c-mios-pokemon");
        }
    }

    // Actualizar localStorage y el HTML de los nuevos
    localStorage.setItem("misNumeros", JSON.stringify(misNumeros));
    nuevosDiv.innerHTML = pokesAleatoriosHTML;
    document.getElementById("contador").textContent = `${misNumeros.length} / ${totalPokes}`;
}

/**
 * Renderiza la vista del álbum de Pokémon capturados.
 */
function Capturados() {
    const root = document.getElementById("root");
    root.innerHTML = ""; 

    // Título/Contador
    let contador = document.createElement("p");
    contador.textContent = `${misNumeros.length} / ${totalPokes}`;
    contador.id = "contador";
    contador.style.textAlign = "center";
    contador.style.fontSize = "1.5rem";
    root.appendChild(contador);
    
    // Botón de Aleatorios
    const boton = document.createElement("button");
    boton.textContent = "4 nuevos";
    boton.classList.add("c-lista"); // Reusa la clase de estilo de botón de lista
    boton.style.display = "block";
    boton.style.margin = "20px auto";
    boton.style.width = "200px";
    boton.addEventListener("click", Aleatorios);
    root.appendChild(boton);

    // Contenedor para los 4 nuevos capturados
    const capturaAleatorea = document.createElement("section");
    capturaAleatorea.classList.add("c-lista");
    capturaAleatorea.id = "nuevos";
    root.appendChild(capturaAleatorea);

    // Álbum de capturados
    const seccionCapturados = document.createElement("section");
    seccionCapturados.classList.add("c-lista", "album-grid");
    
    let misPokesHTML = "";
    for (let i = 1; i <= totalPokes; i++) {
        const id = i;
        if (misNumeros.includes(id)) {
            // Pokémon capturado
            misPokesHTML += `
            <div class="c-unpoke c-mios-pokemon poke-${id}" id="c-unpoke-${id}" onclick="Detalle('${id}')">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png" width="auto" height="45" loading="lazy" alt="${id}">
                <p>${id}</p>
            </div>`;
        } else {
            // Pokémon no capturado (espacio vacío con ID para actualizar)
            misPokesHTML += `
            <div class="c-unpoke" id="c-unpoke-${id}">
                <p>${id}</p>
            </div>`;
        }
    }
    seccionCapturados.innerHTML = misPokesHTML;
    root.appendChild(seccionCapturados);
    
    // Agregar un margen inferior para el menú fijo
    root.style.paddingBottom = "70px";
}