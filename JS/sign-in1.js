document.addEventListener("DOMContentLoaded", function () {
    document.querySelector('form').addEventListener('submit', function (event) {
        event.preventDefault();
        var username = document.getElementById("username").value.trim();
        var password = document.getElementById("password").value.trim();
        var answers = {
            username: username,
            password: password
         };
        console.log(answers);
        const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        fetch('', {  // Укажите URL представления
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

    });
});