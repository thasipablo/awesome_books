const books = [
  {
    title: 'The world erth catalog',
    author: 'Stewart Brand'
  }
]

const booksCollectionTag = document.querySelector('.books-collection');
const bookCard = document.createElement('div');
bookCard.classList.add('book');

books.forEach(book => {
  bookCard.innerHTML = `
    <div class="title">${book.title}</div>
    <div class="author">${book.author}</div>
    <button>Remove</button>
    <hr>
  `;
  booksCollectionTag.appendChild(bookCard);
})
