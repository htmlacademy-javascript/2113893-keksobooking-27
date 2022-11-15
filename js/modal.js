// Модуль для работы с модальными окнами

import {isEscapeKey} from './utils.js';

const errorTemplateNode = document.querySelector('#error')
  .content.querySelector('.error');
const successTemplateNode = document.querySelector('#success')
  .content.querySelector('.success');
const bodyNode = document.querySelector('body');

const renderModal = (nodeTemplate, customText = '') => {
  if (document.querySelectorAll('.error').length > 0) { // выводим не более 1 окна
    return;
  }
  const node = nodeTemplate.cloneNode(true);
  if (customText) {
    node.querySelector('.error__message').textContent = `Что-то пошло не так... ${customText}`;
  }
  document.body.append(node);
  bodyNode.style.overflow = 'hidden'; // блокируем скролл, если вывели окно
  const closeModal = () => {
    node.remove();
    document.removeEventListener('keydown', onEscKeydown);
    bodyNode.style.overflow = 'auto'; // разблокируем скролл
  };
  function onEscKeydown (evt) {
    if (isEscapeKey(evt)) {
      closeModal();
    }
  }
  node.addEventListener('click', closeModal);
  document.addEventListener('keydown', onEscKeydown);
};

const openModalError = (customText) => renderModal(errorTemplateNode, customText);

const openModalSuccess = () => renderModal(successTemplateNode);

export {openModalError, openModalSuccess};

