document.addEventListener('DOMContentLoaded', function () {
    // Массив городов для поиска
    const cities = ['Москва', 'Санкт-Петербург', 'Новосибирск'];

    // Элементы DOM
    const phoneInput = document.getElementById('phoneInput');
    const phoneText = document.getElementById('phoneText');
    const editBtn = document.getElementById('editBtn');
    const saveBtn = document.getElementById('saveBtn');
    const nameText = document.getElementById('nameText');
    const nameInput = document.getElementById('nameInput');
    const emailText = document.getElementById('emailText');
    const emailInput = document.getElementById('emailInput');
    const cityText = document.getElementById('cityText');
    const cityInput = document.getElementById('cityInput');
    const citySuggestions = document.getElementById('citySuggestions');
    const departmentText = document.getElementById('departmentText');
    const departmentInput = document.getElementById('departmentInput');
    const subjectsText = document.getElementById('subjectsText');
    const subjectsInput = document.getElementById('subjectsInput');
    const subjectCheckboxes = subjectsInput.querySelectorAll('input[type="checkbox"]');

    // Маска для телефона
    const im = new Inputmask("+7 (999) 999-99-99", { clearIncomplete: true });
    im.mask(phoneInput);

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

    // Функция переключения режима редактирования
    function toggleEditMode() {
        const isEditing = nameInput.style.display === 'block';
        if (isEditing) {
            // Сохраняем данные из полей ввода
            nameText.textContent = nameInput.value.trim();
            emailText.textContent = emailInput.value.trim();
            phoneText.textContent = phoneInput.value.trim();
            cityText.textContent = cityInput.value;
            departmentText.textContent = departmentInput.value;

            // Обновляем выбранные предметы
            const selectedSubjects = Array.from(subjectCheckboxes)
                .filter(checkbox => checkbox.checked)
                .map(checkbox => checkbox.value)
                .join(', ');
            subjectsText.innerHTML = `<span>${selectedSubjects}</span>`;

            // Скрываем поля ввода
            nameInput.style.display = 'none';
            emailInput.style.display = 'none';
            phoneInput.style.display = 'none';
            cityInput.style.display = 'none';
            departmentInput.style.display = 'none';
            subjectsInput.style.display = 'none';

            // Показываем текстовые поля
            nameText.style.display = 'block';
            emailText.style.display = 'block';
            phoneText.style.display = 'block';
            cityText.style.display = 'block';
            departmentText.style.display = 'block';
            subjectsText.style.display = 'block';

            // Переключаем кнопки
            saveBtn.style.display = 'none';
            editBtn.style.display = 'block';
        } else {
            // Показываем поля ввода
            nameInput.style.display = 'block';
            emailInput.style.display = 'block';
            phoneInput.style.display = 'block';
            cityInput.style.display = 'block';
            departmentInput.style.display = 'block';
            subjectsInput.style.display = 'block';

            // Скрываем текстовые поля
            nameText.style.display = 'none';
            emailText.style.display = 'none';
            phoneText.style.display = 'none';
            cityText.style.display = 'none';
            departmentText.style.display = 'none';
            subjectsText.style.display = 'none';

            // Переключаем кнопки
            saveBtn.style.display = 'block';
            editBtn.style.display = 'none';
        }
    }

    // Обработчики кнопок
    editBtn.addEventListener('click', toggleEditMode);
    saveBtn.addEventListener('click', function () {
        // Очистка предыдущих ошибок
        clearErrors();

        let isValid = true;

        // Валидация имени
        if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
            addError(nameInput, 'Имя должно содержать не менее 2 символов.');
            isValid = false;
        }

        // Валидация email
        if (!emailInput.value.trim() || !emailInput.value.includes("@") || !emailInput.value.includes(".")) {
            addError(emailInput, 'Введите корректный email.');
            isValid = false;
        }

        // Валидация телефона
        if (!phoneInput.value.trim() || phoneInput.value.includes("_")) {
            addError(phoneInput, 'Введите корректный номер телефона.');
            isValid = false;
        }

        // Валидация города
        if (!cityInput.value.trim()) {
            addError(cityInput, 'Пожалуйста, выберите город.');
            isValid = false;
        }

        // Валидация департамента
        if (!departmentInput.value.trim() || departmentInput.value === "Выберите департамент...") {
            addError(departmentInput, 'Пожалуйста, выберите департамент.');
            isValid = false;
        }

        // Валидация учебных предметов
        if (Array.from(subjectCheckboxes).filter(checkbox => checkbox.checked).length === 0) {
            addError(subjectsInput, 'Пожалуйста, выберите хотя бы один предмет.');
            isValid = false;
        }

        // Если все данные валидны, сохраняем форму
        if (isValid) {
            toggleEditMode();
            logFormData();
        }
    });

    // Валидация номера телефона
    function validatePhone(phone) {
        const phoneRegex = /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;
        return phoneRegex.test(phone);
    }

    // Логирование данных формы
    function logFormData() {
        const formData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            phone: phoneInput.value.trim(),
            city: cityInput.value,
            department: departmentInput.value,
            subjects: Array.from(subjectCheckboxes)
                .filter(checkbox => checkbox.checked)
                .map(checkbox => checkbox.value),
        };
        console.log('Сохраненные данные:', formData);
    }

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