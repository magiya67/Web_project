document.addEventListener('DOMContentLoaded', function () {
    const phoneInput = document.getElementById('phoneInput');
    const phoneText = document.getElementById('phoneText');
    const im = new Inputmask("+7 (999) 999-99-99", { clearIncomplete: true });
    im.mask(phoneInput);

    const editBtn = document.getElementById('editBtn');
    const saveBtn = document.getElementById('saveBtn');
    const nameText = document.getElementById('nameText');
    const nameInput = document.getElementById('nameInput');
    const lastNameText = document.getElementById('lastNameText');
    const lastNameInput = document.getElementById('lastNameInput');
    const emailText = document.getElementById('emailText');
    const emailInput = document.getElementById('emailInput');

    function toggleEditMode() {
        const isEditing = nameInput.style.display === 'block';
        if (isEditing) {
            // Сохраняем данные из полей ввода
            nameText.textContent = nameInput.value.trim();
            lastNameText.textContent = lastNameInput.value.trim();
            emailText.textContent = emailInput.value.trim();
            phoneText.textContent = phoneInput.value.trim();

            // Скрываем поля ввода
            nameInput.style.display = 'none';
            lastNameInput.style.display = 'none';
            emailInput.style.display = 'none';
            phoneInput.style.display = 'none';

            // Показываем текстовые поля
            nameText.style.display = 'block';
            lastNameText.style.display = 'block';
            emailText.style.display = 'block';
            phoneText.style.display = 'block';

            // Переключаем кнопки
            saveBtn.style.display = 'none';
            editBtn.style.display = 'block';
        } else {
            // Показываем поля ввода
            nameInput.style.display = 'block';
            lastNameInput.style.display = 'block';
            emailInput.style.display = 'block';
            phoneInput.style.display = 'block';

            // Скрываем текстовые поля
            nameText.style.display = 'none';
            lastNameText.style.display = 'none';
            emailText.style.display = 'none';
            phoneText.style.display = 'none';

            // Переключаем кнопки
            saveBtn.style.display = 'block';
            editBtn.style.display = 'none';
        }
    }

    editBtn.addEventListener('click', toggleEditMode);

    saveBtn.addEventListener('click', function () {

        if (!validatePhone(phoneInput.value.trim())) {
            alert('Пожалуйста, введите корректный номер телефона.');
            return;
        }

        toggleEditMode();
        logFormData();

    });

    function validatePhone(phone) {

        const phoneRegex = /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;
        return phoneRegex.test(phone);
    }

    function logFormData() {
        const formData = {
            first_name: nameInput.value.trim(),
            last_name: lastNameInput.value.trim(),
            email: emailInput.value.trim(),
            telephone_number: phoneInput.value.trim()
        };
        console.log('Сохраненные данные:', formData);
        const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        fetch('', {  // Укажите URL представления
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken // Добавляем CSRF-токен для защиты
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Если сервер вернул URL редиректа, перенаправляем
                if (data.redirect_url) {
                    window.location.href = data.redirect_url;
                } else {
                    successMessageDiv.textContent = 'Вы успешно зарегистрировались!';
                }
            } else {
                // Показ ошибок, которые вернул сервер
                const serverErrors = data.errors;
                for (const field in serverErrors) {
                    serverErrors[field].forEach(error => {
                        const errorItem = document.createElement('div');
                        errorItem.textContent = error;
                        errorMessagesDiv.appendChild(errorItem);
                    });
                }
            }
        })
    }
});
