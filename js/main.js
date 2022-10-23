import {getCardsArray} from './data.js';
import {renderElement} from './popup.js';

const map = document.querySelector('#map-canvas');

map.append(renderElement(getCardsArray()[0]));

// getCardsArray().forEach((value) => {
//   map.append(renderElement(value));
// });
