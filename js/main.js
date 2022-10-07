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
const OFFER_TITLES_ARRAY = ['Прекрасная вилла', 'Жалкая лачуга', 'Квартирка', 'Хоромы', 'Особняк олигарха'];

// Стоимость генерируемого жилья, минимальная и максимальрная
const OFFER_PRICE_MIN = 1;
const OFFER_PRICE_MAX = 100;

// Тип жилья
const OFFER_TYPE_ARRAY = ['palace', 'flat', 'house', 'bungalow', 'hotel'];

// Число комнат, минимальное и максимальное
const OFFER_ROOMS_MIN = 1;
const OFFER_ROOMS_MAX = 100;

// Число гостей, минимальное и максимальное
const OFFER_GUESTS_MIN = 1;
const OFFER_GUESTS_MAX = 100;

// Часы заезда
const OFFER_CHECKIN_ARRAY = ['12:00', '13:00', '14:00'];
// Часы выезда
const OFFER_CHECKOUT_ARRAY = ['12:00', '13:00', '14:00'];

// Преимущества и особенности жилья
const OFFER_FEATURES_MIN = 1;
const OFFER_FEATURES_ARRAY = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

// Описание жилья

// Фото жилья, минимальное и максимальное их число + ссылки
const OFFER_PHOTOS_MIN = 1;
const OFFER_PHOTOS_MAX = 3;
const OFFER_PHOTOS_ARRAY = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

// Случайное целое число'
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
  if (min < 0 || max < 0 || decimals < 0 ||
    !Number.isFinite(min) || !Number.isFinite(min) || !Number.isFinite(decimals)) {
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
const createFeature = () => getRandomArrayElement(OFFER_FEATURES_ARRAY);
const createPhoto = () => getRandomArrayElement(OFFER_PHOTOS_ARRAY);
// Генерим данные для карточки объявления
const createCard = () => {
  const latitude = getFloatNumber(35.65000, 35.70000, 5);
  const longitude = getFloatNumber(139.70000, 139.80000, 5);
  return {
    author: {avatar: getAvatar()},
    offer: {
      title: getRandomArrayElement(OFFER_TITLES_ARRAY),
      address: `${latitude}, ${longitude}`,
      price: `${getRoundInteger(OFFER_PRICE_MIN, OFFER_PRICE_MAX)} млн ₽`,
      type: getRandomArrayElement(OFFER_TYPE_ARRAY),
      rooms: `${getRoundInteger(OFFER_ROOMS_MIN, OFFER_ROOMS_MAX)} комнат(ы)`,
      guests: `${getRoundInteger(OFFER_GUESTS_MIN, OFFER_GUESTS_MAX)} человек(а) разместятся с комфортом `,
      checkin: `${getRandomArrayElement(OFFER_CHECKIN_ARRAY)} время заезда`,
      checkout: `${getRandomArrayElement(OFFER_CHECKOUT_ARRAY)} время выезда`,
      features: Array.from({length: getRoundInteger(OFFER_FEATURES_MIN, OFFER_FEATURES_ARRAY.length)}, createFeature),
      description: ['test'],
      photos: Array.from({length: getRoundInteger(OFFER_PHOTOS_MIN, OFFER_PHOTOS_MAX)}, createPhoto)
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
  return (min < 0 || max < 0 || decimals < 0 ||
    !Number.isFinite(min) || !Number.isFinite(min) || !Number.isFinite(decimals)) ? 'NaN' :
    (min === 0 && max === 0) ? 0 :
    (min > max) ? +((Math.random() * (min - max + 1)) + max).toFixed(decimals) :
    +((Math.random() * (max - min + 1)) + min).toFixed(decimals);
}
getFloatNumber(0, 0, 5);

ДЗ 2, функция 2, развёрнутая запись

const getFloatNumber = (min, max, decimals) => {
  if (min < 0 || max < 0 || decimals < 0 ||
    !Number.isFinite(min) || !Number.isFinite(min) || !Number.isFinite(decimals)) {
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


const CARDS_COUNT = 3;
const OFFER_TITLES_ARRAY = ['Прекрасная вилла', 'Жалкая лачуга', 'Квартирка', 'Хоромы', 'Особняк олигарха'];
const OFFER_PRICE_MIN = 1;
const OFFER_PRICE_MAX = 100;
const OFFER_TYPE_ARRAY = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const OFFER_ROOMS_MIN = 1;
const OFFER_ROOMS_MAX = 100;
const OFFER_GUESTS_MIN = 1;
const OFFER_GUESTS_MAX = 100;
const OFFER_CHECKIN_ARRAY = ['12:00', '13:00', '14:00'];
const OFFER_CHECKOUT_ARRAY = ['12:00', '13:00', '14:00'];
const OFFER_FEATURES_MIN = 1;
const OFFER_FEATURES_ARRAY = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const OFFER_PHOTOS_MIN = 1;
const OFFER_PHOTOS_MAX = 5;
const OFFER_PHOTOS_ARRAY = ['1.jpg', '2.jpg', '3.jpg'];
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
const getFloatNumber = (min, max, decimals) => {
  if (min < 0 || max < 0 || decimals < 0 ||
    !Number.isFinite(min) || !Number.isFinite(min) || !Number.isFinite(decimals)) {
    return NaN;
  } else if (min === 0 && max === 0) {
    return 0;
  } else if (min > max) {
    [min,max] = [max,min];
  }
  return +((Math.random() * (max - min)) + min).toFixed(decimals);
};
const getRandomArrayElement = (elements) => elements[getRoundInteger(0, elements.length - 1)];
const createFeature = () => getRandomArrayElement(OFFER_FEATURES_ARRAY);
const createPhoto = () => getRandomArrayElement(OFFER_PHOTOS_ARRAY);
const createCard = () => {
  const latitude = getFloatNumber(35.65000, 35.70000, 5);
  const longitude = getFloatNumber(139.70000, 139.80000, 5);
  return {
    author: {avatar: getAvatar()},
    offer: {
      title: getRandomArrayElement(OFFER_TITLES_ARRAY),
      address: `${latitude}, ${longitude}`,
      price: `${getRoundInteger(OFFER_PRICE_MIN, OFFER_PRICE_MAX)} млн ₽`,
      type: getRandomArrayElement(OFFER_TYPE_ARRAY),
      rooms: `${getRoundInteger(OFFER_ROOMS_MIN, OFFER_ROOMS_MAX)} комнат(ы)`,
      guests: `Разместятся с комфортом ${getRoundInteger(OFFER_GUESTS_MIN, OFFER_GUESTS_MAX)} человек(а)`,
      checkin: `${getRandomArrayElement(OFFER_CHECKIN_ARRAY)} время заезда`,
      checkout: `${getRandomArrayElement(OFFER_CHECKOUT_ARRAY)} время выезда`,
      features: Array.from({length: getRoundInteger(OFFER_FEATURES_MIN, OFFER_FEATURES_ARRAY.length)}, createFeature),
      description: ['test'],
      photos: Array.from({length: getRoundInteger(OFFER_PHOTOS_MIN, OFFER_PHOTOS_MAX)}, createPhoto)
    },
    location: {
      lat: latitude,
      lng: longitude
    }};
};
*/
