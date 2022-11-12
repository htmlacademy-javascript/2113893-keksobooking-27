// Модуль фильтрации и вывода на карту объявлений

import {getData} from './api.js';
import {clearMap, createMarker} from './map.js';
import {onError, debounce} from './utils.js';
import {PRICE} from './validation.js';

const offersFiltersNode = document.querySelector('.map__filters');
const offersTypeNode = offersFiltersNode.querySelector('#housing-type');
const offersPriceNode = offersFiltersNode.querySelector('#housing-price');
const offersRoomsNode = offersFiltersNode.querySelector('#housing-rooms');
const offersGuestsNode = offersFiltersNode.querySelector('#housing-guests');
const offersFeaturesNode = offersFiltersNode.querySelector('#housing-features');
const FeaturesListNode = offersFeaturesNode.querySelectorAll('input');

const RERENDER_DELAY = 500;
const PINS_ON_MAP = 10;
const DEFAULT = 'any';
const OFFERS_PRICE = {
  LOW: {
    MIN: 0,
    MAX: 10000,
  },
  MIDDLE: {
    MIN: 10000,
    MAX: 50000,
  },
  HIGH: {
    MIN: 50000,
    MAX: PRICE.MAX,
  },
};


const checkType = (card) => offersTypeNode.value === DEFAULT || offersTypeNode.value === card.offer.type;
const checkRooms = (card) => offersRoomsNode.value === DEFAULT || card.offer.rooms === Number(offersRoomsNode.value);
const checkGuests = (card) => offersGuestsNode.value === DEFAULT || card.offer.guests === Number(offersGuestsNode.value);
const checkPrice = (card) => {
  const chosenPriceRange = offersPriceNode.value.toUpperCase();
  return offersPriceNode.value === DEFAULT ||
    (
      card.offer.price > OFFERS_PRICE[chosenPriceRange].MIN
      && card.offer.price < OFFERS_PRICE[chosenPriceRange].MAX
    );
};

const FeaturesForSearchList = () => Array.from(offersFeaturesNode.querySelectorAll('input:checked'), (input) => input.value);
const checkFeatures = (card) => {
  if (FeaturesForSearchList() === undefined) {
    return true;
  }
  return FeaturesForSearchList().every((item) => {
    const temp = card.offer.features;
    if (temp === undefined) {
      return false;
    }
    return temp.includes(item);
  });
};

// Объединяем проверки в единую функцию с условием И
const cardsFilter = (card) => checkType(card)
  && checkPrice(card)
  && checkRooms(card)
  && checkGuests(card)
  && checkFeatures(card);

// Функция добавления меток объявлений на карту
const renderMarkers = (cards) => cards // берём объект с данными
  .slice() // делаем копию
  .filter(cardsFilter) // фильтруем
  .slice(0, PINS_ON_MAP) // срезаем лишние (по ТЗ) метки
  .forEach(createMarker); // добавляем метки на карту

// Следим за изменениями фильтров карты
const checkFilters = (cb) => {
  offersTypeNode.addEventListener('change', () => {
    cb();
  });
  offersPriceNode.addEventListener('change', () => {
    cb();
  });
  offersRoomsNode.addEventListener('change', () => {
    cb();
  });
  offersGuestsNode.addEventListener('change', () => {
    cb();
  });
  FeaturesListNode.forEach((feature) => {
    feature.addEventListener('change', () => {
      cb();
    });
  });
};

// Получаем данные и отрисовываем подходящие метки, с задержкой RERENDER_DELAY
const getFilteredMarkers = () => {
  getData((cards) => {
    renderMarkers(cards);
    checkFilters(debounce(
      () => {
        clearMap();
        renderMarkers(cards);
      },
      RERENDER_DELAY,
    ));
  }, onError);
};

export {renderMarkers, getFilteredMarkers, offersFiltersNode};
