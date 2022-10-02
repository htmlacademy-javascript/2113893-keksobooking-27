// ДЗ №2
// Функция, возвращающая случайное целое число из переданного диапазона включительно.

function getRoundInteger (min, max) {
  if (min < 0 || max < 0 || !Number.isFinite(min) || !Number.isFinite(min)) {
    return 'NaN';
  } else if (min === 0 && max === 0) {
    return 0;
  } else if (min > max) {
    [min,max] = [max,min];
  }
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

getRoundInteger(1, 10);


//Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.

function getFloatNumber (min, max, decimals) {
  if (min < 0 || max < 0 || decimals < 0 || !Number.isFinite(min) || !Number.isFinite(min) || !Number.isFinite(decimals)) {
    return 'NaN';
  } else if (min > max) {
    return +((Math.random() * (min - max + 1)) + max).toFixed(decimals);
  } else if (min === 0 && max === 0) {
    return 0;
  }
  return +((Math.random() * (max - min + 1)) + min).toFixed(decimals);
}

getFloatNumber(0, 0, 5);

/*

ДЗ 2, функция 2, краткая запись

function getFloatNumber (min, max, decimals) {
  return (min < 0 || max < 0 || decimals < 0 || !Number.isFinite(min) || !Number.isFinite(min) || !Number.isFinite(decimals)) ? 'NaN' :
    (min === 0 && max === 0) ? 0 :
    (min > max) ? +((Math.random() * (min - max + 1)) + max).toFixed(decimals) :
    +((Math.random() * (max - min + 1)) + min).toFixed(decimals);
}
getFloatNumber(0, 0, 5);

ДЗ 2, функция 2, развёрнутая запись

function getFloatNumber (min, max, decimals) {
  if (min < 0 || max < 0 || decimals < 0 || !Number.isFinite(min) || !Number.isFinite(min) || !Number.isFinite(decimals)) {
    return 'NaN';
  } else if (min > max) {
    return +((Math.random() * (min - max + 1)) + max).toFixed(decimals);
  } else if (min === 0 && max === 0) {
    return 0;
  }
  return +((Math.random() * (max - min + 1)) + min).toFixed(decimals);
}
getFloatNumber(0, 0, 5);

ДЗ 2, функция 1 краткая запись

function getRoundInteger (min, max) {
  return (min < 0 || max < 0 || !Number.isFinite(min) || !Number.isFinite(min)) ?  'NaN' :
  (min > max) ? Math.floor(Math.random() * (min - max + 1) ) + max:
  Math.floor(Math.random() * (max - min + 1) ) + min;
}
getRoundInteger(1, 10);

ДЗ 2, функция 1 развёрнутая запись

function getRoundInteger (min, max) {
  if (min < 0 || max < 0) {
    return 'NaN';
  }
  else if (min > max) {
    [min,max] = [max,min];
  }
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}
getRoundInteger(1, 10);

*/
