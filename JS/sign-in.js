const users = [
    { id: 1, email: 'zhakatvin@gmail.com', password: '11111Zh!' },
    { id: 2, email: 'zhopa@gmail.com', password: '11111Zh!'},
    { id: 3, email: 'artem@gmail.com', password: '11111Zh!'}
  ];
document.addEventListener("DOMContentLoaded", function () {
    document.querySelector('form').addEventListener('submit', function (event) {
        event.preventDefault();
        var email = document.getElementById("email").value.trim();
        var password = document.getElementById("password").value.trim();
        var user = users.find(function (user) {
            return user.email === email && user.password === password;
        });
        
        if (user) {
            alert('Пользователь найден!');
            window.location.href = 'index.html';

        } else {
            alert('Неверный email или пароль.');
        }
    });
});