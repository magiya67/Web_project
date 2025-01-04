const edited_applications = [
  { id: 1, name: 'Заявка №1' },
  { id: 2, name: 'Заявка №2' }
];

const subscriptions = [
  { id: 1, name: 'Подписка на курс "Математика"' },
  { id: 2, name: 'Подписка на курс "Программирование"' }
];

const university_news = [
  { id: 1, title: 'Обновление расписания лекций' },
  { id: 2, title: 'Конференция по ИИ в следующем месяце' }
];

const Notifications = () => {
    return (
        <div className="card">
            <div 
                className="card-header" 
                style={{ backgroundColor: "rgb(4, 68, 54)", color: "white" }}
            >
                <h2 className="h5 mb-0">Ваш прогресс:</h2>
            </div>
            <div className="card-body">
                {edited_applications.map((application) => (
                    <div key={application.id} className="mb-2">
                        <p>Добавлено изменение по вашей заявке "{application.name}".</p>
                        <a href="#" className="btn btn-sm" style= {{backgroundColor:"rgb(255, 140, 0)", color: "white"}}>Посмотреть</a>
                    </div>
                ))}
            </div>
        </div>
    );
  };
  

const Subscriptions = () => {
  return (
      <div>
          {subscriptions.map((subscription) => (
              <div key={subscription.id} className="item-container">
                  <p>{subscription.name}</p>
              </div>
          ))}
      </div>
  );
};

const News = () => {
  return (
    <div className="card">
    <div 
        className="card-header" 
        style={{ backgroundColor: "rgb(4, 68, 54)", color: "white" }}
    >
              <h2 className="h5 mb-0">Новости университета:</h2>
          </div>
          <div className="card-body">
              {university_news.map((newsItem) => (
                  <p key={newsItem.id}>{newsItem.title}</p>
              ))}
          </div>
      </div>
  );
};

// Рендеринг компонентов
ReactDOM.render(<Notifications />, document.getElementById('notifications'));
ReactDOM.render(<Subscriptions />, document.getElementById('subscriptions-list'));
ReactDOM.render(<News />, document.getElementById('news'));

// Добавление новой подписки
document.getElementById('add-subscription').addEventListener('click', () => {
  const newSubscription = { id: subscriptions.length + 1, name: `Новая подписка #${subscriptions.length + 1}` };
  subscriptions.push(newSubscription);
  ReactDOM.render(<Subscriptions />, document.getElementById('subscriptions-list'));
});
