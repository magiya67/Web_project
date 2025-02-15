async function fetchNews() {
    const newsContainer = document.getElementById('news-container');

    try {
        const response = await fetch('http://localhost:3000/proxy');
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const html = await response.text(); // Получаем HTML как текст
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        // Пример парсинга новостей
        const newsItems = [];
        const newsList = doc.querySelectorAll('.news-item');
        newsList.forEach(item => {
            const date = item.querySelector('.news-item-date')?.textContent.trim();
            const title = item.querySelector('.news-item-short')?.textContent.trim();
            const link = item.querySelector('a')?.href;
            const image = item.querySelector('.news-image img')?.src;

            newsItems.push({ date, title, link, image });
        });

        // Отображаем новости
        newsItems.forEach(news => {
            const newsCard = document.createElement('div');
            newsCard.className = 'col-md-4';
            newsCard.innerHTML = `
                <div class="card h-100">
                    <img src="${news.image}" class="card-img-top" alt="${news.title}">
                    <div class="card-body">
                        <h5 class="card-title">${news.title}</h5>
                        <p class="card-text"><strong>Дата:</strong> ${news.date}</p>
                        <a href="${news.link}" target="_blank" class="btn btn-primary">Читать далее</a>
                    </div>
                </div>
            `;
            newsContainer.appendChild(newsCard);
        });

    } catch (error) {
        newsContainer.innerHTML = '<p class="text-center text-danger">Ошибка загрузки новостей.</p>';
        console.error('Ошибка загрузки новостей:', error);
    }
}

fetchNews();
