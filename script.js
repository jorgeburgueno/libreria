let milibreria = [];

function Libro(titulo, autor, paginas, leido){
    this.titulo = titulo;
    this.autor = autor;
    this.paginas = paginas;
    this.leido = leido;
}

Libro.prototype.toggleRead = function() {
    this.leido = !this.read;
}

function toggleRead(index) {
    milibreria[index].toggleRead();
    render()    
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

function render(){
    let libreria = document.querySelector(".libreria");
    libreria.innerHTML = "";
    for (let i = 0; i < milibreria.length; i++) {
        let libro = milibreria[i];
        let libroEl = document.createElement("div");
        libroEl.setAttribute("class", "librero")
        libroEl.innerHTML = `
        <div class= "card-header">
         <h3 class= "titulo">${libro.titulo}</h3>
         <h5 class= "autor">de ${libro.autor}</h5>
         </div>
         <div class="card-body">
          <p>${libro.paginas} paginas</p>
          <p class = "read-status">${libro.leido ? "Leido" : "No leido"}</p>
          <button class="borrar-btn" onclick="borrarLibro(${i})">Borrar</button>
          <button class="toggle-read-btn" onclick="toggleRead(${i})">Leido</button>
          </div>
          `;
        libreria.appendChild(libroEl);
    }
}
function borrarLibro(index) {    
    milibreria.splice(index, 1);
    render()
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
