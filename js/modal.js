// Модуль для работы с модальными окнами

import {isEscapeKey} from './utils.js';

const errorTemplateNode = document.querySelector('#error').content.querySelector('.error');
const successTemplateNode = document.querySelector('#success').content.querySelector('.success');

const renderModal = (nodeTemplate) => {
  const node = nodeTemplate.cloneNode(true);
  document.body.append(node);
  const closeModal = () => {
    node.remove();
    document.removeEventListener('keydown', onEscKeydown);
  };
  function onEscKeydown (evt) {
    if (isEscapeKey(evt)) {
      closeModal();
    }
  }
  node.addEventListener('click', closeModal);
  document.addEventListener('keydown', onEscKeydown);
};

const openModalError = () => renderModal(errorTemplateNode);

const openModalSuccess = () => renderModal(successTemplateNode);

export {openModalError, openModalSuccess};

