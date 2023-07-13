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

// Function to display the books list section
const displayBooksList = () => {
  const booksContainer = document.querySelector('.book-list');
  booksContainer.innerHTML = '';

  books.forEach((book) => {
    const bookCard = document.createElement('div');
    const titleElement = document.createElement('p');
    titleElement.textContent = `"${book.title}" by`;
    bookCard.appendChild(titleElement);

    const authorElement = document.createElement('span');
    authorElement.textContent = ` ${book.author}`;
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

// Function to handle menu button clicks
const handleMenuButtonClick = (sectionToDisplay) => {
  const booksListSection = document.querySelector('.books-collection-container');
  const addBookFormSection = document.querySelector('.new-book-form');
  const contactInfoSection = document.querySelector('.contact-information');

  if (sectionToDisplay === 'booksList') {
    // Display the books list section and hide the others
    booksListSection.style.display = 'block';
    addBookFormSection.style.display = 'none';
    contactInfoSection.style.display = 'none';
  } else if (sectionToDisplay === 'addBookForm') {
    // Display the add book form section and hide the others
    booksListSection.style.display = 'none';
    addBookFormSection.style.display = 'block';
    contactInfoSection.style.display = 'none';
  } else if (sectionToDisplay === 'contactInfo') {
    // Display the contact info section and hide the others
    booksListSection.style.display = 'none';
    addBookFormSection.style.display = 'none';
    contactInfoSection.style.display = 'block';
  }
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

  titleInput.value = '';
  authorInput.value = '';

  // Reset the display of all sections except the "List" section
  const booksListSection = document.querySelector('.books-collection-container');
  const addBookFormSection = document.querySelector('.new-book-form');
  const contactInfoSection = document.querySelector('.contact-information');

  booksListSection.style.display = 'block';
  addBookFormSection.style.display = 'none';
  contactInfoSection.style.display = 'none';

  displayBooksList();
});

// Retrieve books collection from localStorage on page load
retrieveBooksFromStorage();

// Initial display of books list section
displayBooksList();

// Navigation menu buttons event listeners
const listButton = document.querySelector('.list');
const newBookButton = document.querySelector('.new-book');
const contactButton = document.querySelector('.contact');

listButton.addEventListener('click', () => {
  handleMenuButtonClick('booksList');
});

newBookButton.addEventListener('click', () => {
  handleMenuButtonClick('addBookForm');
});

contactButton.addEventListener('click', () => {
  handleMenuButtonClick('contactInfo');
});

// Default display on page load
document.addEventListener('DOMContentLoaded', () => {
  handleMenuButtonClick('booksList');
});
