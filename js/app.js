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
      <button>Remove</button>
      <hr>
    `;
    booksCollectionTag.appendChild(bookCard);
    console.log(bookCard);
  })
}

// Method to collect the book data from the form
const collectBook = () => {
}

// Method to add book to the collection
const addBook = () => {
  console.log(titleInput, authorTag);
  const book = {
    title: titleInput.value,
    author: authorTag.value
  }
  console.log(book);
  books.push(book);
}

formTag.addEventListener('submit', (e)=>{
  e.preventDefault();
  addBook();
  refreshBookCollection();
})