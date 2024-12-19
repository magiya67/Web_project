const edited_applications = [
    { id: 1, name: 'Заявка №1' },
    { id: 2, name: 'Заявка №2' },
    { id: 3, name: 'Заявка №3' }
  ];
  const Notifications = () => {
    return (
      <div>
        {edited_applications.map((application) => (
          <div key={application.id} className="notification">
            <p>Добавлено изменение по вашей заявке "{application.name}".</p>
            <a href="#" className="view-button">Посмотреть</a>
          </div>
        ))}
      </div>
    );
  };
  
  ReactDOM.render(
    <Notifications />,
    document.getElementById('notifications')
  );