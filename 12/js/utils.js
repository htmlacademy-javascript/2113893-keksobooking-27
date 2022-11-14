// Модуль вспомогательных функций

const ALERT_SHOW_TIME = 5000;

// Получить склонение слова
const getDeclension = (number, declensions) => {
  number = Math.abs(number) % 100;
  const n = number % 10;
  if (number > 10 && number < 20) {
    return declensions[2];
  }
  if (n > 1 && n < 5) {
    return declensions[1];
  }
  if (n === 1) {
    return declensions[0];
  }
  return declensions[2];
};

// Функция вывода сообщения на красном фоне

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

// Сообщение, если при загрузке данных с сервера произошла ошибка запроса
const onError = () => showAlert('Что-то пошло не так... попробуйте ещё раз');

// Проверяем нажатие клавиши Escape
const isEscapeKey = (evt) => evt.key === 'Escape';

// Ставим задержку setTimeout перед исполнением функции cb
const debounce = (cb, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => cb.apply(this, rest), timeoutDelay);
  };
};

export {
  getDeclension,
  onError,
  isEscapeKey,
  debounce,
};
