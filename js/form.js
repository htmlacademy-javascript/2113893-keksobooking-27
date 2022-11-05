// Управляем формой, ЗАГОТОВКА

import {pristine, formNode} from './validation.js';
import {
  clearMap,
  renderMarkers,
  MAP,
  map,
  createMarker,
  formPinMarker,
} from './map.js';
import {getCardsArray} from './data.js';

// Возвращаем карту и основную метку на место по нажатию "очистить"
formNode.addEventListener('reset', () => {
  clearMap();
  formPinMarker.setLatLng({
    lat: MAP.CENTER.LAT,
    lng: MAP.CENTER.LNG,
  });
  map.setView({
    lat: MAP.CENTER.LAT,
    lng: MAP.CENTER.LNG,
  }, MAP.SCALE);
});

// Проверяем форму вместо отправки
formNode.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    clearMap();
    renderMarkers();
    return;
  }
  clearMap();
  getCardsArray().slice(getCardsArray().length / 2).forEach(createMarker);
});
