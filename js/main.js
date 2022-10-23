import {getCardsArray} from './data.js';
import {renderElement} from './popup.js';
import {deactivateFilters, activateFilters} from './toggle-filters.js';

const fragment = document.createDocumentFragment();
const map = document.querySelector('#map-canvas');
const formFilters = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');

getCardsArray().forEach((value) => {
  fragment.append(renderElement(value));
});

map.append(fragment.firstChild);

deactivateFilters(formFilters, mapFilters);
activateFilters(formFilters, mapFilters);
