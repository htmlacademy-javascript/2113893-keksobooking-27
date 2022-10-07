// Количество объявлений
const CARDS_COUNT = 3;
// Количество аватарок
const avatarNumberMax = 3;
// Массив свободных номеров под аватарки
const avatarNumbers = [];
for (let i = 1; i <= avatarNumberMax; ++i) {
  avatarNumbers.push(i);
}
avatarNumbers.sort(()=>Math.random() - 0.5);
// Названия объявлений
const TITLES = [
  'Прекрасная вилла',
  'Жалкая лачуга',
  'Квартирка',
  'Хоромы',
  'Особняк олигарха'
];
// Случайное целое число
const getRoundInteger = (min, max) => {
  if (min < 0 || max < 0 || !Number.isFinite(min) || !Number.isFinite(min)) {
    return NaN;
  } else if (min === 0 && max === 0) {
    return 0;
  } else if (min > max) {
    [min,max] = [max,min];
  }
  return Math.floor(Math.random() * (max - min + 1) ) + min;
};
//Cлучайное дробное число, decimals - число знаков после запятой
const getFloatNumber = (min, max, decimals) => {
  if (min < 0 || max < 0 || decimals < 0 || !Number.isFinite(min) || !Number.isFinite(min) || !Number.isFinite(decimals)) {
    return NaN;
  } else if (min === 0 && max === 0) {
    return 0;
  } else if (min > max) {
    [min,max] = [max,min];
  }
  return +((Math.random() * (max - min)) + min).toFixed(decimals);
};
// Случайный элемент массива
const getRandomArrayElement = (elements) => elements[getRoundInteger(0, elements.length - 1)];
// Случайная аватарка
const getAvatar = () => {
  let avatarNumber = avatarNumbers[0];
  avatarNumbers.splice(0, 1);
  if (avatarNumber < 10) {
    avatarNumber = `0${String(avatarNumber)}`;
  }
  return `img/avatars/user${avatarNumber}.png`;
};
// Генерим данные для карточки объявления
const createCard = () => {
  const latitude = getFloatNumber(35.65000, 35.70000, 5);
  const longitude = getFloatNumber(139.70000, 139.80000, 5);
  return {
    author: {avatar: getAvatar()},
    offer: {
      title: getRandomArrayElement(TITLES),
      address: `${latitude}, ${longitude}`,
      price: `${getRoundInteger(1, 100)} млн ₽`
    },
    location: {
      lat: latitude,
      lng: longitude
    }};
};
// Создаём массив из объявлений
const cardsArray = Array.from({length: CARDS_COUNT}, createCard);

console.log(cardsArray);

/*
Случайная аватарка
const getAvatar = (max) => {
  let avatarNumber = getRoundInteger(1, max);
  avatarNumbers.splice(avatarNumber - 1, 1);
  --avatarNumberMax;
  if (avatarNumber < 10) {
    avatarNumber = `0${String(avatarNumber)}`;
  }
  return `img/avatars/user${avatarNumber}.png`;
};

ДЗ 2, функция 2, краткая запись

function getFloatNumber (min, max, decimals) {
  return (min < 0 || max < 0 || decimals < 0 || !Number.isFinite(min) || !Number.isFinite(min) || !Number.isFinite(decimals)) ? 'NaN' :
    (min === 0 && max === 0) ? 0 :
    (min > max) ? +((Math.random() * (min - max + 1)) + max).toFixed(decimals) :
    +((Math.random() * (max - min + 1)) + min).toFixed(decimals);
}
getFloatNumber(0, 0, 5);

ДЗ 2, функция 2, развёрнутая запись

const getFloatNumber = (min, max, decimals) => {
  if (min < 0 || max < 0 || decimals < 0 || !Number.isFinite(min) || !Number.isFinite(min) || !Number.isFinite(decimals)) {
    return 'NaN';
  } else if (min > max) {
    return +((Math.random() * (min - max + 1)) + max).toFixed(decimals);
  } else if (min === 0 && max === 0) {
    return 0;
  }
  return +((Math.random() * (max - min + 1)) + min).toFixed(decimals);
};

getFloatNumber(0, 0, 5);

ДЗ 2, функция 1 краткая запись

function getRoundInteger (min, max) {
  return (min < 0 || max < 0 || !Number.isFinite(min) || !Number.isFinite(min)) ?  'NaN' :
  (min > max) ? Math.floor(Math.random() * (min - max + 1) ) + max:
  Math.floor(Math.random() * (max - min + 1) ) + min;
}
getRoundInteger(1, 10);

ДЗ 2, функция 1 развёрнутая запись

const getRoundInteger = (min, max) => {
  if (min < 0 || max < 0 || !Number.isFinite(min) || !Number.isFinite(min)) {
    return 'NaN';
  } else if (min === 0 && max === 0) {
    return 0;
  } else if (min > max) {
    [min,max] = [max,min];
  }
  return Math.floor(Math.random() * (max - min + 1) ) + min;
};

getRoundInteger(1, 10);

*/
