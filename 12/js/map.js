// Модуль с картой

import {renderPopup} from './popup.js';
import {activateForms} from './form-states.js';
import {sliderEnable} from './slider.js';
import {getData} from './api.js';
import {onError} from './utils.js';

const addressNode = document.querySelector('#address');
const mapContainer = document.querySelector('#map-canvas');

// Настройки карты
const MAP = {
  DEFAULT: {
    LAT: 35.68,
    LNG: 139.75,
  },
  SCALE : 13,
  TILE: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  ATTRIBUTION: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
};

// Настройки меток
const PINS = {
  DEFAULT: {
    URL: './img/pin.svg',
    SIZE: 40,
  },
  FORM: {
    URL: './img/main-pin.svg',
    SIZE: 52,
    DECIMALS: 5,
  },
  ANCHOR_DIVIDER: 2,
  MAX: 10,
};

// Центрируем карту при загрузке
const map = L.map(mapContainer).setView({
  lat: MAP.DEFAULT.LAT,
  lng: MAP.DEFAULT.LNG
}, MAP.SCALE);

// Добавляем слой с картой openstreetmap
L.tileLayer(
  MAP.TILE,
  {
    attribution: MAP.ATTRIBUTION,
  },
).addTo(map);

// Функция инициализации иконки маркера
const initMarkerIcon = (url, size, divider) => L.icon({
  iconUrl: url,
  iconSize: [size, size],
  iconAnchor: [size / divider, size],
});

// Иконка метки для формы
const formPinIcon = initMarkerIcon(PINS.FORM.URL, PINS.FORM.SIZE, PINS.ANCHOR_DIVIDER);

// Добавляем возможность перетаскивать, позиционируем
const formPinMarker = L.marker(
  {
    lat: MAP.DEFAULT.LAT,
    lng: MAP.DEFAULT.LNG,
  },
  {
    draggable: true,
    icon: formPinIcon,
  },
);

// Создаём слой для меток объявлений
const markerGroup = L.layerGroup().addTo(map);

// Простая метка
const pinIcon = initMarkerIcon(PINS.DEFAULT.URL, PINS.DEFAULT.SIZE, PINS.ANCHOR_DIVIDER);

// Функция добавления метки и наполнения попапа
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
    .addTo(markerGroup)
    .bindPopup(renderPopup(card));
};

// Функция удаления меток
const clearMap = () => markerGroup.clearLayers();

// Указываем в поле адрес координаты центра карты
const setDefaultAddress = () => {
  addressNode.value = `${MAP.DEFAULT.LAT}, ${MAP.DEFAULT.LNG}`;
};

// Функция сброса карты и центрирование метки формы
const resetMap = () => {
  formPinMarker.setLatLng({
    lat: MAP.DEFAULT.LAT,
    lng: MAP.DEFAULT.LNG,
  });
  map.setView({
    lat: MAP.DEFAULT.LAT,
    lng: MAP.DEFAULT.LNG,
  }, MAP.SCALE);
  setDefaultAddress();
};

// Прокидываем текущие координаты основной метки в поле адрес
const onFormMarkerDrag = (evt) => {
  addressNode.value = `${(evt.target.getLatLng().lat).toFixed(PINS.FORM.DECIMALS)}, ${(evt.target.getLatLng().lng).toFixed(PINS.FORM.DECIMALS)}`;
};

// Функция добавления меток объявлений на карту
const renderMarkers = (cards) => cards // берём объект с данными
  .slice(0, PINS.MAX) // срезаем лишние (по ТЗ) метки
  .forEach(createMarker); // добавляем метки на карту

// Инициализация карты с метками
const initMap = () => {
  map.on('load',
    activateForms(),
    sliderEnable(),
    getData(renderMarkers, onError),
  );
  formPinMarker.addTo(map);
  setDefaultAddress();
  formPinMarker.on('move', onFormMarkerDrag);
};

export {
  initMap,
  clearMap,
  createMarker,
  resetMap,
  renderMarkers,
  PINS,
  MAP,
  addressNode,
};
