// Случайное целое число

const ALERT_SHOW_TIME = 5000;

const getRandomPositiveInteger = (min, max) => {
  if (min < 0 || max < 0 || !Number.isFinite(min) || !Number.isFinite(min)) {
    return NaN;
  } else if (min === max) {
    return min;
  } else if (min === 0 && max === 0) {
    return 0;
  } else if (min > max) {
    [min,max] = [max,min];
  }
  return Math.floor(Math.random() * (max - min + 1) ) + min;
};

//Cлучайное дробное число, decimals - число знаков после запятой
const getRandomPositiveFloat = (min, max, decimals) => {
  if (min < 0 || max < 0 || decimals < 0 ||
    !Number.isFinite(min) || !Number.isFinite(min) || !Number.isFinite(decimals)) {
    return NaN;
  } else if (min === max) {
    return min;
  } else if (min === 0 && max === 0) {
    return 0;
  } else if (min > max) {
    [min,max] = [max,min];
  }
  return +((Math.random() * (max - min)) + min).toFixed(decimals);
};

// Случайный элемент массива
const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

// Получить массив случайной длины, от 0 до arrayMinLength
const getRandomArraySlice = (arrayMinLength, array) => array.slice(0, getRandomPositiveInteger(arrayMinLength, array.length));

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
const onError = () => showAlert('Сервер не отвечает, попробуйте ещё раз');

// Проверяем нажатие клавиши Escape
const isEscapeKey = (evt) => evt.key === 'Escape';

export {
  getRandomPositiveInteger,
  getRandomPositiveFloat,
  getRandomArrayElement,
  getRandomArraySlice,
  getDeclension,
  showAlert,
  onError,
  isEscapeKey,
};
