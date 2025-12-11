const animeData = [
    {
        title: 'Demon Slayer',
        img: 'img/main/bg/demon_slayer-bg.webp',
        year: 2020,
        id: 'demon-slayer',
        category: 'popular'
    },
    {
        title: 'Chainsaw Man',
        img: 'img/main/bg/chaisawman-bg.webp',
        year: 2022,
        id: 'chainsaw-man',
        category: 'popular'
    },
    {
        title: 'One Piece',
        img: 'img/main/bg/one-piece-bg.webp',
        year: 1999,
        id: 'one-piece',
        category: 'ongoing'
    },
    {
        title: 'My Hero Academia',
        img: 'img/main/bg/my-hero-academia-bg.webp',
        year: 2016,
        id: 'my-hero-academia',
        category: 'ongoing'
    },
    {
        title: 'Gachiakuta',
        img: 'img/main/bg/gachiakuta-bg.webp',
        year: 2025,
        id: 'gachiakuta',
        category: 'ongoing'
    },
    {
        title: 'To Your Eternity',
        img: 'img/main/bg/to-your-eternity-bg.webp',
        year: 2021,
        id: 'to-your-eternity',
        category: 'ongoing'
    },
    {
        title: 'Fullmetal Alchemist',
        img: 'img/main/bg/fullmetal-alchemist-bg.webp',
        year: 2009,
        id: 'fullmetal-alchemist',
        category: 'completed'
    },
    {
        title: 'Stains Gate',
        img: 'img/main/bg/steins-gate-bg.webp',
        year: 2011,
        id: 'stains-gate',
        category: 'completed'
    },
    {
        title: 'Frieren: Beyond Journey End',
        img: 'img/main/bg/frieren-bg.webp',
        year: 2023,
        id: 'frieren',
        category: 'ongoing'
    },
    {
        title: 'Hunter X Hunter',
        img: 'img/main/bg/hunter-x-hunter-bg.webp',
        year: 2011,
        id: 'hunter-x-hunter',
        category: 'completed'
    },
    {
        title: 'Bleach',
        img: 'img/main/bg/bleach-bg.webp',
        year: 2004,
        id: 'bleach',
        category: 'ongoing'
    },
    {
        title: 'Monster',
        img: 'img/main/bg/monster-bg.webp',
        year: 2004,
        id: 'monster',
        category: 'completed'
    },
    {
        title: 'The Apothecary Diaries',
        img: 'img/main/bg/the-apothecary-diaries-bg.webp',
        year: 2023,
        id: 'the-apothecary-diaries',
        category: 'ongoing'
    },
    {
        title: 'Attack on Titan',
        img: 'img/main/bg/attack-on-titan-bg.webp',
        year: 2013,
        id: 'attack-on-titan',
        category: 'completed'
    },
    {
        title: 'Jujutsu Kaisen',
        img: 'img/main/bg/jujutsu-kaisen-bg.webp',
        year: 2020,
        id: 'jujutsu-kaisen',
        category: 'ongoing'
    },
    {
        title: 'Bocchi the Rock',
        img: 'img/main/bg/bochi-the-rock-bg.webp',
        year: 2022,
        id: 'bocchi-the-rock',
        category: 'ongoing'
    },
]
//Принимает массив и отрисовывает его
const renderAnime = (list) => {
    const container = document.querySelector('.popular__anime-list');
    container.innerHTML = ''; //Очищаем текущие карточки
    
    const animeHtml = list.map((item, index) => {
        const delay = index * 0.1;    
        
        return `
        <li class="popular__anime-item" style="animation-delay: ${delay}s"> <div class="popular__anime-img-box">
                <a href="details.html?id=${item.id}" class="popular__anime-link"></a>
                <img src="${item.img}" alt="${item.title}" class="popular__anime-img" loading="lazy">
            </div>
            <h3 class="popular__anime-title">${item.title}</h3>
            <span class="popular__anime-year">(${item.year})</span>
        </li>
    `;
    }).join('');

    container.innerHTML = animeHtml;

    const navLinks = document.querySelectorAll('.header__top-nav-item-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionTitle = document.querySelector('.popular__title');
            sectionTitle.textContent = link.textContent;
            navLinks.forEach(btn => btn.classList.remove('active')); //Сначала удаляем класс active у всех ссылок
            link.classList.add('active'); //И добавляем нажатой кнопке класс active

            //Получаем категорию из текста кнопки (например, "ONGOING" -> "ongoing")
            const categoryBtn = link.textContent.trim().toLowerCase();

            if(categoryBtn === 'popular') {
                //Фильтруем - если нажали на ссылку Popular, то показываем только те объекты у которых category: 'popular'
                const filtered = animeData.filter(item => item.category === 'popular');
                renderAnime(filtered);
            }
            else if(categoryBtn === 'ongoing') {
                const filtered = animeData.filter(item => item.category === 'ongoing');
                renderAnime(filtered);
            }
            else {
                //Для остальных вкладок покажем все или что-то еще
                renderAnime(animeData);
            }
        })
    })
}

renderAnime(animeData);