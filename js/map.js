// Модуль с картой

import { renderPopup } from './popup.js';
import { activateForms } from './form-states.js';
import { sliderEnable } from './slider.js';
import { getData } from './api.js';
import { openModalError } from './modal.js';
import { MapSetup, PinSetup } from './setup.js';

const addressNode = document.querySelector('#address');
const mapContainerNode = document.querySelector('#map-canvas');

// Центрируем карту при загрузке
const map = L.map(mapContainerNode).setView({
  lat: MapSetup.DEFAULT.LAT,
  lng: MapSetup.DEFAULT.LNG
}, MapSetup.SCALE);

// Добавляем слой с картой openstreetmap
L.tileLayer(
  MapSetup.TILE,
  {
    attribution: MapSetup.ATTRIBUTION,
  },
).addTo(map);

// Функция инициализации иконки маркера
const initMarkerIcon = (url, size, divider) => L.icon({
  iconUrl: url,
  iconSize: [size, size],
  iconAnchor: [size / divider, size],
});

// Иконка метки для формы
const formPinIcon = initMarkerIcon(PinSetup.MAIN.URL, PinSetup.MAIN.SIZE, PinSetup.ANCHOR_DIVIDER);

// Добавляем возможность перетаскивать, позиционируем
const formPinMarker = L.marker(
  {
    lat: MapSetup.DEFAULT.LAT,
    lng: MapSetup.DEFAULT.LNG,
  },
  {
    draggable: true,
    icon: formPinIcon,
  },
);

// Создаём слой для меток объявлений
const markerGroup = L.layerGroup().addTo(map);

// Простая метка
const pinIcon = initMarkerIcon(PinSetup.DEFAULT.URL, PinSetup.DEFAULT.SIZE, PinSetup.ANCHOR_DIVIDER);

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
  addressNode.value = `${MapSetup.DEFAULT.LAT}, ${MapSetup.DEFAULT.LNG}`;
};

// Функция сброса карты и центрирование метки формы
const resetMap = () => {
  formPinMarker.setLatLng({
    lat: MapSetup.DEFAULT.LAT,
    lng: MapSetup.DEFAULT.LNG,
  });
  map.setView({
    lat: MapSetup.DEFAULT.LAT,
    lng: MapSetup.DEFAULT.LNG,
  }, MapSetup.SCALE);
  setDefaultAddress();
};

// Прокидываем текущие координаты основной метки в поле адрес
const onFormMarkerDrag = (evt) => {
  addressNode.value = `${(evt.target.getLatLng().lat).toFixed(PinSetup.MAIN.DECIMALS)}, ${(evt.target.getLatLng().lng).toFixed(PinSetup.MAIN.DECIMALS)}`;
};

// Функция добавления меток объявлений на карту
const renderMarkers = (cards) => cards // берём объект с данными
  .slice(0, PinSetup.MAX_QTY) // срезаем лишние (по ТЗ) метки
  .forEach(createMarker); // добавляем метки на карту

// Инициализация карты с метками
const initMap = () => {
  map.on('load',
    activateForms(),
    sliderEnable(),
    getData(renderMarkers, openModalError),
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
  addressNode,
};
