// news.js
document.addEventListener('DOMContentLoaded', function () {
    const newsContainer = document.getElementById('news-container');
    const paginationContainer = document.getElementById('pagination-container');
    let allNews = []; // Все новости
    let currentPage = 1;
    const newsPerPage = 5; // Новостей на странице

    // Функция для отображения новостей на текущей странице
    function displayNews(page) {
        const startIndex = (page - 1) * newsPerPage;
        const endIndex = startIndex + newsPerPage;
        const newsToShow = allNews.slice(startIndex, endIndex);

        newsContainer.innerHTML = '';
        newsToShow.forEach(news => {
            const newsItem = document.createElement('div');
            newsItem.className = 'news-item';
            newsItem.innerHTML = `
                <div class="news-content">
                    <h3 class="news-title">${news.title}</h3>
                    <p class="news-date"><small>${news.date}</small></p>
                    <p class="news-description">${news.description}</p>
                    <a href="${news.link}" class="news-link" target="_blank">Читать далее →</a>
                </div>
            `;
            newsContainer.appendChild(newsItem);
        });
    }

    // Функция для создания кнопок пагинации
    function setupPagination(totalPages) {
        paginationContainer.innerHTML = '';

        // Кнопка "Назад"
        const prevButton = document.createElement('button');
        prevButton.innerText = '←';
        prevButton.disabled = currentPage === 1;
        prevButton.addEventListener('click', () => {
            currentPage--;
            displayNews(currentPage);
            setupPagination(totalPages);
        });

        // Нумерация страниц
        const pageNumbers = document.createElement('div');
        pageNumbers.className = 'page-numbers';
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.innerText = i;
            pageButton.className = currentPage === i ? 'active' : '';
            pageButton.addEventListener('click', () => {
                currentPage = i;
                displayNews(currentPage);
                setupPagination(totalPages);
            });
            pageNumbers.appendChild(pageButton);
        }

        // Кнопка "Вперед"
        const nextButton = document.createElement('button');
        nextButton.innerText = '→';
        nextButton.disabled = currentPage === totalPages;
        nextButton.addEventListener('click', () => {
            currentPage++;
            displayNews(currentPage);
            setupPagination(totalPages);
        });

        paginationContainer.appendChild(prevButton);
        paginationContainer.appendChild(pageNumbers);
        paginationContainer.appendChild(nextButton);
    }

    // Загрузка новостей
    function loadNews() {
        fetch('/get-news/')
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    newsContainer.innerHTML = `<p class="text-danger">Ошибка: ${data.error}</p>`;
                    return;
                }

                allNews = data;
                const totalPages = Math.ceil(allNews.length / newsPerPage);
                displayNews(currentPage);
                setupPagination(totalPages);
            })
            .catch(error => {
                newsContainer.innerHTML = `<p class="text-danger">Ошибка при загрузке: ${error.message}</p>`;
            });
    }

    loadNews();
});