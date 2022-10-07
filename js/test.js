const CARDS_COUNT = 3;
const OFFER_FEATURES_MIN = 1;
const OFFER_FEATURES_ARRAY = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const OFFER_PHOTOS_MIN = 1;
const OFFER_PHOTOS_MAX = 5;
const OFFER_PHOTOS_ARRAY = ['1.jpg', '2.jpg', '3.jpg'];
const getRoundInteger = (min, max) => {
  if (min < 0 || max < 0 || !Number.isFinite(min) || !Number.isFinite(min)) {
    return NaN;
  } else if (min === 0 && max === 0) {
    return 0;
  } else if (min > max) {
    [min,max] = [max,min];
  }
  return Math.floor(Math.random() * (max - min + 1) ) + min;
};
const getRandomArrayElement = (elements) => elements[getRoundInteger(0, elements.length - 1)];
const createFeature = () => getRandomArrayElement(OFFER_FEATURES_ARRAY);
const createPhoto = () => getRandomArrayElement(OFFER_PHOTOS_ARRAY);
const createCard = () => ({
  offer: {
    features: Array.from({
      length: getRoundInteger(OFFER_FEATURES_MIN, OFFER_FEATURES_ARRAY.length)}, createFeature),
    photos: Array.from({
      length: getRoundInteger(OFFER_PHOTOS_MIN, OFFER_PHOTOS_MAX)}, createPhoto)
  },
});
const cardsArray = Array.from({length: CARDS_COUNT}, createCard);
console.log(cardsArray);
