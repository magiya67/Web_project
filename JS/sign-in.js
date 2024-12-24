const users = [
    { id: 1, username: 'zhakatvin', password: '11111Zh!' },
    { id: 2, username: 'zhopa', password: '11111Zh!'},
    { id: 3, username: 'artem', password: '11111Zh!'}
  ];
document.addEventListener("DOMContentLoaded", function () {
    document.querySelector('form').addEventListener('submit', function (event) {
        event.preventDefault();
        var username = document.getElementById("username").value.trim();
        var password = document.getElementById("password").value.trim();
        var user = users.find(function (user) {
            return user.username === username && user.password === password;
        });
        
        if (user) {
            alert('Пользователь найден!');
            window.location.href = 'index.html';

        } else {
            alert('Неверный username или пароль.');
        }
    });
});