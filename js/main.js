import {getCardsArray} from './data.js';
import {fillFragment} from './popup.js';

const cardsContainer = document.querySelector('#map-canvas');

const popups = getCardsArray();
const temp = fillFragment(popups);

cardsContainer.appendChild(temp.firstChild);
