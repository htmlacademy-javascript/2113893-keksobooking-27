// Модуль фильтрации и вывода на карту искомого жилья

import { getData } from './api.js';
import { clearMap, createMarker, PinSetup } from './map.js';
import { debounce } from './utils.js';
import { openModalError } from './modal.js';
import { Price } from './validation.js';

// Задержка отправки запроса на новые карточки, после выбора фильтров, мс
const RERENDER_DELAY = 500;

// Значение фильтра искомого жилья по умолчанию
const FILTER_DEFAULT_VALUE = 'any';

// Диапазоны цен искомого жилья
const OffersPriceToRange = {
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
    MAX: Price.MAX,
  },
};

// Нода с фильтрами карты
const offersFiltersNode = document.querySelector('.map__filters');

// Поле выбора искомого жилья, тип
const offersTypeNode = offersFiltersNode.querySelector('#housing-type');

// Поле выбора искомого жилья, цена
const offersPriceNode = offersFiltersNode.querySelector('#housing-price');

// Поле выбора искомого жилья, количество комнат
const offersRoomsNode = offersFiltersNode.querySelector('#housing-rooms');

// Поле выбора искомого жилья, количество гостей
const offersGuestsNode = offersFiltersNode.querySelector('#housing-guests');

// Нода с удобствами искомого жилья
const offersFeaturesNode = offersFiltersNode.querySelector('#housing-features');

// Коллекция с чекбоксами удобств искомого жилья
const FeaturesListNode = offersFeaturesNode.querySelectorAll('input');

// Проверки отдельных полей карточек объявлений
const checkType = (card) => offersTypeNode.value === FILTER_DEFAULT_VALUE || offersTypeNode.value === card.offer.type;
const checkRooms = (card) => offersRoomsNode.value === FILTER_DEFAULT_VALUE || card.offer.rooms === Number(offersRoomsNode.value);
const checkGuests = (card) => offersGuestsNode.value === FILTER_DEFAULT_VALUE || card.offer.guests === Number(offersGuestsNode.value);
const checkPrice = (card) => {
  const chosenPriceRange = offersPriceNode.value.toUpperCase();
  return offersPriceNode.value === FILTER_DEFAULT_VALUE ||
    (
      card.offer.price > OffersPriceToRange[chosenPriceRange].MIN
      && card.offer.price < OffersPriceToRange[chosenPriceRange].MAX
    );
};
const FeaturesForSearch = () => Array.from(offersFeaturesNode.querySelectorAll('input:checked'), (input) => input.value);
const checkFeatures = (card) => {
  if (FeaturesForSearch() === undefined) {
    return true;
  }
  return FeaturesForSearch().every((item) => {
    const cardFeatures = card.offer.features;
    return cardFeatures === undefined ? false : cardFeatures.includes(item);
  });
};

// Получаем искомые объявления в количестве не более PINS.MAX
const getFilteredCards = (cards) => {
  const filteredCards = [];
  for (const card of cards) {
    if (filteredCards.length >= PinSetup.MAX_QTY) {
      break;
    }
    if (
      checkType(card)
      && checkPrice(card)
      && checkRooms(card)
      && checkGuests(card)
      && checkFeatures(card)
    ) {
      filteredCards.push(card);
    }
  }
  return filteredCards;
};

// Следим за изменениями фильтров карты
const checkFilters = (cb) => {
  offersFiltersNode.addEventListener('change', () => {
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
    checkFilters(debounce(
      () => {
        clearMap();
        getFilteredCards(cards).forEach(createMarker);
      },
      RERENDER_DELAY,
    ));
  }, openModalError);
};

export { getFilteredMarkers, offersFiltersNode };
