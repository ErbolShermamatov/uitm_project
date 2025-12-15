document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const animeId = params.get('id');
    const container = document.getElementById('details-container');
    const anime = animeData.find(item => item.id === animeId);

    if (anime) {
        document.title = `${anime.title} | Details`;
        container.innerHTML = `
            <div class="details-img-box">
                <img src="${anime.img}" alt="${anime.title}" class="details-img">
            </div>
            <div class="details-info">
                <a href="index.html" class="back-btn">← Back to List</a>
                <h1 class="details-title">${anime.title}</h1>
                <div class="details-meta">
                    <span class="year">Year: ${anime.year}</span> | 
                    <span class="category" style="text-transform: uppercase;">${anime.category}</span>
                </div>
                <div class="details-desc">
                    <p>${anime.description || "Описание пока не добавлено."}</p>
                </div>
                <div class="details-characters">
                    <h1 class="character__title">Main Characters</h1>
                    <ul class="details-characters-list">
                    </ul>
                </div>
                <div class="details-trailer">
                    <h2 class="details-trailer__title">Watch Trailer</h2>
                    <div class="details-trailer__video">
                        <iframe width="100%" height="100%" src="https://www.youtube-nocookie.com/embed/${anime.watch}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                    </div>
                </div>
            </div>
        `;
    } else {
        container.innerHTML = `
            <div style="text-align: center;">
                <h1>Anime not found</h1>
                <a href="index.html" class="back-btn">Go Home</a>
            </div>
        `;
    }
    const charactersList = document.querySelector('.details-characters-list');
    if(charactersList) {
        if(anime.characters) {
            anime.characters.forEach(character => {
                const characterLi = document.createElement('li');
                characterLi.classList.add('character');
                const characterImgBox = document.createElement('div');
                characterImgBox.classList.add('character__img-box');
                const characterImg = document.createElement('img');
                characterImg.setAttribute('src', character.img);
                characterImg.classList.add('character__img');
                const characterTitle = document.createElement('h1');
                const characterName = document.createElement('h2');
                characterName.classList.add('character__name');
                characterName.textContent = character.name;
                characterImgBox.append(characterImg);
                characterLi.append(characterImgBox);
                characterLi.append(characterName);
                charactersList.append(characterLi);
            })
        }
    }
});