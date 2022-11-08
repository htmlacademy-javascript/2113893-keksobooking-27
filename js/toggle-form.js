// Модуль переключения форм страницы - активное и заблокированное состояние

// Формы для блокировки (при обращении через мышь)
const formNode = document.querySelector('.ad-form');
const mapFiltersNode = document.querySelector('.map__filters');

// Классы для блокировки форм
const cardFormClassToDisable = 'ad-form--disabled';
const mapFormClassToDisable = 'map__filters--disabled';

// Поля для блокировки (при обращении через клавиатуру)
const cardFilters = formNode.querySelectorAll('fieldset, select');
const mapFilters = mapFiltersNode.querySelectorAll('fieldset, select');

// Функция переключения состояния
const toggleFormState = (Form, classToDisableForm, formFilters, classToggle, state) => {
  Form.classList[classToggle](classToDisableForm); // блокируем форму для мыши
  formFilters.forEach((field) => { // блокируем поля формы для клавиатуры
    field.disabled = state;
  });
};

// Функция блокировки форм и фильтров
const deactivateForms = () => {
  toggleFormState(formNode, cardFormClassToDisable, cardFilters, 'add', true);
  toggleFormState(mapFiltersNode, mapFormClassToDisable, mapFilters, 'add', true);
};

// Функция активации форм и фильтров
const activateForms = () => {
  toggleFormState(formNode, cardFormClassToDisable, cardFilters, 'remove', false);
  toggleFormState(mapFiltersNode, mapFormClassToDisable, mapFilters, 'remove', false);
};

// Сброс фильтров и формы
const resetFilters = () => {
  formNode.reset();
  mapFiltersNode.reset();
};

export {deactivateForms, activateForms, resetFilters};
