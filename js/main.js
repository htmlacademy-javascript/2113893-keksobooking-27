import {validateEstateForm} from './validation.js';
import {initSlider} from './slider.js';
import {initMap} from './map.js';
import {deactivateForms} from './toggle-form.js';

deactivateForms();

initSlider();

validateEstateForm();

initMap();
