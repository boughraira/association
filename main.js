// Book Class: Represents a Book
class Book {
  constructor(title, author,isbn,lettre) {
    this.title = title;
    this.author = author;
     this.isbn=isbn;
     this.lettre=lettre;
  }
}

// UI Class: Handle UI Tasks
class UI {
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector('#book-list');

    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
       <td>${book.isbn}</td>
       <td>${book.lettre}</td>
      <td><a class="btn btn-danger delete">Supprimer</a></td>
      
    `;

    list.appendChild(row);
  }
  

  static deleteBook(el) {
    if(el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  

  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
    document.querySelector('#lettre').value = '';
  }
}

// Store Class: Handles Storage
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

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if(book.lettre === isbn) {
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
  // Prevent actual submit
  e.preventDefault();

  // Get form values
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const isbn = document.querySelector('#isbn').value;
const lettre = document.querySelector('#lettre').value;
 
  
 
  
    const book = new Book(title, author ,isbn,lettre);

    // Add Book to UI
    UI.addBookToList(book);

    // Add book to store
    Store.addBook(book);

    UI.clearFields();
  
});

// Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
  // Remove book from UI
  UI.deleteBook(e.target);

  // Remove book from store
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

 
  
});

  
    function sumTransaction()
{
   
    var td = document.querySelectorAll('#myTable > tbody > tr > td:first-child + td');
    var total=0;
    

    for (var i = 0; i < td.length; i++)
    {
        
        total += parseInt(td[i].innerText);
        
    }
    localStorage.setItem('sum', JSON.stringify(total));
     
   readValue();

}
function readValue() {
  var x = localStorage.getItem("sum");
  document.getElementById("area_total").innerHTML = x;
}