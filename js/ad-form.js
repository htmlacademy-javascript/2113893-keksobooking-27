// Модуль валидации объявления

const Form = document.querySelector('.ad-form');
const numberOfRooms = Form.querySelector('#room_number');
const capacity = Form.querySelector('#capacity');

const pristine = new Pristine(Form, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error-text',
});

const validateTitle = (value) => value.length >= 30 && value.length <= 100;

pristine.addValidator(
  Form.querySelector('#title'),
  validateTitle,
  'Укажите название длиной от 30 до 100 символов',
);

const validatePrice = (value) => value >= 0 && value <= 100000;

pristine.addValidator(
  Form.querySelector('#price'),
  validatePrice,
  'Максимум 100 000'
);

const validateCapacityAndRooms = () => {
  if (numberOfRooms.value === '100') {
    return capacity.value === '0';
  }
  if (capacity.value === '0') {
    return numberOfRooms.value === '100';
  }
  return numberOfRooms.value >= capacity.value;
};

const getCapacityAndRoomsErrorMessage = () => {
  if (numberOfRooms.value === '100') {
    return 'Выберите вариант "не для гостей"';
  }
  if (capacity.value === '0') {
    return 'Выберите вариант "100 комнат"';
  }
  return `Для ${capacity.value} гостей выберите ${capacity.value} комнаты`;
};

pristine.addValidator(
  capacity,
  validateCapacityAndRooms,
  getCapacityAndRoomsErrorMessage,
);

const onCapacityChange = () => {
  pristine.validate(capacity);
};

capacity.addEventListener('change', onCapacityChange);

const onNumberOfRoomsChange = () => {
  pristine.validate(capacity);
};

numberOfRooms.addEventListener('change', onNumberOfRoomsChange);

Form.addEventListener('submit', (evt) => {
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
