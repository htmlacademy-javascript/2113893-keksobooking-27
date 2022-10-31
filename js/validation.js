// Модуль валидации объявления

const estateForm = document.querySelector('.ad-form');
const estatePrice = estateForm.querySelector('#price');
const estateTitle = estateForm.querySelector('#title');
const estateRooms = estateForm.querySelector('#room_number');
const estateCapacity = estateForm.querySelector('#capacity');
const estateCheckIn = estateForm.querySelector('#timein');
const estateCheckOut = estateForm.querySelector('#timeout');
const estateType = estateForm.querySelector('#type');

const pristine = new Pristine(estateForm, {
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
const validatePrice = (value) => {
  if (estateType.value === 'bungalow') {
    return value >= 0 && value <= 100000;
  }
  if (estateType.value === 'flat') {
    return value >= 1000 && value <= 100000;
  }
  if (estateType.value === 'hotel') {
    return value >= 3000 && value <= 100000;
  }
  if (estateType.value === 'house') {
    return value >= 5000 && value <= 100000;
  }
  if (estateType.value === 'palace') {
    return value >= 10000 && value <= 100000;
  }
};

// Формируем сообщение об ошибке цены за ночь
const getPriceErrorMessage = () => {
  if (estateType.value === 'bungalow') {
    return 'Укажите цену от 0 до 100 000';
  }
  if (estateType.value === 'flat') {
    return 'Укажите цену от 1 000 до 100 000';
  }
  if (estateType.value === 'hotel') {
    return 'Укажите цену от 3 000 до 100 000';
  }
  if (estateType.value === 'house') {
    return 'Укажите цену от 5 000 до 100 000';
  }
  if (estateType.value === 'palace') {
    return 'Укажите цену от 10 000 до 100 000';
  }
};

// Добавляем проверку цены в валидатор
pristine.addValidator(
  estatePrice,
  validatePrice,
  getPriceErrorMessage,
);

// Синхронизируем поля «Время заезда» и «Время выезда»
const onCheckInChange = () => {
  estateCheckOut.value = estateCheckIn.value;
};

estateCheckIn.addEventListener('change', onCheckInChange);

const onCheckOutChange = () => {
  estateCheckIn.value = estateCheckOut.value;
};

estateCheckOut.addEventListener('change', onCheckOutChange);

// Добавляем влияние типа жилья на стоимость
const onEstateTypeChange = () => {
  if (estateType.value === 'bungalow') {
    estatePrice.placeholder = 0;
  }
  if (estateType.value === 'flat') {
    estatePrice.placeholder = 1000;
  }
  if (estateType.value === 'hotel') {
    estatePrice.placeholder = 3000;
  }
  if (estateType.value === 'house') {
    estatePrice.placeholder = 5000;
  }
  if (estateType.value === 'palace') {
    estatePrice.placeholder = 10000;
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
estateForm.addEventListener('submit', (evt) => {
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
