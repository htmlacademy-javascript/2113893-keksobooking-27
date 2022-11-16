import { pristine, priceNode } from './validation.js';

// Настройки слайдера
const SliderSetup = {
  START: 0,
  STEP: 100,
  RANGE: {
    MIN: 0,
    MAX: 100000
  },
  DECIMALS: 0,
  CONNECT: 'upper',
};

const sliderNode = document.querySelector('.ad-form__slider');

noUiSlider.create(sliderNode, {
  range: {
    min: SliderSetup.RANGE.MIN,
    max: SliderSetup.RANGE.MAX,
  },
  start: SliderSetup.START,
  step: SliderSetup.STEP,
  connect: SliderSetup.CONNECT,
  format: {
    to: (value) => value.toFixed(SliderSetup.DECIMALS),
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
const sliderReset = () => sliderNode.noUiSlider.reset();

export {
  initSlider,
  sliderDisable,
  sliderEnable,
  sliderReset,
};
