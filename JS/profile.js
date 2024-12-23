document.addEventListener('DOMContentLoaded', function () {
    const phoneInput = document.getElementById('phone');
    const im = new Inputmask("+7 (999) 999-99-99", { clearIncomplete: true });
    im.mask(phoneInput); // Устанавливаем маску для поля телефона

    // Массив старых паролей
    const oldPasswords = ["oldpass1", "oldpass2", "oldpass3"];

    // Кнопки
    const changePasswordBtn = document.getElementById('changePasswordBtn');
    const confirmBtn = document.getElementById('confirmBtn');

    // Событие для кнопки смены пароля
    changePasswordBtn.addEventListener('click', function () {
        const prevPassword = document.getElementById('prev-password').value.trim();
        const newPassword = document.getElementById('new-password').value.trim();
        var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!_?-])[A-Za-z\d!_?-]{8,20}$/;
        if (prevPassword === '' || newPassword === '') {
            alert('Пожалуйста, заполните все поля для смены пароля.');
            return;
        }

        if (!oldPasswords.includes(prevPassword)) {
            alert('Старый пароль не совпадает с существующими паролями.');
            return;
        }
        if (!passwordRegex.test(newPassword)) {
            alert('Введите корректный пароль, содержащий 1 цифру, 1 заглавную и 1 строчную букву, и спецсимвол !?_-');
            return;
        }
        
        alert('Пароль успешно изменен!');
        document.getElementById('prev-password').value = '';
        document.getElementById('new-password').value = '';
    });

    let previousPhoneValue = document.getElementById('phone').value.trim(); 

    confirmBtn.addEventListener('click', function () {
        const phone = document.getElementById('phone').value.trim();
        console.log(phone);
        if (phone === previousPhoneValue) {
            return;
        }

        if (phone === '' || !validatePhone(phone)) {
            alert('Пожалуйста, введите корректный номер телефона.');
            return;
        }

        alert('Данные сохранены.');
        previousPhoneValue = phone;
    });
    
    function validatePhone(phone) {
        var phoneRegex = /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;
        return phoneRegex.test(phone);
    }
});
