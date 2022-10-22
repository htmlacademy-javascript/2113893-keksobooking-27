import {getCardsArray} from './data.js';
import {renderElement} from './popup.js';

const map = document.querySelector('#map-canvas');

// const popupsData = getCardsArray();

// popupsData.forEach((value) => {
//   map.append(renderElement(value));
// });

map.append(renderElement(getCardsArray()[0]));
