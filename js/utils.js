// Случайное целое число
const getRoundInteger = (min, max) => {
  if (min < 0 || max < 0 || !Number.isFinite(min) || !Number.isFinite(min)) {
    return NaN;
  } else if (min === max) {
    return min;
  } else if (min === 0 && max === 0) {
    return 0;
  } else if (min > max) {
    [min,max] = [max,min];
  }
  return Math.floor(Math.random() * (max - min + 1) ) + min;
};

//Cлучайное дробное число, decimals - число знаков после запятой
const getFloatNumber = (min, max, decimals) => {
  if (min < 0 || max < 0 || decimals < 0 ||
    !Number.isFinite(min) || !Number.isFinite(min) || !Number.isFinite(decimals)) {
    return NaN;
  } else if (min === max) {
    return min;
  } else if (min === 0 && max === 0) {
    return 0;
  } else if (min > max) {
    [min,max] = [max,min];
  }
  return +((Math.random() * (max - min)) + min).toFixed(decimals);
};

// Случайный элемент массива
const getRandomArrayElement = (elements) => elements[getRoundInteger(0, elements.length - 1)];

// Получить массив случайной длины, от 0 до arrayMinLength
const getRandomArraySlice = (arrayMinLength, array) => array.slice(0, getRoundInteger(arrayMinLength, array.length));

export {
  getRoundInteger,
  getFloatNumber,
  getRandomArrayElement,
  getRandomArraySlice,
};
