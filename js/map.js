// Модуль с картой

import {getCardsArray} from './data.js';
import {renderPopup} from './popup.js';
import {activateForms} from './toggle-form.js';
import {formNode} from './validation.js';

const addressNode = document.querySelector('#address');

// Активируем форму и фильтры при загрузке карты, добавляем слой с картой openstreetmap
const map = L.map('map-canvas')
  .on('load', () => activateForms())
  .setView({
    lat: 35.68,
    lng: 139.75,
  }, 13);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

// Основной пин
const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

// добавляем возможность перетаскивать основной пин, позиционируем
const mainPinMarker = L.marker(
  {
    lat: getCardsArray()[0].location.lat,
    lng: getCardsArray()[0].location.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

// Добавляем основной пин на карту
mainPinMarker.addTo(map);

// Простой пин
const pinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

// Для каждого объявления, добавляем пин на карту и наполняем попап
const createMarker = (card) => {
  const marker = L.marker(
    {
      lat: card.location.lat,
      lng: card.location.lng,
    },
    {
      icon: pinIcon,
    },
  );

  marker
    .addTo(map)
    .bindPopup(renderPopup(card));
};
getCardsArray().forEach(createMarker);

// Прокидываем текущие координаты пина в поле адрес
mainPinMarker.on('moveend', (evt) => {
  addressNode.value = evt.target.getLatLng();
});

// Возвращаем карту и пин на место по нажатию "очистить"
formNode.addEventListener('reset', () => {
  mainPinMarker.setLatLng({
    lat: 35.6895,
    lng: 139.692,
  });
  map.setView({
    lat: 35.68,
    lng: 139.75,
  }, 13);
});

export {};
