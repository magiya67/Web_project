document.addEventListener("DOMContentLoaded", function () {
    var phoneInput = document.getElementById('phone');
    var im = new Inputmask("+7 (999) 999-99-99", { "clearIncomplete": true });
    im.mask(phoneInput);

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    var maxDate = `${yyyy}-${mm}-${dd}`;
    document.getElementById('dob').setAttribute('max', maxDate);

    document.querySelector('form').addEventListener('submit', function (event) {
        event.preventDefault();

        var name = document.getElementById('name').value.trim();
        var email = document.getElementById('email').value.trim();
        var password = document.getElementById('password').value.trim();
        var phone = document.getElementById('phone').value.trim();
        var city = document.getElementById('city').value;
        var dob = document.getElementById('dob').value;

        var nameRegex = /^[А-ЯЁ][а-яё]+(?:\s[А-ЯЁ][а-яё]+)?$/;
        var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        var phoneRegex = /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;
        var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!_?-])[A-Za-z\d!_?-]{8,20}$/;
        
        if (!nameRegex.test(name)) {
            alert('Имя должно содержать только кириллицу, пробелы и тире.');
            return;
        }
        if (!emailRegex.test(email)) {
            alert('Введите корректный email.');
            return;
        }
        if (!passwordRegex.test(password)){
            alert('Введите корректный пароль, содержащий 1 цифру, 1 заглавную и 1 строчную букву, и спецсивол !?_-');
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

        var answers = {
            A1: name,
            A2: email,
            A3: password,
            A4: phone,
            A5: city,
            A6: dob
        };

        console.log(answers);

        alert('Регистрация завершена!');
    });
});
