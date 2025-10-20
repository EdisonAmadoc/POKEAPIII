function Original() {
  const root = document.getElementById("root");
  root.innerHTML = `
    <h1>⚔️ Comparador de Pokémon</h1>
    <div class="selectors">
      <input type="text" id="pokemon1" placeholder="Nombre del Pokémon 1" />
      <input type="text" id="pokemon2" placeholder="Nombre del Pokémon 2" />
      <button onclick="compararPokemon()">Comparar</button>
    </div>
    <div id="resultado" class="comparador"></div>
  `;
}

// API base de PokeAPI
const apiUrl = "https://pokeapi.co/api/v2/pokemon/";

// Obtener datos de un Pokémon
async function getPokemonData(nombre) {
  try {
    const response = await fetch(apiUrl + nombre.toLowerCase());
    if (!response.ok) throw new Error("Pokémon no encontrado");
    return await response.json();
  } catch (error) {
    alert(`Error al buscar "${nombre}": ${error.message}`);
    return null;
  }
}

// Crear tarjeta visual
function crearTarjeta(pokemon) {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <h2>${pokemon.name.toUpperCase()}</h2>
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
    <div class="stats">
      ${pokemon.stats.map(stat => `
        <p><strong>${stat.stat.name}:</strong> ${stat.base_stat}</p>
      `).join("")}
    </div>
  `;
  return card;
}

// Comparar dos Pokémon y mostrarlos
async function compararPokemon() {
  const nombre1 = document.getElementById("pokemon1").value.trim();
  const nombre2 = document.getElementById("pokemon2").value.trim();

  if (!nombre1 || !nombre2) {
    alert("Por favor, escribe dos nombres de Pokémon.");
    return;
  }

  const resultadoDiv = document.getElementById("resultado");
  resultadoDiv.innerHTML = "Cargando...";

  const [poke1, poke2] = await Promise.all([
    getPokemonData(nombre1),
    getPokemonData(nombre2)
  ]);

  if (poke1 && poke2) {
    resultadoDiv.innerHTML = "";
    resultadoDiv.appendChild(crearTarjeta(poke1));
    resultadoDiv.appendChild(crearTarjeta(poke2));
  } else {
    resultadoDiv.innerHTML = "";
  }
}
