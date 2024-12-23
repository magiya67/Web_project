const users = [
    { id: 1, login: 'zhakatvin', password: '11111Zh!' },
    { id: 2, login: 'zhopa', password: '11111Zh!'},
    { id: 3, login: 'artem', password: '11111Zh!'}
  ];
document.addEventListener("DOMContentLoaded", function () {
    document.querySelector('form').addEventListener('submit', function (event) {
        event.preventDefault();
        var login = document.getElementById("login").value.trim();
        var password = document.getElementById("password").value.trim();
        var user = users.find(function (user) {
            return user.login === login && user.password === password;
        });
        
        if (user) {
            alert('Пользователь найден!');
            window.location.href = 'index.html';

        } else {
            alert('Неверный login или пароль.');
        }
    });
});