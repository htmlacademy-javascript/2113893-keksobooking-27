// Управляем кнопками формы

import {pristine, formNode} from './validation.js';
import {resetMap, renderMarkers, clearMap} from './map.js';
import {getData, sendData} from './api.js';
import {openModalError, openModalSuccess} from './modal.js';
import {sliderReset} from './slider.js';
import {resetImgPreview} from './image-loader.js';
import {offersFiltersNode} from './filter.js';

const submitButtonNode = formNode.querySelector('.ad-form__submit');
const resetButtonNode = formNode.querySelector('.ad-form__reset');


// Блокировка кнопки отправить данные
const blockSubmitButton = () => {
  submitButtonNode.disabled = true;
  submitButtonNode.textContent = 'Публикую...';
};

// Разблокировка кнопки отправить данные
const unblockSubmitButton = () => {
  submitButtonNode.disabled = false;
  submitButtonNode.textContent = 'Опубликовать';
};

// Сброс страницы
const resetPage = () => {
  formNode.reset();
  offersFiltersNode.reset();
  resetMap();
  sliderReset();
  resetImgPreview();
};

const onSuccess = () => {
  openModalSuccess();
  resetPage();
  unblockSubmitButton();
};

const onFail = () => {
  openModalError();
  unblockSubmitButton();
};

// Иницилизируем функционал кнопок Опубликовать и очистить
const initFormButtons = () => {

  // Проверяем форму вместо отправки
  const onSubmit = (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      blockSubmitButton();
      sendData(
        onSuccess,
        onFail,
        new FormData(evt.target),
      );

    }
  };

  // Возвращаем карту и основную метку на место по нажатию "очистить"
  const onReset = (evt) => {
    evt.preventDefault();
    clearMap();
    getData(renderMarkers, openModalError);
    resetPage();
  };

  formNode.addEventListener('submit', onSubmit);
  resetButtonNode.addEventListener('click', onReset);
};

export {initFormButtons};
