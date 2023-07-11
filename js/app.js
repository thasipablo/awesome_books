const formTag = document.querySelector('.form');
const titleInput = document.querySelector('.title-tag');
const authorTag = document.querySelector('.author-tag');
const booksCollectionTag = document.querySelector('.books-collection');

// Retrieve books from local storage or initialize an empty array
let books = JSON.parse(localStorage.getItem('books')) || [];

// Method to create a book card
const createBookCard = (book) => {
  const bookCard = document.createElement('div');
  bookCard.classList.add('book');
  bookCard.innerHTML = `
    <div class="title">${book.title}</div>
    <div class="author">${book.author}</div>
    <button class="remove-btn">Remove</button>
    <hr>
  `;
  const removeBtn = bookCard.querySelector('.remove-btn');
  removeBtn.addEventListener('click', () => removeBook(book));
  return bookCard;
};

// Method to refresh the book collection
const refreshBookCollection = () => {
  booksCollectionTag.innerHTML = '';
  books.forEach((book) => {
    const bookCard = createBookCard(book);
    booksCollectionTag.appendChild(bookCard);
  });
};

// Method to remove the book from the collection
const removeBook = (book) => {
  books = books.filter((b) => b !== book);
  updateLocalStorage();
  refreshBookCollection();
};

// Method to update local storage with the current book collection
const updateLocalStorage = () => {
  localStorage.setItem('books', JSON.stringify(books));
};

// Method to clear form inputs after adding a book
const clearFormInputs = () => {
  titleInput.value = '';
  authorTag.value = '';
};

// Method to add book to the collection
const addBook = (event) => {
  event.preventDefault();
  const book = {
    title: titleInput.value,
    author: authorTag.value,
  };
  books.push(book);
  updateLocalStorage();
  refreshBookCollection();
  clearFormInputs();
};

// Populate the book collection when the page is loaded
document.addEventListener('DOMContentLoaded', () => {
  refreshBookCollection();
});

// Handle the submit event
formTag.addEventListener('submit', addBook);
