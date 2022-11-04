import {pristine, priceNode} from './validation.js';

const sliderNode = document.querySelector('.ad-form__slider');

noUiSlider.create(sliderNode, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 1000,
  step: 100,
  connect: 'lower',
  format: {
    to: (value) => value.toFixed(0),
    from: (value) => parseFloat(value),
  },
});

const onSliderChange = () => {
  priceNode.value = sliderNode.noUiSlider.get();
  sliderNode.noUiSlider.on('set', pristine.validate(priceNode));
};

sliderNode.setAttribute('disabled', true);
sliderNode.removeAttribute('disabled');

const sliderDestroy = () => sliderNode.noUiSlider.destroy();

const initSlider = () => {
  sliderNode.noUiSlider.on('update', onSliderChange);
};

export {initSlider, sliderDestroy};
