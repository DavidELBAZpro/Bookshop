'use strict'
const STORAGE_KEY = 'bookDB';
const PAGE_SIZE = 3;
const gNames = ['Le Petit Prince', 'Stay Close', 'The Lion King', 'Ulysse']

var gBooks = []

_createBooks(gNames)


function getBooks() {
    return gBooks
}

function deleteBook(bookId) {
    const bookIdx = gBooks.findIndex(book => bookId === book.id)
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage();
}

function addBook(name, price ,imgUrl) {
    const book = _createBook(name, price, imgUrl)

    gBooks.unshift(book)
    _saveBooksToStorage()
    return book;
}


function getBookById(bookId) {
    const book = gBooks.find(book => bookId === book.id)
    return book
}


function updateBooks(bookId, bookPrice) {
    const book = gBooks.find(book => book.id === bookId)
    book.price = bookPrice.toFixed(2);
    _saveBooksToStorage();
    return book;
}

function _createBooks(names) {
    var books = loadFromStorage(STORAGE_KEY)
    if (!books || !books.length) {
        books = []
        for (let i = 0; i < gNames.length; i++) {
            var name = names[getRandomIntInclusive(0, names.length - 1)]
            books.push(_createBook(name))
        }
    }
    gBooks = books;
    _saveBooksToStorage();
}


function _createBook(name, price = getRandomIntInclusive(10, 30).toFixed(2), imgUrl = `imgs/${name}.jpg`) {
    return {
        id: makeId(),
        name,
        price,
        imgUrl,
        desc : makeLorem()
    }
}




function nextPage() {
    gPageIdx++
    if (gPageIdx * PAGE_SIZE >= gBooks.length) {
        gPageIdx = 0;
    }
}


function _saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks)
}
