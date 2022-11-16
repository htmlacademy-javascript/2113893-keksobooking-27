// Модуль валидации объявления

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

const formNode = document.querySelector('.ad-form');
const titleNode = formNode.querySelector('#title');
const typeNode = formNode.querySelector('#type');
const priceNode = formNode.querySelector('#price');
const roomsNode = formNode.querySelector('#room_number');
const capacityNode = formNode.querySelector('#capacity');
const fieldsetTimeNode = formNode.querySelector('.ad-form__element--time');
const checkInNode = formNode.querySelector('#timein');
const checkOutNode = formNode.querySelector('#timeout');

const pristine = new Pristine(
  formNode,
  {
    classTo: 'ad-form__element',
    successClass: 'ad-form__element--valid',
    errorClass: 'ad-form__element--invalid',
    errorTextParent: 'ad-form__element',
  },
  true,
);

// Переводим на русский язык сообщения об ишибках (для адреса)
Pristine.addMessages('ru', {
  required: 'Обязательное поле'
});
Pristine.setLocale('ru');

// Проверяем поле с заголовком объявления
const validateTitle = (value) => value.length >= Title.LENGTH_MIN && value.length <= Title.LENGTH_MAX;

const getTitleErrorMessage = () => `Укажите заголовок длиной от ${Title.LENGTH_MIN} до ${Title.LENGTH_MAX} символов`;

// Добавляем влияние типа жилья на placeholder цены за ночь
const onTypeChange = () => {
  priceNode.placeholder = Price.MIN[typeNode.value];
  pristine.validate(priceNode);
};

// Проверяем поле цены за ночь
const validatePrice = (value) => value >= Price.MIN[typeNode.value] && value <= Price.MAX;

const getPriceErrorMessage = () => `Укажите цену от ${Price.MIN[typeNode.value]} до ${Price.MAX}`;

const onPriceChange = () => pristine.validate(priceNode);

// Синхронизируем поля «Время заезда» и «Время выезда»
const syncTimes = (evt) => {
  const targetNode = evt.target.id === 'timein' ? checkOutNode : checkInNode;
  targetNode.value = evt.target.value;
};

// Проверка количества комнат и гостей
const validateRoomsAndCapacity = () => CAPACITY_TO_ROOMS_MATCH[capacityNode.value].includes(roomsNode.value);

const getRoomsErrorMessage = () => {
  if (Number(roomsNode.value) === ROOMS_MAX && capacityNode.value !== CAPACITY_ZERO) {
    return 'Выберите вариант "не для гостей"';
  }
};

const getCapacityErrorMessage = () => capacityNode.value === CAPACITY_ZERO && Number(roomsNode.value) !== ROOMS_MAX ? 'Выберите вариант "100 комнат"' : 'Добавьте комнат';

// Синхронизируем проверку количества комнат и гостей
const onRoomsandCapacityChange = () => {
  pristine.validate(roomsNode);
  pristine.validate(capacityNode);
};

// Объединяем проверку полей в единую функцию
const intitFormValidation = () => {
  pristine.addValidator(titleNode, validateTitle, getTitleErrorMessage);
  pristine.addValidator(priceNode, validatePrice, getPriceErrorMessage);
  pristine.addValidator(roomsNode, validateRoomsAndCapacity, getRoomsErrorMessage);
  pristine.addValidator(capacityNode, validateRoomsAndCapacity, getCapacityErrorMessage);

  priceNode.addEventListener('change', onPriceChange);
  typeNode.addEventListener('change', onTypeChange);
  capacityNode.addEventListener('change', onRoomsandCapacityChange);
  roomsNode.addEventListener('change', onRoomsandCapacityChange);
  fieldsetTimeNode.addEventListener('change', syncTimes);
};

export {
  intitFormValidation,
  pristine,
  priceNode,
  formNode,
  Price,
};
