document.addEventListener('DOMContentLoaded', function () {
    const phoneInput = document.getElementById('phoneInput');
    const phoneText = document.getElementById('phoneText');
    const im = new Inputmask("+7 (999) 999-99-99", { clearIncomplete: true });
    im.mask(phoneInput);

    const editBtn = document.getElementById('editBtn');
    const saveBtn = document.getElementById('saveBtn');
    const nameText = document.getElementById('nameText');
    const nameInput = document.getElementById('nameInput');
    const emailText = document.getElementById('emailText');
    const emailInput = document.getElementById('emailInput');

    function toggleEditMode() {
        const isEditing = nameInput.style.display === 'block';
        if (isEditing) {
            // Сохраняем данные из полей ввода
            nameText.textContent = nameInput.value.trim();
            emailText.textContent = emailInput.value.trim();
            phoneText.textContent = phoneInput.value.trim();

            // Скрываем поля ввода
            nameInput.style.display = 'none';
            emailInput.style.display = 'none';
            phoneInput.style.display = 'none';

            // Показываем текстовые поля
            nameText.style.display = 'block';
            emailText.style.display = 'block';
            phoneText.style.display = 'block';

            // Переключаем кнопки
            saveBtn.style.display = 'none';
            editBtn.style.display = 'block';
        } else {
            // Показываем поля ввода
            nameInput.style.display = 'block';
            emailInput.style.display = 'block';
            phoneInput.style.display = 'block';

            // Скрываем текстовые поля
            nameText.style.display = 'none';
            emailText.style.display = 'none';
            phoneText.style.display = 'none';

            // Переключаем кнопки
            saveBtn.style.display = 'block';
            editBtn.style.display = 'none';
        }
    }

    editBtn.addEventListener('click', toggleEditMode);

    saveBtn.addEventListener('click', function () {
        // Проверяем валидность номера телефона
        if (!validatePhone(phoneInput.value.trim())) {
            alert('Пожалуйста, введите корректный номер телефона.');
            return;
        }
        // Сохраняем режим и выводим данные в console.log
        toggleEditMode();
        logFormData();
        alert('Данные сохранены.');
    });

    function validatePhone(phone) {
        // Корректное регулярное выражение для валидации телефона
        const phoneRegex = /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;
        return phoneRegex.test(phone);
    }

    function logFormData() {
        const formData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            phone: phoneInput.value.trim()
        };
        console.log('Сохраненные данные:', formData);
    }
});
