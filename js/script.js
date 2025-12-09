const swiper = new Swiper(".mySwiper", {
    slidesPerView: "auto",
    spaceBetween: 15,
    loop: true, 

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },

    breakpoints: {
        320: {
            slidesPerView: 2,
            spaceBetween: 10
        },
        640: {
            slidesPerView: 3,
            spaceBetween: 15
        },
        1024: {
            slidesPerView: 5,
            spaceBetween: 15
        }
    }
});