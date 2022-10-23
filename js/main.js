import {getCardsArray} from './data.js';
import {renderElement} from './popup.js';
import {deactivateFilters, activateFilters} from './toggle-filters.js';

const map = document.querySelector('#map-canvas');
const formFilters = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');

map.append(renderElement(getCardsArray()[0]));

deactivateFilters(formFilters, mapFilters);
activateFilters(formFilters, mapFilters);
