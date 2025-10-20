let pokemones = []; // Lista global de todos los Pokémon
let totalPokes = 1025; // Máximo de Pokémon a cargar
let misNumeros = JSON.parse(localStorage.getItem("misNumeros")) || []; // IDs de Pokémon capturados

/**
 * Conexión a la API para obtener la lista de Pokémon por tipo o la lista completa.
 * @param {string} filtrotipo - El tipo de Pokémon a filtrar o "All" para la lista completa.
 * @returns {Promise<Array<Object>>} - Una promesa que resuelve con la lista de Pokémon.
 */
async function conexionLista(filtrotipo) {
  try {
    if (filtrotipo === "All") {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${totalPokes}`);
      if (!res.ok) throw new Error("Fallo al obtener la lista completa.");
      const data = await res.json();
      return data.results;
    } else {
      const res = await fetch(`https://pokeapi.co/api/v2/type/${filtrotipo}`);
      if (!res.ok) throw new Error(`Fallo al obtener el tipo ${filtrotipo}.`);
      const data = await res.json();
      
      // Mapear los resultados para que coincidan con el formato {name, url} de la lista 'All'
      return data.pokemon.map(item => item.pokemon);
    }
  } catch (error) {
    console.error("Error en conexionLista:", error);
    // Retornar un array vacío en caso de error para evitar fallos
    return []; 
  }
}

/**
 * Carga todos los Pokémon al iniciar y llama a Home para renderizar la vista.
 */
async function General() {
  // Asegurarse de que la lista se cargue solo una vez
  if (pokemones.length === 0) {
    pokemones = await conexionLista("All"); 
  }
  // Llama a la vista Home una vez que los datos estén listos
  Home(); 
}

// Iniciar la carga de datos al cargar el script
General();