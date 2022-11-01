// Модуль валидации объявления

const formNode = document.querySelector('.ad-form');
const titleNode = formNode.querySelector('#title');
const typeNode = formNode.querySelector('#type');
const priceNode = formNode.querySelector('#price');
const roomsNode = formNode.querySelector('#room_number');
const capacityNode = formNode.querySelector('#capacity');
const checkInNode = formNode.querySelector('#timein');
const checkOutNode = formNode.querySelector('#timeout');

const TITLE = {
  LENGTH_MIN: 30,
  LENGTH_MAX: 100,
};

const PRICE = {
  MIN: {
    bungalow: 0,
    flat: 1000,
    hotel: 3000,
    house: 5000,
    palace: 10000,
  },
  MAX: 100000,
};

const ROOMS = {
  MIN: '0',
  MAX: '100',
};

const CAPACITY_NULL = '0';

const pristine = new Pristine(
  formNode,
  {
    classTo: 'ad-form__element',
    errorClass: 'ad-form__element--invalid',
    errorTextParent: 'ad-form__element',
  },
  true
);

// Проверяем поле с заголовком объявления
const validateTitle = (value) => value.length >= TITLE.LENGTH_MIN && value.length <= TITLE.LENGTH_MAX;

const getTitleErrorMessage = () => `Укажите заголовок длиной от ${TITLE.LENGTH_MIN} до ${TITLE.LENGTH_MAX} символов`;

// Добавляем влияние типа жилья на placeholder цены за ночь
const onTypeChange = () => {
  priceNode.placeholder = PRICE.MIN[typeNode.value];
  pristine.validate(priceNode);
};

// Проверяем поле цены за ночь
const validatePrice = (value) => value >= PRICE.MIN[typeNode.value] && value <= PRICE.MAX;

const getPriceErrorMessage = () => `Укажите цену от ${PRICE.MIN[typeNode.value]} до ${PRICE.MAX}`;

// Синхронизируем поля «Время заезда» и «Время выезда»
const onCheckInChange = () => {
  checkOutNode.value = checkInNode.value;
};
const onCheckOutChange = () => {
  checkInNode.value = checkOutNode.value;
};

// Проверка количества комнат
const validateRooms = () => roomsNode.value === ROOMS.MAX ? capacityNode.value === CAPACITY_NULL : Number(roomsNode.value) >= Number(capacityNode.value);

const getRoomsErrorMessage = () => {
  if (roomsNode.value === ROOMS.MAX && capacityNode.value !== CAPACITY_NULL) {
    return 'Выберите вариант "не для гостей"';
  }
};

// Проверка количества гостей
const validateCapacity = () => capacityNode.value === CAPACITY_NULL ? roomsNode.value === ROOMS.MAX : Number(roomsNode.value) >= Number(capacityNode.value);

const getCapacityErrorMessage = () => capacityNode.value === CAPACITY_NULL && roomsNode.value !== ROOMS.MAX ? 'Выберите вариант "100 комнат"' : 'Добавьте комнат';

// Синхронизируем проверку количества комнат и гостей
const onRoomsandCapacityChange = () => {
  pristine.validate(roomsNode);
  pristine.validate(capacityNode);
};


// Объединяем проверку полей в единую функцию
const validateEstateForm = () => {
  pristine.addValidator(titleNode, validateTitle, getTitleErrorMessage);
  pristine.addValidator(priceNode, validatePrice, getPriceErrorMessage);
  pristine.addValidator(roomsNode, validateRooms, getRoomsErrorMessage);
  pristine.addValidator(capacityNode, validateCapacity, getCapacityErrorMessage);


  typeNode.addEventListener('change', onTypeChange);
  capacityNode.addEventListener('change', onRoomsandCapacityChange);
  roomsNode.addEventListener('change', onRoomsandCapacityChange);
  checkInNode.addEventListener('change', onCheckInChange);
  checkOutNode.addEventListener('change', onCheckOutChange);

  pristine.validate();
};

// Проверяем форму вместо отправки
formNode.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

export {
  validateEstateForm,
};

/* блок для отрисовки сообщений результатов отправки формы, на будущее
evt.preventDefault();
if (pristine.validate()) {
  console.log('Можно отправлять');
  return;
}
console.log('Форма невалидна');
});
*/
