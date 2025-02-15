document.addEventListener("DOMContentLoaded", function () {
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
        const city = document.getElementById('city').value;
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
        if (!city || city === "Выберите город...") {
            addError(document.getElementById('city'), 'Пожалуйста, выберите город.');
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

            // Здесь можно добавить отправку данных на сервер
            // fetch('URL_СЕРВЕРА', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(formData)
            // })
            // .then(response => response.json())
            // .then(data => {
            //     if (data.success) {
            //         window.location.href = data.redirect_url || '/success';
            //     } else {
            //         alert('Ошибка сервера: ' + JSON.stringify(data.errors));
            //     }
            // })
            // .catch(error => {
            //     console.error('Ошибка при отправке:', error);
            // });
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
    
    function clearErrors() {
        document.querySelectorAll('.input-error').forEach(el => {
            el.classList.remove('input-error');
        });
        document.querySelectorAll('.error-icon, .error-tooltip, .error-message').forEach(el => {
            el.remove();
        });
    }
});