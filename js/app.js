// Declare booksCollection as an empty array
let books = [];

// Function to save the books collection to localStorage
const saveBooksToStorage = () => {
  localStorage.setItem('books', JSON.stringify(books));
};

// Function to retrieve the books collection from localStorage
const retrieveBooksFromStorage = () => {
  const storedBooks = localStorage.getItem('books');
  books = storedBooks ? JSON.parse(storedBooks) : [];
};

// Function to add a new book to the collection
const addBook = (title, author) => {
  const book = {
    title,
    author,
  };
  books.push(book);
  saveBooksToStorage();
};

// Function to remove a book from the collection
const removeBook = (title) => {
  books = books.filter((book) => book.title !== title);
  saveBooksToStorage();
};

// Function to display all books in the collection
const displayBooks = () => {
  const booksContainer = document.querySelector('.books-collection');
  booksContainer.innerHTML = '';

  books.forEach((book) => {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    bookCard.innerHTML = `
      <div>${book.title}</div>
      <div>Author: ${book.author}</div>
      <button class="remove-btn">Remove</button>
      <hr>
    `;

    const removeButton = bookCard.querySelector('.remove-btn');
    removeButton.addEventListener('click', () => {
      removeBook(book.title);
      bookCard.remove();
    });

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

  addBook(title, author);
  displayBooks();

  titleInput.value = '';
  authorInput.value = '';
});

// Retrieve books collection from localStorage on page load
retrieveBooksFromStorage();

// Initial display of books
displayBooks();
