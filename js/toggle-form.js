// Модуль переключения форм страницы - активное и заблокированное состояние

// Формы для блокировки (при обращении через мышь)
const cardForm = document.querySelector('.ad-form');
const mapForm = document.querySelector('.map__filters');

// Классы для блокировки форм
const cardFormClassToDisable = 'ad-form--disabled';
const mapFormClassToDisable = 'map__filters--disabled';

// Поля для блокировки (при обращении через клавиатуру)
const cardFilters = cardForm.querySelectorAll('fieldset, select');
const mapFilters = mapForm.querySelectorAll('fieldset, select');

// Функция переключения состояния формы
const toggleFormState = (Form, classToDisableForm, formFilters, classToggle, state) => {
  Form.classList[classToggle](classToDisableForm); // блокируем форму для мыши
  formFilters.forEach((field) => { // блокируем поля формы для клавиатуры
    field.disabled = state;
  });
};

// Функция блокировки форм и фильтров
const deactivateForms = () => {
  toggleFormState(cardForm, cardFormClassToDisable, cardFilters, 'add', true);
  toggleFormState(mapForm, mapFormClassToDisable, mapFilters, 'add', true);
};

// Функция активации форм и фильтров
const activateForms = () => {
  toggleFormState(cardForm, cardFormClassToDisable, cardFilters, 'remove', false);
  toggleFormState(mapForm, mapFormClassToDisable, mapFilters, 'remove', false);
};

export {deactivateForms, activateForms};
