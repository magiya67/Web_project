document.addEventListener("DOMContentLoaded", function () {
    // Массив городов для поиска
    const cities = ['Москва', 'Санкт-Петербург', 'Новосибирск'];

    // Элементы DOM
    const cityInput = document.getElementById('city');
    const citySuggestions = document.getElementById('citySuggestions');

    // Обработчик ввода в поле города
    cityInput.addEventListener('input', function () {
        const inputValue = cityInput.value.trim().toLowerCase();
        const filteredCities = cities.filter(city => city.toLowerCase().includes(inputValue));

        if (filteredCities.length > 0) {
            // Создаем HTML для подсказок
            citySuggestions.innerHTML = filteredCities.map(city => `
                <a href="#" class="list-group-item list-group-item-action" data-city="${city}">${city}</a>
            `).join('');
            citySuggestions.style.display = 'block'; // Показываем подсказки
        } else {
            citySuggestions.style.display = 'none'; // Скрываем подсказки
        }
    });

    // Обработчик клика по подсказкам
    citySuggestions.addEventListener('click', function (e) {
        if (e.target.tagName === 'A') {
            e.preventDefault(); // Предотвращаем переход по ссылке
            cityInput.value = e.target.getAttribute('data-city'); // Устанавливаем значение в поле ввода
            citySuggestions.style.display = 'none'; // Скрываем подсказки
        }
    });

    // Закрытие подсказок при клике вне поля ввода
    document.addEventListener('click', function (e) {
        if (!cityInput.contains(e.target) && !citySuggestions.contains(e.target)) {
            citySuggestions.style.display = 'none';
        }
    });

    // Маска для телефона
    const phoneInput = document.getElementById('phone');
    const im = new Inputmask("+7 (999) 999-99-99", { "clearIncomplete": true });
    im.mask(phoneInput);

    // Установка максимальной даты для даты рождения
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const maxDate = `${yyyy}-${mm}-${dd}`;
    document.getElementById('dob').setAttribute('max', maxDate);

    // Обработчик отправки формы
    document.querySelector('form').addEventListener('submit', function (event) {
        event.preventDefault();

        // Очистка предыдущих ошибок
        clearErrors();

        const username = document.getElementById('username').value.trim();
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const city = cityInput.value.trim();
        const department = document.getElementById('department').value;
        const dob = document.getElementById('dob').value;
        const subjects = document.querySelectorAll('#subjectCheckboxes input[type="checkbox"]:checked');

        let isValid = true;

        // Валидация имени пользователя
        if (!username || username.length < 3) {
            addError(document.getElementById('username'), 'Имя пользователя должно содержать не менее 3 символов.');
            isValid = false;
        }

        // Валидация имени
        if (!firstName || firstName.length < 2) {
            addError(document.getElementById('firstName'), 'Имя должно содержать не менее 2 символов.');
            isValid = false;
        }

        // Валидация фамилии
        if (!lastName || lastName.length < 2) {
            addError(document.getElementById('lastName'), 'Фамилия должна содержать не менее 2 символов.');
            isValid = false;
        }

        // Валидация email
        if (!email || !email.includes("@") || !email.includes(".")) {
            addError(document.getElementById('email'), 'Введите корректный email.');
            isValid = false;
        }

        // Валидация пароля
        if (password.length < 8) {
            addError(document.getElementById('password'), 'Пароль должен содержать не менее 8 символов.');
            isValid = false;
        }

        // Валидация телефона
        if (!phone || phone.includes("_")) { // Проверка на заполненность маски
            addError(document.getElementById('phone'), 'Введите корректный номер телефона.');
            isValid = false;
        }

        // Валидация города
        if (!city) {
            addError(cityInput, 'Пожалуйста, выберите город.');
            isValid = false;
        }

        // Валидация департамента
        if (!department || department === "Выберите департамент...") {
            addError(document.getElementById('department'), 'Пожалуйста, выберите департамент.');
            isValid = false;
        }

        // Валидация учебных предметов
        if (subjects.length === 0) {
            addError(document.getElementById('subjectCheckboxes'), 'Пожалуйста, выберите хотя бы один предмет.');
            isValid = false;
        }

        // Валидация даты рождения
        if (!dob) {
            addError(document.getElementById('dob'), 'Пожалуйста, укажите дату рождения.');
            isValid = false;
        }

        // Если все данные валидны, отправляем форму
        if (isValid) {
            const formData = {
                username: username,
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                phone: phone,
                city: city,
                department: department,
                dob: dob,
                subjects: Array.from(subjects).map(subject => subject.value)
            };
            console.log('Данные для отправки:', formData);
            alert('Регистрация успешна!');
        }
    });

    // Функция для добавления ошибки
    function addError(input, message) {
        input.classList.add('input-error');
        const wrapper = input.closest('.mb-3') || input.parentElement;

        // Удаляем старую иконку, если есть
        const existingIcon = wrapper.querySelector('.error-icon');
        if (existingIcon) existingIcon.remove();

        // Добавляем восклицательный знак
        const errorIcon = document.createElement('span');
        errorIcon.className = 'error-icon d-none d-sm-block'; // Скрываем на мобильных
        errorIcon.innerHTML = '❗';

        // Добавляем сообщение об ошибке для мобильных
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message d-block d-sm-none text-danger mt-2'; // Показываем только на мобильных
        errorMessage.textContent = message;

        // Позиционирование иконки
        wrapper.style.position = 'relative';
        errorIcon.style.position = 'absolute';
        errorIcon.style.right = '10px';
        errorIcon.style.top = '50%';
        errorIcon.style.transform = 'translateY(-50%)';
        errorIcon.style.color = 'red';
        errorIcon.style.cursor = 'pointer';
        errorIcon.style.zIndex = '1';

        // Добавляем подсказку
        errorIcon.addEventListener('mouseenter', () => {
            const tooltip = document.createElement('div');
            tooltip.className = 'error-tooltip d-none d-sm-block'; // Скрываем на мобильных
            tooltip.textContent = message;

            const rect = errorIcon.getBoundingClientRect();
            tooltip.style.position = 'fixed';
            tooltip.style.left = `${rect.left + window.scrollX}px`;
            tooltip.style.top = `${rect.bottom + window.scrollY + 5}px`;

            document.body.appendChild(tooltip);
        });

        errorIcon.addEventListener('mouseleave', () => {
            const tooltip = document.querySelector('.error-tooltip');
            if (tooltip) tooltip.remove();
        });

        wrapper.appendChild(errorIcon);
        wrapper.appendChild(errorMessage);
    }

    // Функция для очистки ошибок
    function clearErrors() {
        document.querySelectorAll('.input-error').forEach(el => {
            el.classList.remove('input-error');
        });
        document.querySelectorAll('.error-icon, .error-tooltip, .error-message').forEach(el => {
            el.remove();
        });
    }
});