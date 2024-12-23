document.addEventListener("DOMContentLoaded", function () {
    // Маска для телефона
    var phoneInput = document.getElementById('phone');
    var im = new Inputmask("+7 (999) 999-99-99", { "clearIncomplete": true });
    im.mask(phoneInput);

    // Установка максимальной даты для даты рождения
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    var maxDate = `${yyyy}-${mm}-${dd}`;
    document.getElementById('dob').setAttribute('max', maxDate);

    // Обработчик отправки формы
    document.querySelector('form').addEventListener('submit', function (event) {
        event.preventDefault();

        var name = document.getElementById('name').value.trim();
        var email = document.getElementById('email').value.trim();
        var password = document.getElementById('password').value.trim();
        var phone = document.getElementById('phone').value.trim();
        var city = document.getElementById('city').value;
        var dob = document.getElementById('dob').value;
        var department = document.getElementById('department').value;
        var selectedSubjects = Array.from(document.querySelectorAll('#subjectCheckboxes .form-check input:checked'))
            .map(input => input.value);

        var nameRegex = /^[А-ЯЁ][а-яё]+(?:\s[А-ЯЁ][а-яё]+)?$/;
        var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        var phoneRegex = /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;
        var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!_?-])[A-Za-z\d!_?-]{8,20}$/;

        if (!nameRegex.test(name)) {
            alert('Имя должно содержать имя и фамилию: только кириллицу, пробелы и тире.');
            return;
        }
        if (!emailRegex.test(email)) {
            alert('Введите корректный email.');
            return;
        }
        if (!passwordRegex.test(password)) {
            alert('Введите корректный пароль, содержащий 1 цифру, 1 заглавную и 1 строчную букву, и спецсимвол !?_-');
            return;
        }
        if (!phoneRegex.test(phone)) {
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

        var answers = {
            A1: name,
            A2: email,
            A3: password,
            A4: phone,
            A5: city,
            A6: dob,
            A7: department,
            A8: selectedSubjects
        };

        console.log(answers);

        alert('Регистрация завершена!');
    });

    // Обработчик изменения департамента
    document.getElementById('department').addEventListener('change', function () {
        const selectedDepartment = this.value;
        const subjectSection = document.getElementById('subjectSection');
        const checkboxes = document.querySelectorAll('#subjectCheckboxes .form-check');

        // Скрываем секцию с предметами по умолчанию
        subjectSection.style.display = selectedDepartment ? 'block' : 'none';

        // Скрываем все чекбоксы
        checkboxes.forEach(checkbox => checkbox.style.display = 'none');

        // Показываем чекбоксы, относящиеся к выбранному департаменту
        if (selectedDepartment) {
            document.querySelectorAll(`.department-${selectedDepartment.toLowerCase()}`)
                .forEach(checkbox => checkbox.style.display = 'block');
        }
    });
});
