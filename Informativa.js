function Informativa() {
  const root = document.getElementById("root");
  root.innerHTML = `
    <section class="informativa">
      <h1>ℹ️ Información del Proyecto</h1>
      
      <h2>¿Qué es este sitio?</h2>
      <p>Este sitio web utiliza la <strong><a href="https://pokeapi.co/" target="_blank">PokeAPI</a></strong> para mostrar información de Pokémon como sus estadísticas, tipos, evoluciones y más.</p>

      <h2>¿Qué es la PokeAPI?</h2>
      <p>La PokeAPI es una API gratuita y pública que permite acceder a datos detallados del universo Pokémon, como especies, habilidades, movimientos, tipos, evoluciones y mucho más.</p>

      <h2>¿Qué puedes hacer aquí?</h2>
      <ul>
        <li>Buscar y ver Pokémon con sus estadísticas.</li>
        <li>Agregar Pokémon a tus favoritos o marcarlos como capturados.</li>
        <li>Comparar dos Pokémon lado a lado.</li>
      </ul>

      <h2>¿Cómo se construyó?</h2>
      <p>Este proyecto fue desarrollado con HTML, CSS y JavaScript puro, utilizando módulos separados para organizar las vistas y la lógica del sitio.</p>

      <h2>Créditos</h2>
      <ul>
        <li>API: <a href="https://pokeapi.co/" target="_blank">PokeAPI</a></li>
        <li>Sprites de Pokémon proporcionados por la API oficial.</li>
        <li>Diseño personalizado por el autor del proyecto.</li>
      </ul>

      <p style="margin-top: 20px;">¡Gracias por visitar este proyecto! ✨</p>
    </section>
  `;
}

