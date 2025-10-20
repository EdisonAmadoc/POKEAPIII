function Favoritos(){
    const root = document.getElementById("root");
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    
    root.innerHTML = ""; // Limpiar vista

    // Agregar un margen inferior para el menú fijo
    root.style.paddingBottom = "70px";

    if(favoritos.length == 0){
        root.innerHTML = "<h2 style='text-align: center; margin: 40px;'>No hay favoritos. ¡Añade algunos!</h2>";
    }else{
        const listaContenedor = document.createElement("div");
        listaContenedor.classList.add("c-contenedor-lista"); 
        listaContenedor.innerHTML = generarLista(favoritos);
        root.appendChild(listaContenedor);
    }
}