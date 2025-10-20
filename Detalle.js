/**
 * Alterna el estado de favorito de un Pokémon en localStorage.
 * @param {string} id - El ID del Pokémon.
 * @param {string} name - El nombre del Pokémon.
 */
function toggleFavorito(id, name) {
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${id}/`;
    const pokemonData = { name, url: pokemonUrl };
    const index = favoritos.findIndex(p => p.url === pokemonUrl);

    if (index === -1) {
        // Añadir a favoritos
        favoritos.push(pokemonData);
        alert(`${name} añadido a favoritos!`);
    } else {
        // Quitar de favoritos
        favoritos.splice(index, 1);
        alert(`${name} eliminado de favoritos!`);
    }

    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    // Recargar la vista de detalle para actualizar el botón de favorito
    Detalle(id); 
}

/**
 * Muestra la vista de detalle de un Pokémon.
 * @param {string} id - El ID del Pokémon.
 */
async function Detalle(id) {
    const root = document.getElementById("root");
    root.innerHTML = "Cargando detalle...";

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok) throw new Error("Detalle de Pokémon no encontrado.");
        const pokemon = await response.json();
        
        let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
        const isFavorite = favoritos.some(p => p.url === `https://pokeapi.co/api/v2/pokemon/${id}/`);
        const favoriteText = isFavorite ? "❤️ Quitar de Favoritos" : "⭐ Añadir a Favoritos";
        const favoriteClass = isFavorite ? "c-lista button-fav-active" : "c-lista";

        root.innerHTML = `
            <div class="card detalle-card" style="margin-bottom: 70px;">
                <h1>#${pokemon.id} - ${pokemon.name.toUpperCase()}</h1>
                <img src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${pokemon.name}" style="width: 150px;"/>
                
                <div class="${favoriteClass}" style="margin-bottom: 20px;">
                    <button onclick="toggleFavorito('${pokemon.id}', '${pokemon.name}')">${favoriteText}</button>
                </div>
                
                <div class="stats">
                    <h2>Tipos</h2>
                    <p>
                        ${pokemon.types.map(type => `<strong style="text-transform: uppercase;">${type.type.name}</strong>`).join(" / ")}
                    </p>
                    
                    <h2>Estadísticas Base</h2>
                    ${pokemon.stats.map(stat => `
                        <p><strong>${stat.stat.name.toUpperCase()}:</strong> ${stat.base_stat}</p>
                    `).join("")}
                </div>
            </div>
            <button onclick="Home()" class="c-lista" style="width: 150px; margin: 0 auto 20px auto; display: block;">Volver a la lista</button>
        `;
    } catch (error) {
        root.innerHTML = `<h2>Error: ${error.message}</h2><p>No se pudo cargar el detalle del Pokémon #${id}.</p>`;
    }
}