// Declare booksCollection as an empty array
let books = [];

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
  // Function to save the books collection to localStorage
  static saveBooksToStorage() {
    localStorage.setItem('books', JSON.stringify(books));
  }

  // Function to add a new book to the collection
  addBook() {
    books.push(this);
    Book.saveBooksToStorage();
  }

  // Function to remove a book from the collection
  static removeBook(title) {
    books = books.filter((book) => book.title !== title);
    Book.saveBooksToStorage();
  }
}

// Function to retrieve the books collection from localStorage
const retrieveBooksFromStorage = () => {
  const storedBooks = localStorage.getItem('books');
  books = storedBooks ? JSON.parse(storedBooks) : [];
};

// Function to display all books in the collection
const displayBooks = () => {
  const booksContainer = document.querySelector('.books-collection');
  booksContainer.innerHTML = '';

  books.forEach((book) => {
    const bookCard = document.createElement('div');
    const titleElement = document.createElement('p');
    titleElement.textContent = `"${book.title}" by`;
    bookCard.appendChild(titleElement);

    const authorElement = document.createElement('span');
    authorElement.textContent = ` ${book.author}`; // Notice the space before ${book.author}
    titleElement.appendChild(authorElement);

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => {
      Book.removeBook(book.title);
      bookCard.remove();
    });
    bookCard.appendChild(removeButton);

    booksContainer.appendChild(bookCard);
  });
};

// Form submit event handler
const form = document.querySelector('.form');
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const titleInput = document.querySelector('.title-tag');
  const authorInput = document.querySelector('.author-tag');

  const title = titleInput.value;
  const author = authorInput.value;

  const book = new Book(title, author);
  book.addBook();

  displayBooks();

  titleInput.value = '';
  authorInput.value = '';
});

// Retrieve books collection from localStorage on page load
retrieveBooksFromStorage();

// Initial display of books
displayBooks();
