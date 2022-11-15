// Модуль переключения форм страницы - активное и заблокированное состояние

import { offersFiltersNode } from './filter.js';
import { formNode } from './validation.js';

// Классы для блокировки форм
const formClassToDisable = 'ad-form--disabled';
const filtersClassToDisable = 'map__filters--disabled';

// Поля для блокировки (при обращении через клавиатуру)
const cardFilters = formNode.querySelectorAll('fieldset, select');
const mapFilters = offersFiltersNode.querySelectorAll('fieldset, select');

// Функция переключения состояния
const toggleFormState = (Form, classToDisableForm, formFilters, classToggle, state) => {
  Form.classList[classToggle](classToDisableForm); // блокируем форму для мыши
  formFilters.forEach((field) => { // блокируем поля формы для клавиатуры
    field.disabled = state;
  });
};

// Функция блокировки форм и фильтров
const deactivateForms = () => {
  toggleFormState(formNode, formClassToDisable, cardFilters, 'add', true);
  toggleFormState(offersFiltersNode, filtersClassToDisable, mapFilters, 'add', true);
};

// Функция активации форм и фильтров
const activateForms = () => {
  toggleFormState(formNode, formClassToDisable, cardFilters, 'remove', false);
  toggleFormState(offersFiltersNode, filtersClassToDisable, mapFilters, 'remove', false);
};

export { deactivateForms, activateForms };
