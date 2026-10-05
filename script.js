'use strict'
// SET HEIGHT OF BOOK COVER
function setHeight() {
    const description = document.querySelector('.description');
    const bookCover = document.querySelectorAll('.book-cover');

    const style = getComputedStyle(description);
    bookCover.forEach((item) => {item.style.height = style.height});
}
setHeight();

// OPEN FORM
const dialogOpener = document.querySelector('.add');
dialogOpener.addEventListener('click', () => {
    const dialog = document.querySelector('dialog');
    dialog.showModal();
});

// BOOK CONSTRUCTOR
function Book(title, author, numberOfPages, numberOfVolumes, status, rating) {
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.numberOfVolumes = numberOfVolumes;
    this.status = status;
    this.rating = rating;
}

function checkAccurately(element) {
    if (element === undefined || element === null || element === '') {
        const error = document.querySelector('.error');
        error.textContent = 'Fill the form accurately';
        return true;
    }  else {
        return false;
    }
}
function checkError(string) {
    if (typeof string !== 'string') {
        console.log('ERROR');
        return false;
    } else {
        return true;
    }
}
function createElement(element) {
    if (checkError(element)) {
        return document.createElement(element);
    } 
}
function addTextContent(element, textContent) {
    if (checkError(textContent)) {
        element.textContent = textContent;
    } 
}
function append(parent, child) {
    parent.appendChild(child);
}
function addClassName(element, className) {
    if (checkError(className)) {
        element.classList.add(className);
    } 
}

let newBook;
const save = document.querySelector('.save');
save.addEventListener('click', (event) => {
    event.preventDefault();
    const title = document.querySelector('.title');
    const author = document.querySelector('.author');
    const pages = document.querySelector('.number-of-pages');
    const volumes = document.querySelector('.number-of-volumes');
    const bookStatus = document.querySelector('.status');
    const rating = document.querySelector('.rating');

    newBook = new Book(title.value.trim(), author.value.trim(), pages.value.trim(), volumes.value, bookStatus.value, rating.value);

    for (const property of Object.values(newBook)) {
        if (checkAccurately(property)) {
            return;
        }
    }
    // CAPITALISE FIRST LETTER OF TITLE
    newBook.title = newBook.title.slice(0, 1).toUpperCase() + newBook.title.slice(1);

    // THE CONTAINER
    const container = createElement('div');
    addClassName(container, 'flex-child');
    const flexContainer = document.querySelector('.flex-container');
    append(flexContainer, container);

    // THE BOOK COVER
    const bookCover = createElement('div');
    addClassName(bookCover, 'book-cover');
    append(container, bookCover);
    bookCover.style.backgroundImage = `url('./IMG_1656.JPG')`;
    
    // THE DESCRIPTION
    const description = createElement('div');
    addClassName(description, 'description');
    append(container, description); 
    
    // TITLE
    const titleContent = createElement('p');
    addClassName(titleContent, 'book-title')
    append(description, titleContent); 
    addTextContent(titleContent, newBook.title);
    
    // AUTHOR
    const authorContent = createElement('p');
    append(description, authorContent); 
    addTextContent(authorContent, `Author: ${newBook.author}`);

    // NUMBER OF PAGES
    const pageContent = createElement('p');
    append(description, pageContent); 
    addTextContent(pageContent, `Number of pages: ${newBook.numberOfPages}`);

    // NUMBER OF VOLUME
    const volumeContent = createElement('p');
    append(description, volumeContent); 
    addTextContent(volumeContent, `Number of volumes: ${newBook.numberOfVolumes}`);

    // STATUS
    const statusContent = createElement('p');
    append(description, statusContent); 
    addTextContent(statusContent, `${newBook.status}`);

    // RATING
    const ratingContent = createElement('p');
    append(description, ratingContent); 
    addTextContent(ratingContent, `Rating: ${newBook.rating}`);

    // CLOSE MODAL
    const dialog = document.querySelector('dialog');
    dialog.close();
    
    setHeight();

    // RESET FORM
    const form = document.querySelector('form');
    form.reset();
    const error = document.querySelector('.error');
    error.textContent = '';
});

function exitForm(event) {
    event.preventDefault();
    const dialog = document.querySelector('dialog');
    dialog.close();

    // RESET FORM
    const form = document.querySelector('form');
    form.reset();
    const error = document.querySelector('.error');
    error.textContent = '';
} 
const exit = document.querySelector('.close');
exit.addEventListener('click', exitForm);