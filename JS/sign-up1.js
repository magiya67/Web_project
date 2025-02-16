document.addEventListener("DOMContentLoaded", function () {
    const cities = ['Москва', 'Санкт-Петербург', 'Новосибирск'];

    // Элементы DOM
    const cityInput = document.getElementById('city');
    const citySuggestions = document.getElementById('citySuggestions');

    // Обработчик ввода в поле города
    cityInput.addEventListener('input', function () {
        const inputValue = cityInput.value.trim().toLowerCase();
        const filteredCities = cities.filter(city => city.toLowerCase().includes(inputValue));

        if (filteredCities.length > 0) {
            citySuggestions.innerHTML = filteredCities.map(city => `
                <a href="#" class="list-group-item list-group-item-action" data-city="${city}">${city}</a>
            `).join('');
            citySuggestions.style.display = 'block';
        } else {
            citySuggestions.style.display = 'none';
        }
    });

    // Обработчик клика по подсказкам
    citySuggestions.addEventListener('click', function (e) {
        if (e.target.tagName === 'A') {
            e.preventDefault();
            cityInput.value = e.target.getAttribute('data-city');
            citySuggestions.style.display = 'none';
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
    const maxDate = today.toISOString().split('T')[0];
    document.getElementById('dob').setAttribute('max', maxDate);

    // Обработчик отправки формы
    document.querySelector('form').addEventListener('submit', function (event) {
        event.preventDefault();
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
        const accountType = document.querySelector('input[name="is_teacher"]:checked')?.value;

        const noSpaceFields = ['username', 'firstName', 'lastName', 'email'];
    noSpaceFields.forEach(id => {
        const field = document.getElementById(id);
        if (field) {
            field.addEventListener('input', function() {
                this.value = this.value.replace(/\s/g, '');
            });
        }
    });

        let isValid = true;

        // Валидация имени пользователя
        if (!username || username.length < 3 || /\s/.test(username)) {
        addError(document.getElementById('username'), 'Имя пользователя должно содержать не менее 3 символов без пробелов.');
        isValid = false;
    }

    // Валидация имени
    if (!firstName || firstName.length < 2 || /\s/.test(firstName)) {
        addError(document.getElementById('firstName'), 'Имя должно содержать не менее 2 символов без пробелов.');
        isValid = false;
    }

    // Валидация фамилии
    if (!lastName || lastName.length < 2 || /\s/.test(lastName)) {
        addError(document.getElementById('lastName'), 'Фамилия должна содержать не менее 2 символов без пробелов.');
        isValid = false;
    }

    // Валидация email (регулярка уже исключает пробелы)
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        addError(document.getElementById('email'), 'Введите корректный email без пробелов.');
        isValid = false;
    }

        // Валидация пароля
        if (password.length < 8) {
            addError(document.getElementById('password'), 'Пароль должен содержать не менее 8 символов.');
            isValid = false;
        }

        // Валидация телефона
        if (!phone || phone.includes("_")) {
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

        if (isValid) {
            const answers = {
                username: username,
                first_name: firstName,
                last_name: lastName,
                email: email,
                password1: password,
                password2: password,
                is_teacher: accountType,
                telephone_number: phone,
                city: city,
                birthday_date: dob,
                department: department,
                subjects: Array.from(subjects).map(subject => subject.value)
            };

            console.log(answers);

            // Отправка данных на сервер
            const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
            fetch('', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken
                },
                body: JSON.stringify(answers)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    if (data.redirect_url) {
                        window.location.href = data.redirect_url;
                    } else {
                        alert('Вы успешно зарегистрировались!');
                    }
                } else {
                    for (const field in data.errors) {
                        data.errors[field].forEach(error => {
                            addError(document.getElementById(field), error);
                        });
                    }
                }
            })
            .catch(error => console.error('Ошибка:', error));
        }
    });

    // Функция для добавления ошибки
    function addError(input, message) {
        input.classList.add('input-error');
        const wrapper = input.closest('.mb-3') || input.parentElement;

        const existingIcon = wrapper.querySelector('.error-icon');
        if (existingIcon) existingIcon.remove();

        const errorIcon = document.createElement('span');
        errorIcon.className = 'error-icon d-none d-sm-block';
        errorIcon.innerHTML = '❗';

        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message d-block d-sm-none text-danger mt-2';
        errorMessage.textContent = message;

        wrapper.style.position = 'relative';
        errorIcon.style.position = 'absolute';
        errorIcon.style.right = '10px';
        errorIcon.style.top = '50%';
        errorIcon.style.transform = 'translateY(-50%)';
        errorIcon.style.color = 'red';
        errorIcon.style.cursor = 'pointer';
        errorIcon.style.zIndex = '1';

        errorIcon.addEventListener('mouseenter', () => {
            const tooltip = document.createElement('div');
            tooltip.className = 'error-tooltip d-none d-sm-block';
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