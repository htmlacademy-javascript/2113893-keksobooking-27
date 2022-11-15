// Модуль вспомогательных функций

// Проверяем нажатие клавиши Escape
const isEscapeKey = (evt) => evt.key === 'Escape';

// Ставим задержку setTimeout перед исполнением функции cb
const debounce = (cb, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => cb(...rest), timeoutDelay);
  };
};

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

export {
  getDeclension,
  isEscapeKey,
  debounce,
};
