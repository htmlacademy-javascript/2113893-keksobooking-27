import {getCardsArray} from './data.js';
import {fillFragment} from './popup.js';

const cardsContainer = document.querySelector('#map-canvas');

const popups = getCardsArray();
const fragment = fillFragment(popups);

cardsContainer.appendChild(fragment.firstChild);
