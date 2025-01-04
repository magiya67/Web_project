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

        const username = document.getElementById('username').value.trim();
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const city = document.getElementById('city').value;
        const dob = document.getElementById('dob').value;
        const department = document.getElementById('department').value;
        const accountType = document.getElementById('accountType').value;
        const selectedSubjects = Array.from(document.querySelectorAll('#subjectCheckboxes .form-check input:checked'))
            .map(input => input.value);

        // Валидация данных
        if (!username || username.length < 3) {
            alert('Введите корректный логин (не менее 3 символов).');
            return;
        }
        if (!firstName || firstName.length < 2) {
            alert('Введите корректное имя.');
            return;
        }
        if (!lastName || lastName.length < 2) {
            alert('Введите корректную фамилию.');
            return;
        }
        if (!email.includes("@")) {
            alert('Введите корректный email.');
            return;
        }
        if (password.length < 8) {
            alert('Пароль должен содержать не менее 8 символов.');
            return;
        }
        if (!phone) {
            alert('Введите корректный номер телефона.');
            return;
        }
        if (city === "Выберите город...") {
            alert('Пожалуйста, выберите город.');
            return;
        }
        if (!dob) {
            alert('Пожалуйста, укажите дату рождения.');
            return;
        }
        if (department === "Выберите департамент...") {
            alert('Пожалуйста, выберите департамент.');
            return;
        }
        if (selectedSubjects.length === 0) {
            alert('Пожалуйста, выберите хотя бы один предмет.');
            return;
        }
        if (accountType === "Выберите тип учетной записи...") {
            alert('Пожалуйста, выберите тип учетной записи.');
            return;
        }

        const answers = {
            username,
            firstName,
            lastName,
            email,
            password,
            phone,
            city,
            dob,
            department,
            selectedSubjects,
            accountType // Новый ответ
        };

        console.log(answers);

        alert('Регистрация завершена!');
    });
});
