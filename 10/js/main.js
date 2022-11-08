import {validateEstateForm} from './validation.js';
import {initSlider, sliderDisable} from './slider.js';
import {initMap} from './map.js';
import {deactivateForms} from './toggle-form.js';
import {} from './form.js';


deactivateForms();
sliderDisable();

initSlider();

validateEstateForm();

initMap();
