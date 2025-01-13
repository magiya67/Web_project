async function fetchNews() {
    const newsContainer = document.getElementById('news-container');

    try {
        const response = await fetch('https://positivnews.ru');
        const data = await response.json();

        data.articles.forEach(article => {
            const newsCard = document.createElement('div');
            newsCard.className = 'col-md-4';

            newsCard.innerHTML = `
                <div class="card h-100">
                    <img src="${article.urlToImage || 'img/default-news.jpg'}" class="card-img-top" alt="${article.title}">
                    <div class="card-body">
                        <h5 class="card-title">${article.title}</h5>
                        <p class="card-text">${article.description || 'Описание отсутствует.'}</p>
                        <a href="${article.url}" target="_blank" class="btn btn-primary">Читать далее</a>
                    </div>
                </div>
            `;

            newsContainer.appendChild(newsCard);
        });
    } catch (error) {
        newsContainer.innerHTML = '<p class="text-center text-danger">Ошибка загрузки новостей.</p>';
        console.error('Error fetching news:', error);
    }
}

fetchNews();
