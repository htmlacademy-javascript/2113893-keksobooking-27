// Количество объявлений
const CARDS_COUNT = 10;

// Количество аватарок
const avatarNumberMax = 10;

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

// Случайное целое число
const getRoundInteger = (min, max) => {
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
const getFloatNumber = (min, max, decimals) => {
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

// Получить случайный элемент массива без повторов
const getRandomArrayElementAndDeleteElement = (array) => {
  const currentArrayElementNumber = getRoundInteger(0, array.length - 1);
  const currentArrayElement = array[currentArrayElementNumber];
  array.splice(currentArrayElementNumber, 1);
  return currentArrayElement;
};

// Генерим данные для карточки объявления
const createCard = () => {

  // Преимущества и особенности жилья
  const OFFER_FEATURES_ARRAY = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  const OFFER_FEATURES_MIN = 0;
  const createFeature = () => getRandomArrayElementAndDeleteElement(OFFER_FEATURES_ARRAY);

  // Описание жилья
  const OFFER_DESCRIPTION_ARRAY = [
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
  ];
  const OFFER_DESCRIPTION_MIN = 1;
  const createDescription = () => getRandomArrayElementAndDeleteElement(OFFER_DESCRIPTION_ARRAY);

  // Фото жилья
  const OFFER_PHOTOS_ARRAY = [
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
  ];
  const OFFER_PHOTOS_MIN = 1;
  const createPhoto = () => getRandomArrayElementAndDeleteElement(OFFER_PHOTOS_ARRAY);

  // Координаты, высота и долгота
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
      description: Array.from({length: getRoundInteger(OFFER_DESCRIPTION_MIN, OFFER_DESCRIPTION_ARRAY.length)}, createDescription).join(' '),
      photos: Array.from({length: getRoundInteger(OFFER_PHOTOS_MIN, OFFER_PHOTOS_ARRAY.length)}, createPhoto)
    },
    location: {
      lat: latitude,
      lng: longitude
    }};
};

// Создаём массив из объявлений
const cardsArray = Array.from({length: CARDS_COUNT}, createCard);

cardsArray();
