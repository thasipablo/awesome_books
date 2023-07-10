let books = [];

const formTag = document.querySelector('.form');
const titleInput = document.querySelector('.title-tag');
const authorTag = document.querySelector('.author-tag');
const booksCollectionTag = document.querySelector('.books-collection');

const refreshBookCollection = () => {
  booksCollectionTag.innerHTML = '';
  books.forEach(book => {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book');
    bookCard.innerHTML = `
      <div class="title">${book.title}</div>
      <div class="author">${book.author}</div>
      <button class="remove-btn">Remove</button>
      <hr>
    `;
    booksCollectionTag.appendChild(bookCard);
    const removeBtn = bookCard.querySelector('.remove-btn');
    removeBtn.addEventListener('click', removeBook);
  })
}

refreshBookCollection();

// Method to add book to the collection
const addBook = (event) => {
  event.preventDefault();
  const book = {
    title: titleInput.value,
    author: authorTag.value
  }
  books.push(book);
  refreshBookCollection();
}

// Method to remove the book from the collection
const removeBook = (event) => {
  const bookTitle = event.target.closest('.book').querySelector('.title').innerText;
  books = books.filter(book => book.title !== bookTitle);
  refreshBookCollection();
}


// Handle the submit event
formTag.addEventListener('submit', addBook);
