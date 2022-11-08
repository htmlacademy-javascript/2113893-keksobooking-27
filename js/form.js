// Управляем кнопками формы

import {pristine, formNode} from './validation.js';
import {renderMarkers, resetMap} from './map.js';
import {getData, sendData} from './api.js';
import {onError} from './utils.js';
import {openModalError, openModalSuccess} from './modal.js';
import {sliderReset} from './slider.js';
import {resetFilters} from './toggle-form.js';

const submitButton = formNode.querySelector('.ad-form__submit');

// Блокировка кнопки отправить данные
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

// Разблокировка кнопки отправить данные
const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

// Сброс страницы
const resetPage = () => {
  sliderReset();
  resetFilters();
  resetMap();
};

// Возвращаем карту и основную метку на место по нажатию "очистить"
const onReset = () => {
  getData(renderMarkers, onError);
  resetPage();
};

// Проверяем форму вместо отправки
const onSubmit = (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    blockSubmitButton();
    sendData(
      openModalSuccess,
      openModalError,
      new FormData(evt.target),
    );
    resetPage();
    unblockSubmitButton();
    return;
  }
  openModalError();
};

formNode.addEventListener('reset', onReset);
formNode.addEventListener('submit', onSubmit);
