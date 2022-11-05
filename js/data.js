import {
  getRandomPositiveInteger,
  getRandomPositiveFloat,
  getRandomArrayElement,
  getRandomArraySlice
} from './utils.js';

// Количество объявлений
const CARDS_COUNT = 10;

// Количество цифр в номере аватарки, используется для добавления ведущих нолей, если номер от 1 до 9
const AVATAR_DIGITS = 2;

// Названия объявлений
const TITLES = ['Прекрасная вилла', 'Жалкая лачуга', 'Квартирка', 'Хоромы', 'Особняк олигарха'];

// Стоимость генерируемого жилья, минимальная и максимальрная
const PRICE = {
  MIN: 1000,
  MAX: 10000,
};

// Тип жилья
const TYPE = ['palace', 'flat', 'house', 'bungalow', 'hotel'];

// Число комнат, минимальное и максимальное
const ROOM = {
  MIN: 1,
  MAX: 10,
};

// Число гостей, минимальное и максимальное
const GUEST = {
  MIN: 1,
  MAX: 20,
};

// Часы заезда/выезда
const CHECKIN_CHECKOUT_TIMES = ['12:00', '13:00', '14:00'];

// Преимущества и особенности жилья
const FEATURE = {
  MIN: 1,
  FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
};

// Описание жилья
const DESCRIPTION = {
  MIN: 1,
  DESCRIPTIONS: [
    'Жильё оборудовано бытовой техникой.',
    'Просторная спальня, большая кухня.',
    'Квартира находится на среднем этаже.',
    'Выгодная планировка.',
    'Приятный ремонт.',
    'Я здесь вырос и люблю жильё всей душой.',
    'Очень хорошая энергетика.',
  ],
};

// Фото жилья
const PHOTO = {
  MIN: 1,
  PHOTOS: [
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
  ],
};

// Диапазоны под координаты жилья, DECIMALS - число знаков после запятой
const LOCATION = {
  DECIMALS: 5,
  LATITUDE_MIN: 35.65000,
  LATITUDE_MAX: 35.70000,
  LONGITUDE_MIN: 139.70000,
  LONGITUDE_MAX: 139.80000,
};

// Генерим данные для карточки объявления
const getCard = (index) => {

  // Координаты текущего объявления, высота и долгота
  const latitude = getRandomPositiveFloat(LOCATION.LATITUDE_MIN, LOCATION.LATITUDE_MAX, LOCATION.DECIMALS);
  const longitude = getRandomPositiveFloat(LOCATION.LONGITUDE_MIN, LOCATION.LONGITUDE_MAX, LOCATION.DECIMALS);

  return {
    author: {avatar: `img/avatars/user${index.toString().padStart(AVATAR_DIGITS, '0')}.png`},
    offer: {
      title: getRandomArrayElement(TITLES),
      address: `${latitude}, ${longitude}`,
      price: getRandomPositiveInteger(PRICE.MIN, PRICE.MAX),
      type: getRandomArrayElement(TYPE),
      rooms: getRandomPositiveInteger(ROOM.MIN, ROOM.MAX),
      guests: getRandomPositiveInteger(GUEST.MIN, GUEST.MAX),
      checkin: getRandomArrayElement(CHECKIN_CHECKOUT_TIMES),
      checkout: getRandomArrayElement(CHECKIN_CHECKOUT_TIMES),
      features: getRandomArraySlice(FEATURE.MIN, FEATURE.FEATURES),
      description: getRandomArraySlice(DESCRIPTION.MIN, DESCRIPTION.DESCRIPTIONS).join(' '),
      photos: getRandomArraySlice(PHOTO.MIN, PHOTO.PHOTOS),
    },
    location: {
      lat: latitude,
      lng: longitude,
    },
  };
};

// Создаём массив из объявлений
const getCardsArray = () => Array.from({length: CARDS_COUNT}, (_, avatarIndex) => getCard(avatarIndex + 1));

export {getCardsArray};
