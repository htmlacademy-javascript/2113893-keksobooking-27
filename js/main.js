import {getCardsArray} from './data.js';
import {renderPopup} from './popup.js';
import {deactivateForms, activateForms} from './toggle-form.js';
import {validateEstateForm} from './validation.js';

document.querySelector('#map-canvas').append(renderPopup(getCardsArray()[0]));

deactivateForms();
activateForms();

validateEstateForm();
