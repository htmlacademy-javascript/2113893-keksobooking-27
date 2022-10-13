import {
  getRoundInteger,
  getFloatNumber,
  getRandomArrayElement,
  getRandomArraySlice
} from 'util.js';

// Количество объявлений
const CARDS_COUNT = 10;

// Количество цифр в номере аватарки, используется для добавления ведущих нолей, если номер от 1 до 9

const avatarDigits = 2;

// Названия объявлений
const TITLES = ['Прекрасная вилла', 'Жалкая лачуга', 'Квартирка', 'Хоромы', 'Особняк олигарха'];

// Стоимость генерируемого жилья, минимальная и максимальрная
const PRICE = {
  PRICES_MIN: 1,
  PRICES_MAX: 100,
};

// Тип жилья
const TYPE = ['palace', 'flat', 'house', 'bungalow', 'hotel'];

// Число комнат, минимальное и максимальное
const ROOM = {
  ROOMS_MIN: 1,
  ROOMS_MAX: 100,
};

// Число гостей, минимальное и максимальное
const GUEST = {
  GUESTS_MIN: 1,
  GUESTS_MAX: 100,
};

// Часы заезда/выезда
const CHECKIN_TIMES = ['12:00', '13:00', '14:00'];

// Преимущества и особенности жилья
const FEATURE = {
  FEATURES_MIN: 1,
  FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
};

// Описание жилья
const DESCRIPTION = {
  DESCRIPTIONS_MIN: 1,
  DESCRIPTIONS: [
    'Жильё оборудовано бытовой техникой.',
    'Просторная спальня, большая кухня.',
    'Квартира находится на среднем этаже.',
    'В доме чистые подъезды и лифты, добрые соседи.',
    'Выгодная планировка.',
    'Просторная и уютная лоджия с новыми стеклопакетами, отапливаемая.',
    'Дом в хорошем техническом состоянии, не старый.',
    'Приятный ремонт.',
    'Отдельно обговаривается продажа со всей мебелью.',
    'Удобное расположение позволит вам использовать все преимущества развитой инфраструктуры.',
    'Я здесь вырос и люблю жильё всей душой.',
    'Очень хорошая энергетика.',
  ],
};

// Фото жилья
const PHOTO = {
  PHOTOS_MIN: 1,
  PHOTOS: [
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
  ],
};

// Случайная аватарка
const getAvatar = (index) => `img/avatars/user${index.toString().padStart(avatarDigits, '0')}.png`;

// Генерим данные для карточки объявления
const getCard = (index) => {

  // Координаты, высота и долгота
  const latitude = getFloatNumber(35.65000, 35.70000, 5);
  const longitude = getFloatNumber(139.70000, 139.80000, 5);

  return {
    author: {avatar: getAvatar(index)},
    offer: {
      title: getRandomArrayElement(TITLES),
      address: `${latitude}, ${longitude}`,
      price: getRoundInteger(PRICE.PRICES_MIN, PRICE.PRICES_MAX),
      type: getRandomArrayElement(TYPE),
      rooms: getRoundInteger(ROOM.ROOMS_MIN, ROOM.ROOMS_MAX),
      guests: getRoundInteger(GUEST.GUESTS_MIN, GUEST.GUESTS_MAX),
      checkin: getRandomArrayElement(CHECKIN_TIMES),
      checkout: getRandomArrayElement(CHECKIN_TIMES),
      features: getRandomArraySlice(FEATURE.FEATURES_MIN, FEATURE.FEATURES),
      description: getRandomArraySlice(DESCRIPTION.DESCRIPTIONS_MIN, DESCRIPTION.DESCRIPTIONS).join(' '),
      photos:  getRandomArraySlice(PHOTO.PHOTOS_MIN, PHOTO.PHOTOS),
    },
    location: {
      lat: latitude,
      lng: longitude
    },
  };
};

// Создаём массив из объявлений
const getCardsArray = () => Array.from({length: CARDS_COUNT}, (_, avatarIndex) => getCard(avatarIndex + 1));

export {getCardsArray};
