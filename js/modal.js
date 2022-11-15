// Модуль для работы с модальными окнами

import { isEscapeKey } from './utils.js';

// Ноды темплейтов
const successTemplateNode = document.querySelector('#success')
  .content.querySelector('.success');
const errorTemplateNode = document.querySelector('#error')
  .content.querySelector('.error');

// Нода тега body
const bodyNode = document.querySelector('body');

// Функция отрисовки и закрытия окна
const renderModal = (nodeTemplate, error = '') => {
  const modalErrorNode = document.querySelectorAll('.error');
  if (modalErrorNode.length > 0) { // выводим только 1 окно, не более
    return;
  }
  const node = nodeTemplate.cloneNode(true);
  const errorMessageNode = node.querySelector('.error__message');
  const errorButtonNode = node.querySelector('.error__button');
  if (error) {
    errorMessageNode.textContent = `Что-то пошло не так, попробуйте ещё раз (${error})`; // Меняем стандартный текст окна ошибки
    errorButtonNode.classList.add('visually-hidden'); // Скрываем кнопку попробовать снова для кастомных окон ошибки
  }
  document.body.append(node);
  bodyNode.style.overflow = 'hidden'; // блокируем скролл, если вывели окно
  const closeModal = () => {
    node.remove();
    document.removeEventListener('keydown', onEscKeydown);
    bodyNode.style.overflow = 'auto'; // разблокируем скролл
  };
  function onEscKeydown (evt) { // Объявляем декларативно для hoisting
    if (isEscapeKey(evt)) {
      closeModal();
    }
  }
  node.addEventListener('click', closeModal);
  document.addEventListener('keydown', onEscKeydown);
};

// Функции для открытия и закрытия окошек
const openModalError = (error) => renderModal(errorTemplateNode, error);
const openModalSuccess = () => renderModal(successTemplateNode);

export { openModalError, openModalSuccess };

