const users = [
    { id: 1, username: 'zhakatvin', password: '11111Zh!' },
    { id: 2, username: 'zhopa', password: '11111Zh!' },
    { id: 3, username: 'artem', password: '11111Zh!' }
];

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('loginForm');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        clearErrors();

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        let isValid = true;

        // Валидация логина
        if (!username) {
            addError(document.getElementById('username'), 'Введите логин.');
            isValid = false;
        }

        // Валидация пароля
        if (!password) {
            addError(document.getElementById('password'), 'Введите пароль.');
            isValid = false;
        }

        if (isValid) {
            const user = users.find(user => user.username === username && user.password === password);

            if (user) {
                alert('Пользователь найден!');
                window.location.href = 'index.html';
            } else {
                addError(document.getElementById('username'), 'Неверный логин или пароль.');
                addError(document.getElementById('password'), 'Неверный логин или пароль.');
            }
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