const track = document.querySelector('.header__main-track');
const btnPrev = document.getElementById('.header__main-slider-prev');
const btnNext = document.getElementById('.header__main-slider-next');
const items = document.querySelectorAll('.header__main-slide');

let position = 0;
const itemsCount = items.length;

const moveSlider = () => {
    const translateValue = -(position * 100); 
    track.style.transform = `translateX(${translateValue}%)`;
};

btnNext.addEventListener('click', () => {
    if (position < itemsCount - 1) {
        position++;
    } else {
        position = 0;
    }
    moveSlider();
});

btnPrev.addEventListener('click', () => {
    if (position > 0) {
        position--;
    } else {
        position = itemsCount - 1;
    }
    moveSlider();
});