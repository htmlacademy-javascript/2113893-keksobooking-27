// Модуль переноса данных объявления в разметку

import {getDeclension} from './utils.js';

const DECLENSIONS = {
  GUESTS: ['гостя', 'гостей', 'гостей'],
  ROOMS: ['комната', 'комнаты', 'комнат'],
};

const TYPE_ENG_TO_RU = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

// Скрываем (визуально) узлы без значений
const hideNode = (node, className) => {
  node.querySelector(className).classList.add('visually-hidden');
};

// Присваиваем значение узлу попапа или скрываем узел
const processPopupNode = (node, className, nodeProperty, value) => {
  if (value === undefined) {
    node.querySelector(className).classList.add('visually-hidden');
    return;
  }
  node.querySelector(className)[nodeProperty] = value;
};

// Убираем ненужные иконки особенностей жилья
const getFeatures = (features, list) => {
  list.forEach((listItem) => {
    const isNecessary = features.some(
      (feature) => listItem.classList.contains(`popup__feature--${feature}`)
    );
    if (!isNecessary) {
      listItem.remove();
    }
  });
};

// Создаем узлы под фото и присваиваем им адрес фотографий
const getPhotos = (photos, container, template, alt) => {
  photos.forEach(() => {
    const photo = template.cloneNode(true);
    photo.src = photos;
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

  processPopupNode(popup, '.popup__avatar', 'src', avatar);
  processPopupNode(popup, '.popup__title', 'textContent', title);
  processPopupNode(popup, '.popup__text--address', 'textContent', address);
  processPopupNode(popup, '.popup__description', 'textContent', description);
  processPopupNode(popup, '.popup__type', 'textContent', TYPE_ENG_TO_RU[type]);
  processPopupNode(popup, '.popup__text--price', 'textContent', `${price} ₽/ночь`);
  processPopupNode(popup, '.popup__text--capacity', 'textContent', `${rooms} ${getDeclension(rooms, DECLENSIONS.ROOMS)} для ${guests} ${getDeclension(guests, DECLENSIONS.GUESTS)}`);
  processPopupNode(popup, '.popup__text--time', 'textContent', `Заезд после ${checkin}, выезд до ${checkout}`);

  const featureList = popup.querySelector('.popup__features').querySelectorAll('.popup__feature');
  if (features === undefined) {
    hideNode(popup, '.popup__features');
    return;
  }
  getFeatures(features, featureList);

  const photoContainer = popup.querySelector('.popup__photos');
  const templatePhoto = popup.querySelector('.popup__photo');
  if (photos === undefined) {
    hideNode(popup, '.popup__photos');
    return;
  }
  getPhotos(photos, photoContainer, templatePhoto, title);

  return (popup);
};

export {renderPopup};
