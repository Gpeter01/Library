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
    const titleInput = document.querySelector('.title');
    dialog.showModal();
    titleInput.focus();
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
function negateWord(status) {
    if (status === 'Read') {
        return 'Unread'
    } else {
        return 'Read';
    }
}
let newBook;
const storedBook = ['harry-potter', 'erased'];

const save = document.querySelector('.save');
save.addEventListener('click', (event) => {
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
    // IT'S CLASSNAME
    const className = newBook.title.toLowerCase().split('').filter(element => element !== ' ').join('');

    // CAPITALISE FIRST LETTER OF TITLE
    newBook.title = newBook.title.slice(0, 1).toUpperCase() + newBook.title.slice(1);

    // THE CONTAINER
    const container = createElement('div');
    addClassName(container, 'flex-child');
    addClassName(container, className);
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

    // RATING
    const ratingContent = createElement('p');
    append(description, ratingContent); 
    addTextContent(ratingContent, `Rating: ${newBook.rating}`);

    // STATUS
    const statusContent = createElement('p');
    append(description, statusContent); 
    statusContent.innerHTML = `Status: <b class='${className}'>${newBook.status}</b>`;

    // STATUS BUTTON
    const statusButton = createElement('button');
    append(description, statusButton);
    addTextContent(statusButton, negateWord(newBook.status));
    addClassName(statusButton, 'book-status');
    addClassName(statusButton, className);

    // CLARIFY
    const clarifier = createElement('p');
    append(description, clarifier);
    addTextContent(clarifier, '(Click to change book status)');
    addClassName(clarifier, 'clarifier');

    // BUTTON
    const buttonContent = createElement('button');
    append(description, buttonContent);
    addTextContent(buttonContent, 'Delete');
    addClassName(buttonContent, 'delete');
    addClassName(buttonContent, className);

    // CLOSE MODAL
    const dialog = document.querySelector('dialog');
    dialog.close();
    
    setHeight();

    // RESET FORM
    const form = document.querySelector('form');
    form.reset();
    const error = document.querySelector('.error');
    error.textContent = '';

    // ADD TO OUR LIBRARAY
    storedBook.push(className);
});

const exit = document.querySelector('.close');
exit.addEventListener('click', (event) => {
    event.preventDefault();
    const dialog = document.querySelector('dialog');
    dialog.close();

    // RESET FORM
    const form = document.querySelector('form');
    form.reset();
    const error = document.querySelector('.error');
    error.textContent = '';
});

const flexContainer = document.querySelector('.flex-container');
flexContainer.addEventListener('click', (event) => {
    if (event.target.classList[0] !== 'delete') {
        return;
    }
    for (let i = 0; i < storedBook.length; i++) {
        if (event.target.classList[1] === storedBook[i]) {
            // DELETE THE DESIRED ELEMENT
            const desiredDOMElement = document.querySelector(`div.${storedBook[i]}`);
            desiredDOMElement.remove();

            // REMOVE CLASSNAME FROM LIBRARY
            storedBook.splice(i, 1);
        }
    }
})
flexContainer.addEventListener('click', (event) => {
    if (event.target.classList[0] !== 'book-status') {
        return;
    };
    const bookStatus = document.querySelectorAll('.book-status');
    for (let i = 0; i < bookStatus.length; i++) {
        if (event.target.classList[1] === bookStatus[i].classList[1]) {
            const status = document.querySelector(`b.${event.target.classList[1]}`);
            addTextContent(status, negateWord(status.textContent));

            const button = document.querySelector(`button.${event.target.classList[1]}`);
            addTextContent(button, negateWord(button.textContent));
        }
    }
})