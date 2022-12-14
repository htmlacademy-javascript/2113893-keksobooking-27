// Модуль получения и отправки информации на сервер

// Адрес сервера
const SERVER_URL = 'https://27.javascript.pages.academy/keksobooking';

// Функция получения данных

const getData = (onSuccess, onError) => {
  fetch(
    `${SERVER_URL}/data`
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch((err) => {
      onError(err);
    });
};

// Функция отправки данных
const sendData = (onSuccess, onError, bodyData) => {
  fetch(
    SERVER_URL,
    {
      method: 'POST',
      body: bodyData,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onError();
      }})
    .catch(onError);
};

export { getData, sendData };
