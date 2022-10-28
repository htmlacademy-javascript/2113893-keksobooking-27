// Модуль валидации объявления

const form = document.querySelector('.ad-form');
const estatePrice = form.querySelector('#price');
const estateTitle = form.querySelector('#title');
const estateRooms = form.querySelector('#room_number');
const estateCapacity = form.querySelector('#capacity');
const timeCheckIn = form.querySelector('#timein');
const timeCheckOut = form.querySelector('#timeout');
const estateType = form.querySelector('#type');

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error-text',
});

// Проверяем поле с заголовком объявления
const validateTitle = (value) => value.length >= 30 && value.length <= 100;

pristine.addValidator(
  estateTitle,
  validateTitle,
  'Укажите заголовок длиной от 30 до 100 символов',
);

// Проверяем поле цены за ночь
const validatePrice = (value) => value >= 0 && value <= 100000;

pristine.addValidator(
  estatePrice,
  validatePrice,
  'Максимум 100 000'
);

// Синхронизируем поля «Время заезда» и «Время выезда»
const onCheckInChange = () => {
  timeCheckOut.value = timeCheckIn.value;
};

timeCheckIn.addEventListener('change', onCheckInChange);

const onCheckOutChange = () => {
  timeCheckIn.value = timeCheckOut.value;
};

timeCheckOut.addEventListener('change', onCheckOutChange);

// Добавляем влияние типа жилья на стоимость
const onEstateTypeChange = (type) => {
  if (type === 'bungalow') {
    estatePrice.placeholder = 0;
  }
};

estateType.addEventListener('change', onEstateTypeChange);

// Проверяем выбор числа гостей и комнат
const validateCapacityAndRooms = () => {
  if (estateRooms.value === '100') {
    return estateCapacity.value === '0';
  }
  if (estateCapacity.value === '0') {
    return estateRooms.value === '100';
  }
  return estateRooms.value >= estateCapacity.value;
};

// Собираем сообщение об ошибке в числе комнат и/или числа гостей
const getCapacityAndRoomsErrorMessage = () => {
  if (estateRooms.value === '100' && estateCapacity.value !== '0') {
    return 'Выберите вариант "не для гостей"';
  }
  if (estateCapacity.value === '0' && estateRooms.value !== '100') {
    return 'Выберите вариант "100 комнат"';
  }
  return `Для ${estateCapacity.value} гостей выберите ${estateCapacity.value} комнаты`;
};

pristine.addValidator(
  estateCapacity,
  validateCapacityAndRooms,
  getCapacityAndRoomsErrorMessage,
);

// Добавляем проверку при изменении значений числа гостей и комнат
estateCapacity.addEventListener('change', pristine.validate());
estateRooms.addEventListener('change', pristine.validate());

// Проверяем форму вместо отправки
form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

/*
evt.preventDefault();
if (pristine.validate()) {
  console.log('Можно отправлять');
  return;
}
console.log('Форма невалидна');
});
*/
