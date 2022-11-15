// Модуль с настройками и константами

// Адрес сервера
const SERVER_URL = 'https://27.javascript.pages.academy/keksobooking';

// Настройки карты
const MapSetup = {
  DEFAULT: {
    LAT: 35.68,
    LNG: 139.75,
  },
  SCALE : 13,
  TILE: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  ATTRIBUTION: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
};

// Настройки меток
const PinSetup = {
  DEFAULT: {
    URL: './img/pin.svg',
    SIZE: 40,
  },
  MAIN: {
    URL: './img/main-pin.svg',
    SIZE: 52,
    DECIMALS: 5,
  },
  ANCHOR_DIVIDER: 2,
  MAX_QTY: 10,
};

// Требования к заголовку объявления
const Title = {
  LENGTH_MIN: 30,
  LENGTH_MAX: 100,
};

// Цены на жильё
const Price = {
  MIN: {
    bungalow: 0,
    flat: 1000,
    hotel: 3000,
    house: 5000,
    palace: 10000,
  },
  MAX: 100000,
};

// Соответствие между числом гостей (слева) и числом комнат
const CAPACITY_TO_ROOMS_MATCH = {
  0: ['100'],
  1: ['1', '2', '3'],
  2: ['2', '3'],
  3: ['3'],
};

// Значение числа комнат для варианта ёмкости "не для всех"
const ROOMS_MAX = 100;

// Значение ёмкости жилья при выборе варианта "не для всех"
const CAPACITY_ZERO = '0';

// Задержка отправки запроса на новые карточки, после выбора фильтров, мс
const RERENDER_DELAY = 500;

// Значение фильтра искомого жилья по умолчанию
const FILTER_DEFAULT_VALUE = 'any';

// Диапазоны цен искомого жилья
const OffersPriceToRange = {
  LOW: {
    MIN: 0,
    MAX: 10000,
  },
  MIDDLE: {
    MIN: 10000,
    MAX: 50000,
  },
  HIGH: {
    MIN: 50000,
    MAX: Price.MAX,
  },
};

// Поддерживаемые типы изображений
const IMG_TYPES = ['jpg', 'jpeg', 'png', 'webp', 'avif'];

// Склонения
const Declensions = {
  GUESTS: ['гостя', 'гостей', 'гостей'],
  ROOMS: ['комната', 'комнаты', 'комнат'],
};

// Словарик типов жилья
const typeEngToRu = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

// Настройки слайдера
const SliderSetup = {
  START: 0,
  STEP: 100,
  RANGE: {
    MIN: 0,
    MAX: 100000
  },
  DECIMALS: 0,
  CONNECT: 'upper',
};

export {
  SERVER_URL,
  RERENDER_DELAY,
  OffersPriceToRange,
  FILTER_DEFAULT_VALUE,
  ROOMS_MAX,
  CAPACITY_TO_ROOMS_MATCH,
  CAPACITY_ZERO,
  Title,
  Price,
  IMG_TYPES,
  MapSetup,
  PinSetup,
  Declensions,
  typeEngToRu,
  SliderSetup,
};
