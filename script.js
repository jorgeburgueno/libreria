let milibreria = [];

function Libro(titulo, autor, paginas, leido){
    this.titulo = titulo;
    this.autor = autor;
    this.paginas = paginas;
    this.leido = leido;
}
function render(){
    let libreria = document.querySelector(".libreria");
    for (let i = 0; i < milibreria.length; i++) {
        let libro = milibreria[i];
        let libroEl = document.createElement("div");
        libroEl.innerHTML = `<p>${libro.titulo}</p`
        libreria.appendChild(libroEl);
    }
}
function addLibroLibreria (){
    let titulo = document.querySelector(".titulo").value;
    let autor = document.querySelector(".autor").value;
    let paginas = document.querySelector(".paginas").value;
    let leido = document.querySelector(".leido").checked;
    let newLibro = new Libro(titulo, autor, paginas, leido);
    milibreria.push(newLibro);
    render();
}

let btnLibroNuevo = document.querySelector(".nuevo-libro-boton");
btnLibroNuevo.addEventListener("click", function(){   
    let formaLibroNuevo = document.querySelector(".forma-nuevo");
    formaLibroNuevo.style.display = "block";
})

document.querySelector(".forma-nuevo").addEventListener("submit", function(event){
   event.preventDefault();
   addLibroLibreria();

})


