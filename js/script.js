document.addEventListener('DOMContentLoaded', () => {
    const swiperWrapper = document.querySelector('.swiper-wrapper');

    if (swiperWrapper) {
        const slidesHtml = animeData.slice(0, 10).map(item => `
            <div class="swiper-slide">
                <a href="details.html?id=${item.id}" class="swiper-preview"></a>
                <div class="header__main-slide-img-box">
                    <img src="${item.img}" alt="${item.title}" loading="lazy">
                </div>
            </div>
        `).join('');
        swiperWrapper.innerHTML = slidesHtml;

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
                700: {
                    slidesPerView: 3,
                    spaceBetween: 10
                },
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 10
                },
                1100: {
                    slidesPerView: 5,
                    spaceBetween: 15
                }
            }
        });
    }

    const container = document.querySelector('.popular__anime-list');

    if (!container) {
        return;
    }

    const renderAnime = (list) => {
        container.innerHTML = '';
        const animeHtml = list.map((item, index) => {
            const delay = index * 0.05;

            return `
            <li class="popular__anime-item" style="animation-delay: ${delay}s">
                <div class="popular__anime-img-box">
                    <a href="details.html?id=${item.id}" class="popular__anime-link"></a>
                    <img src="${item.img}" alt="${item.title}" class="popular__anime-img" loading="lazy">
                </div>
                <h3 class="popular__anime-title">${item.title}</h3>
                <span class="popular__anime-year">(${item.year})</span>
            </li>
        `;
        }).join('');

        container.innerHTML = animeHtml;
    };

    renderAnime(animeData);


    const navLinks = document.querySelectorAll('.header__top-nav-item-link');
    const sectionTitle = document.querySelector('.popular__title');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            navLinks.forEach(btn => btn.classList.remove('active'));
            link.classList.add('active');

            sectionTitle.textContent = link.textContent;

            const categoryBtn = link.textContent.trim().toLowerCase();

            if (categoryBtn === 'popular' || categoryBtn === 'ongoing') {
                const filtered = animeData.filter(item => item.category === categoryBtn);
                renderAnime(filtered);
            } else {
                renderAnime(animeData);
            }
        });
    });


    const menu = document.querySelector('.header__top-menu');
    const menuBtn = document.querySelector('.header__top-menu-btn');
    menuBtn.addEventListener('click', () => {
        menu.classList.toggle('visible')
        const menuLinks = document.querySelectorAll('.header__top-menu-item-link');
        menuLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                menuLinks.forEach(btn => btn.classList.remove('active'));
                link.classList.add('active');
                sectionTitle.textContent = link.textContent;
                const categoryBtn = link.textContent.trim().toLowerCase();

                if (categoryBtn === 'popular' || categoryBtn === 'ongoing') {
                    const filtered = animeData.filter(item => item.category === categoryBtn);
                    renderAnime(filtered);
                } else {
                    renderAnime(animeData);
                }
            })
        })

    })


    const searchForm = document.querySelector('.header__main-form');
    const searchInput = document.querySelector('.header__main-form-input');

    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const userInput = searchInput.value.toLowerCase().trim();

            const filtered = animeData.filter(item =>
                item.title.toLowerCase().includes(userInput)
            );

            sectionTitle.textContent = `SEARCH: "${searchInput.value.trim()}"`;
            renderAnime(filtered);
        });
    }
    const darkModeBtn = document.querySelector('.header__top-dark-mode-btn');
    const logo = document.querySelector('.header__top-img');
    darkModeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            logo.setAttribute('src', "img/header/icons/dark-mode-logo.png");
        } else if (!document.body.classList.contains('dark-mode')) {
            logo.setAttribute('src', "img/header/icons/logo.png");
        }
    })
});