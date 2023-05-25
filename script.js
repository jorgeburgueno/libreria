// Book Class: Representa Libro
class Book {
  constructor(titulo, autor, paginas) {
    this.titulo = titulo;
    this.autor = autor;
    this.paginas = paginas;
  }
}

// interface
class UI {
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector('#book-list');

    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${book.titulo}</td>
      <td>${book.autor}</td>
      <td>${book.paginas}</td>
      <td><a href="#" class="btn btn-sm delete">X</a></td>
    `;

    list.appendChild(row);
  }

  static deleteBook(el) {
    if(el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);

    // Para que la advertencia solo dure 3 segundos
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }

  static clearFields() {
    document.querySelector('#titulo').value = '';
    document.querySelector('#autor').value = '';
    document.querySelector('#paginas').value = '';
  }
}

// Store Class
class Store {
  static getBooks() {
    let books;
    if(localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(paginas) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if(book.paginas === paginas) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
  
  e.preventDefault();

  
  const titulo = document.querySelector('#titulo').value;
  const autor = document.querySelector('#autor').value;
  const paginas = document.querySelector('#paginas').value;

  // Validate
  if(titulo === '' || autor === '' || paginas === '') {
    UI.showAlert('Porfavor llenar todos los campos');
  } else {
    // Instatiate book
    const book = new Book(titulo, autor, paginas);

    // Add Book to UI
    UI.addBookToList(book);

    // Add book to store
    Store.addBook(book);

    // Show success message
    UI.showAlert('Libro añadido');

    // Clear fields
    UI.clearFields();
  }
});

// Borrar libro
document.querySelector('#book-list').addEventListener('click', (e) => {
  // borrar de UI
  UI.deleteBook(e.target);

  // borrar de store
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // mensaje
  UI.showAlert('Libro borrado');
});