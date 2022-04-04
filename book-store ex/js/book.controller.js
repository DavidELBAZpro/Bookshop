'use strict'


onInit()

function onInit() {
    renderBooks()
}

function renderBooks() {

    const books = getBooks()
    const elTBody = document.querySelector('.books-table tbody')

    var strHtml = ''
    for(var i = 0; i < books.length; i++) {
        strHtml += '<tr>'
        var book = books[i]
        strHtml += `<td class="name" > ${book.name} </td>`
        strHtml += `<td class="id" > ${book.id} </td>`
        strHtml += `<td> <img onerror="this.src='imgs/default.jpg'"  src="${book.imgUrl}" ></img> </td>`
        strHtml += `<td class="price" > ${book.price}€</td>`
        strHtml += `<td> <button onclick="onReadBook('${book.id}')" class="btn-to-read">Read</td>`
        strHtml += `<td> <button onclick="onUpdateBook('${book.id}')" class="btn-to-update">Update</td>`
        strHtml += `<td> <button onclick="onRemoveBook('${book.id}')" class="btn-to-delete">Delete</td>`


        strHtml += `</tr>`
    }

    
    elTBody.innerHTML = strHtml
}

function onRemoveBook (bookId) {
    deleteBook(bookId)
    renderBooks()
    flashMsg(`Book Deleted`)
    
}

function onAddBook() {
    var name = prompt('Enter a book name :')
    var price = +prompt('Enter a price : ') 
    var imgUrl = prompt('Enter the url image :')
    if (!name || !price) return
    if (!imgUrl) {
        imgUrl = 'imgs/default.jpg'
    }
        const book = addBook(name ,price, imgUrl)
        renderBooks()
        flashMsg(`Book Added (id: ${book.id})`)
    
}


function onUpdateBook(bookId) {
    const book = getBookById(bookId)
    var newPrice = +prompt('Price?', book.price);
    if (newPrice) {
        updateBooks(bookId, newPrice);
        renderBooks()
        flashMsg(`Price updated to: ${book.price}`)
    }
}

function onReadBook(bookId) {
    var book = getBookById(bookId)
    var elModal = document.querySelector('.modal')
    elModal.querySelector('h3').innerText = book.name
    elModal.querySelector('h4 span').innerText = book.price + '€'
    elModal.querySelector('img').src = book.imgUrl
    elModal.querySelector('p').innerText = book.desc
    elModal.classList.add('open')
}

function onCloseModal() {
    document.querySelector('.modal').classList.remove('open')
}


function flashMsg(msg) {
    const el = document.querySelector('.user-msg')
    el.innerText = msg
    el.classList.add('open')
    setTimeout(() => {
        el.classList.remove('open')
    }, 3000)
}