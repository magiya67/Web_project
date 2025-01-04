// Пример массива заявок
const requests = [
    {
        id: 1,
        grade: "5",
        title: "Тема 1",
        teacher: "Преподаватель 1",
        text: "Текст заявки 1",
        file: "файл1.pdf"
    },
    {
        id: 2,
        grade: "4",
        title: "Тема 2",
        teacher: "Преподаватель 2",
        text: "Текст заявки 2",
        file: "файл2.pdf"
    }
];

// Элементы
const requestsList = document.getElementById("requestsList");
const requestDetails = document.getElementById("requestDetails");
const requestNumber = document.getElementById("requestNumber");
const requestTitle = document.getElementById("requestTitle");
const teacherInput = document.getElementById("teacher");
const requestText = document.getElementById("requestText");
const fileAttachment = document.getElementById("fileAttachment");
const requestGrade = document.getElementById("requestGrade");
const deleteRequestBtn = document.getElementById("deleteRequestBtn");

// Создать кнопку закрытия формы
const closeRequestBtn = document.createElement("button");
closeRequestBtn.textContent = "✖ Закрыть";
closeRequestBtn.className = "btn btn-secondary";
closeRequestBtn.style.float = "right"; 
closeRequestBtn.style.marginBottom = "10px"; 
closeRequestBtn.onclick = () => {
    requestDetails.style.display = "none"; // Скрыть форму
};
requestDetails.prepend(closeRequestBtn); // Добавить кнопку в начало формы

// Загрузка списка заявок
function loadRequests() {
    requestsList.innerHTML = ""; // Очистить текущий список
    requests.forEach(request => {
        const requestButton = document.createElement("button");
        requestButton.className = "btn btn-primary";
        requestButton.textContent = `Заявка #${request.id}`;
        requestButton.style.marginBottom = "10px";
        requestButton.onclick = () => showRequest(request.id); // Отобразить заявку при нажатии
        requestsList.appendChild(requestButton);
    });
}

// Показать заявку
function showRequest(id) {
    const request = requests.find(r => r.id === id);
    if (!request) return;

    // Заполнить форму данными заявки
    requestDetails.style.display = "block";
    requestNumber.textContent = `Заявка #${request.id}`;
    requestTitle.value = request.title;
    teacherInput.value = request.teacher;
    requestText.value = request.text;
    fileAttachment.value = request.file;
    requestGrade.value = request.grade;

    // Установить действие для кнопки удаления
    deleteRequestBtn.onclick = () => deleteRequest(id);
}

// Удалить заявку
function deleteRequest(id) {
    const index = requests.findIndex(r => r.id === id);
    if (index !== -1) {
        requests.splice(index, 1); // Удалить заявку из массива
        requestDetails.style.display = "none"; // Скрыть форму
        loadRequests(); // Перезагрузить список заявок
    }
}

// Добавить новую заявку
document.getElementById("addRequestBtn").onclick = () => {
    const newId = requests.length ? requests[requests.length - 1].id + 1 : 1; // Новый ID
    const newRequest = {
        id: newId,
        grade: "",
        title: "",
        teacher: "",
        text: "",
        file: ""
    };
    requests.push(newRequest); // Добавить новую заявку в массив
    showRequest(newId); // Открыть форму для новой заявки
    makeFormEditable(); // Сделать форму редактируемой
    loadRequests(); // Перезагрузить список заявок
};

// Сделать форму редактируемой
function makeFormEditable() {
    requestTitle.disabled = false;
    teacherInput.disabled = false;
    requestText.disabled = false;
    fileAttachment.disabled = false;
    requestGrade.disabled = false;

    // Добавить кнопку "Сохранить"
    const saveRequestBtn = document.createElement("button");
    saveRequestBtn.textContent = "💾 Сохранить";
    saveRequestBtn.className = "btn btn-success";
    saveRequestBtn.style.marginTop = "10px";
    saveRequestBtn.id = "saveRequestBtn";
    saveRequestBtn.onclick = saveRequest;

    // Удалить предыдущую кнопку "Сохранить", если она есть
    const prevSaveBtn = document.getElementById("saveRequestBtn");
    if (prevSaveBtn) prevSaveBtn.remove();

    requestDetails.appendChild(saveRequestBtn);
}

// Сохранить изменения в заявке
function saveRequest() {
    const id = parseInt(requestNumber.textContent.split("#")[1]);
    const request = requests.find(r => r.id === id);
    if (!request) return;

    // Сохранить изменения в массиве заявок
    request.title = requestTitle.value;
    request.teacher = teacherInput.value;
    request.text = requestText.value;
    request.file = fileAttachment.value;
    request.grade = requestGrade.value;

    loadRequests(); // Перезагрузить список заявок
    alert("Заявка успешно сохранена!");
}

// Инициализация
loadRequests();
