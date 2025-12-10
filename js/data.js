const animeData = [
    {
        title: 'Demon Slayer',
        img: 'img/main/bg/demon_slayer-bg.jpg',
        year: 2020,
        category: 'popular' //sign for filter
    },
    {
        title: 'Chainsaw Man',
        img: 'img/main/bg/chaisawman-bg.jpg',
        year: 2022,
        category: 'popular' //sign for filter
    },
    {
        title: 'One Piece',
        img: 'img/main/bg/one-piece-bg.jpg',
        year: 1999,
        category: 'ongoing' //sign for filter
    },
]
//Принимает массив и отрисовывает его
const renderAnime = (list) => {
    const container = document.querySelector('.popular__anime-list');
    container.innerHTML = ''; //Очищаем текущие карточки
    
    //Генерируем новый HTML
    list.forEach(item => {
        const animeHtml = `
        <li class="popular__anime-item">
                <div class="popular__anime-img-box">
                    <a href="#" class="popular__anime-link"></a>
                    <img src="${item.img}" alt="${item.title}" class="popular__anime-img">
                </div>
                <h3 class="popular__anime-title">${item.title}</h3>
                <span class="popular__anime-year">(${item.year})</span>
        </li>
        `;
        container.insertAdjacentHTML('beforeend', animeHtml);
    });

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