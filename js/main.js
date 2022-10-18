import {getCardsArray} from './data.js';
import './popup.js';

const templateFragment = document.querySelector('#card').content;
const template = templateFragment.querySelector('.popup');
const map = document.querySelector('#map-canvas');
const fragment = document.createDocumentFragment();

const popups = getCardsArray();
console.log(popups);

popups.forEach((popup) => {
  const element = template.cloneNode(true);
  element.querySelector('.popup__title').textContent = popup.offer.title;
  element.querySelector('.popup__text--address').textContent = popup.offer.address;
  element.querySelector('.popup__text--capacity').textContent = `${popup.offer.price} ₽/ночь`;
  element.querySelector('.popup__text--price').textContent = `${popup.offer.rooms} комнаты для ${popup.offer.guests} гостей`;
  element.querySelector('.popup__text--time').textContent = `Заезд после ${popup.offer.checkin}, выезд до ${popup.offer.checkout}`;
  element.querySelector('.popup__features').textContent = popup.offer.features;
  element.querySelector('.popup__description').textContent = popup.offer.description;
  element.querySelectorAll('.popup__photos').src = popup.offer.photos;
  element.querySelector('.popup__avatar').src = popup.author.avatar;
  fragment.appendChild(element);
});


map.appendChild(fragment);
console.log(map);
