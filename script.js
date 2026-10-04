function setHeight() {
    const description = document.querySelector('.description');
    const bookCover = document.querySelectorAll('.book-cover');

    const style = getComputedStyle(description);
    bookCover.forEach((item) => {item.style.height = style.height});
}
setHeight();