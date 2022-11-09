// Модуль с картой

import {renderPopup} from './popup.js';
import {activateForms} from './toggle-form.js';
import {sliderEnable} from './slider.js';
import {getData} from './api.js';
import {onError} from './utils.js';

const addressNode = document.querySelector('#address');
const mapContainer = document.querySelector('#map-canvas');

// Настройки карты
const MAP = {
  CENTER: {
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
    SIZE: 30,
  },
  FORM: {
    URL: './img/main-pin.svg',
    SIZE: 40,
    DECIMALS: 5,
  },
  ANCHOR_DIVIDER: 2,
  AMOUNT_ON_MAP: 10,
};

// Центрируем карту при загрузке
const map = L.map(mapContainer).setView({
  lat: MAP.CENTER.LAT,
  lng: MAP.CENTER.LNG
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
    lat: MAP.CENTER.LAT,
    lng: MAP.CENTER.LNG,
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

// Функция добавления меток объявлений на карту
const renderMarkers = (cards) => cards.slice(0, PINS.AMOUNT_ON_MAP).forEach(createMarker);

// Функция удаления меток
const clearMap = () => markerGroup.clearLayers();

// Функция сброса карты и центрирование метки формы
const resetMap = () => {
  formPinMarker.setLatLng({
    lat: MAP.CENTER.LAT,
    lng: MAP.CENTER.LNG,
  });
  map.setView({
    lat: MAP.CENTER.LAT,
    lng: MAP.CENTER.LNG,
  }, MAP.SCALE);
};


// Прокидываем текущие координаты основной метки в поле адрес
const onFormMarkerDrag = (evt) => {
  addressNode.value = `${(evt.target.getLatLng().lat).toFixed(PINS.FORM.DECIMALS)}, ${(evt.target.getLatLng().lng).toFixed(PINS.FORM.DECIMALS)}`;
};

// Инициализация карты с метками
const initMap = () => {
  map.on('load',
    activateForms(),
    sliderEnable(),
    getData(renderMarkers, onError),
  );
  formPinMarker.addTo(map);
  formPinMarker.on('moveend', onFormMarkerDrag);
};

export {
  initMap,
  clearMap,
  renderMarkers,
  createMarker,
  resetMap,
};
