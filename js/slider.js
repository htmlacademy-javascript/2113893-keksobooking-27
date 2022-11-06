import {pristine, priceNode} from './validation.js';

const sliderNode = document.querySelector('.ad-form__slider');

const SLIDER = {
  START: 0,
  STEP: 100,
  RANGE: {
    MIN: 0,
    MAX: 100000
  },
  DECIMALS: 0,
  CONNECT: 'upper',
};

noUiSlider.create(sliderNode, {
  range: {
    min: SLIDER.RANGE.MIN,
    max: SLIDER.RANGE.MAX,
  },
  start: SLIDER.START,
  step: SLIDER.STEP,
  connect: SLIDER.CONNECT,
  format: {
    to: (value) => value.toFixed(SLIDER.DECIMALS),
    from: (value) => parseFloat(value),
  },
});

const initSlider = () => {
  sliderNode.noUiSlider.on('start', () => {
    sliderNode.noUiSlider.on('update', () => {
      priceNode.value = sliderNode.noUiSlider.get();
      pristine.validate(priceNode);
    });
  });
};

const sliderDisable = () => sliderNode.setAttribute('disabled', true);
const sliderEnable = () => sliderNode.removeAttribute('disabled');
const sliderDestroy = () => sliderNode.noUiSlider.destroy();

export {initSlider, sliderDestroy, sliderDisable, sliderEnable};
