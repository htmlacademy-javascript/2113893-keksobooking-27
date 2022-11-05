// Модуль с картой

import {getCardsArray} from './data.js';
import {renderPopup} from './popup.js';
import {activateForms} from './toggle-form.js';

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
  },
  ANCHOR_DIVIDER: 2,
};

// Активируем форму и фильтры при загрузке карты
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

// Добавляем метки объявлений на карту
const renderMarkers = () => getCardsArray().forEach(createMarker);

// Удаляем метки
const clearMap = () => markerGroup.clearLayers();

// Прокидываем текущие координаты основной метки в поле адрес
const onFormMarkerDrag = (evt) => {
  addressNode.value = evt.target.getLatLng();
};

// Инициализация карты с метками
const initMap = () => {
  map.on('load',
    activateForms(),
    renderMarkers(),
  );
  formPinMarker.addTo(map);
  formPinMarker.on('moveend', onFormMarkerDrag);
};

export {
  initMap,
  clearMap,
  renderMarkers,
  MAP,
  map,
  createMarker,
  formPinMarker,
};
