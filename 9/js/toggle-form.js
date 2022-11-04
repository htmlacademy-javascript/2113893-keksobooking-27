// Модуль переключения форм страницы - активное и заблокированное состояние

// Формы для блокировки (при обращении через мышь)
const cardFormNode = document.querySelector('.ad-form');
const mapFormNode = document.querySelector('.map__filters');

// Классы для блокировки форм
const cardFormClassToDisable = 'ad-form--disabled';
const mapFormClassToDisable = 'map__filters--disabled';

// Поля для блокировки (при обращении через клавиатуру)
const cardFilters = cardFormNode.querySelectorAll('fieldset, select');
const mapFilters = mapFormNode.querySelectorAll('fieldset, select');

// Функция переключения состояния
const toggleFormState = (Form, classToDisableForm, formFilters, classToggle, state) => {
  Form.classList[classToggle](classToDisableForm); // блокируем форму для мыши
  formFilters.forEach((field) => { // блокируем поля формы для клавиатуры
    field.disabled = state;
  });
};

// Функция блокировки форм и фильтров
const deactivateForms = () => {
  toggleFormState(cardFormNode, cardFormClassToDisable, cardFilters, 'add', true);
  toggleFormState(mapFormNode, mapFormClassToDisable, mapFilters, 'add', true);
};

// Функция активации форм и фильтров
const activateForms = () => {
  toggleFormState(cardFormNode, cardFormClassToDisable, cardFilters, 'remove', false);
  toggleFormState(mapFormNode, mapFormClassToDisable, mapFilters, 'remove', false);
};

export {deactivateForms, activateForms};
