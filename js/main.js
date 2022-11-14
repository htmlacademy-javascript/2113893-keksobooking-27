import {intitFormValidation} from './validation.js';
import {initSlider, sliderDisable} from './slider.js';
import {initMap} from './map.js';
import {deactivateForms} from './form-states.js';
import {initFormButtons} from './form.js';
import {getFilteredMarkers} from './filter.js';
import {getImgPreview} from './image-loader.js';

deactivateForms();
sliderDisable();

initSlider();
intitFormValidation();
initFormButtons();
initMap();

getFilteredMarkers();
getImgPreview();
