import {getCardsArray} from './data.js';
import {renderPopup} from './popup.js';
import {deactivateForms, activateForms} from './toggle-form.js';
import {} from './validation.js';

document.querySelector('#map-canvas').append(renderPopup(getCardsArray()[0]));

deactivateForms();
activateForms();
