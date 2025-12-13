document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const animeId = params.get('id');
    const container = document.getElementById('detailsContainer');
    const anime = animeData.find(item => item.id === animeId);

    if (anime) {
        document.title = `${anime.title} | Details`;
        container.innerHTML = `
            <div class="details-left">
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
});