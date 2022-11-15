// Модуль переноса данных объявления в разметку

import { getDeclension } from './utils.js';
import { Declensions, typeEngToRu } from './setup.js';

// Скрываем (визуально) узлы без значений
const hideNode = (node, className) => {
  node.querySelector(className).classList.add('visually-hidden');
};

// Присваиваем значение узлу попапа или скрываем узел
const processPopupNode = (node, className, nodeProperty, value) => {
  if (value === undefined) {
    hideNode(node, className);
    return;
  }
  node.querySelector(className)[nodeProperty] = value;
};

// Убираем ненужные иконки особенностей жилья
const getFeatures = (features, list, popup) => {
  if (features === undefined) {
    hideNode(popup, '.popup__features');
    return;
  }
  list.forEach((listItem) => {
    const isNecessary = features.some(
      (feature) => listItem.classList.contains(`popup__feature--${feature}`)
    );
    if (!isNecessary) {listItem.remove();}
  });
};

// Создаем узлы под фото и присваиваем им адрес фотографий
const getPhotos = (photos, container, template, alt, popup) => {
  if (photos === undefined) {
    hideNode(popup, '.popup__photos');
    return;
  }
  photos.forEach((item) => {
    const photo = template.cloneNode(true);
    photo.src = item;
    photo.alt = alt;
    container.append(photo);
  });
  template.remove();
};

// Переносим сгенерированные данные во фрагмент с HTML разметкой
const renderPopup = ({
  author: {avatar},
  offer: {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos}
}) => {
  const popup = document.querySelector('#card').content.querySelector('.popup').cloneNode(true);
  const featureList = popup.querySelector('.popup__features').querySelectorAll('.popup__feature');
  const photoContainer = popup.querySelector('.popup__photos');
  const templatePhoto = popup.querySelector('.popup__photo');

  processPopupNode(popup, '.popup__avatar', 'src', avatar);
  processPopupNode(popup, '.popup__title', 'textContent', title);
  processPopupNode(popup, '.popup__text--address', 'textContent', address);
  processPopupNode(popup, '.popup__description', 'textContent', description);
  processPopupNode(popup, '.popup__type', 'textContent', typeEngToRu[type]);
  processPopupNode(popup, '.popup__text--price', 'textContent', `${price} ₽/ночь`);
  processPopupNode(
    popup,
    '.popup__text--capacity',
    'textContent',
    `${rooms} ${getDeclension(rooms, Declensions.ROOMS)} для ${guests} ${getDeclension(guests, Declensions.GUESTS)}`
  );
  processPopupNode(
    popup,
    '.popup__text--time',
    'textContent',
    `Заезд после ${checkin}, выезд до ${checkout}`
  );
  getFeatures(features, featureList, popup);
  getPhotos(photos, photoContainer, templatePhoto, title, popup);

  return (popup);
};

export { renderPopup };
