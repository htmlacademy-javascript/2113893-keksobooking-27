// Модуль переноса данных объявления в разметку

const typeEngToRu = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

// Скрываем (визуально) элементы карточки без значений
const hideNode = (element, className) => {
  element.querySelector(className).classList.add('visually-hidden');
};

// Убираем ненужные иконки особенностей жилья
const getFeatures = (features, list) => {
  list.forEach((listItem) => {
    const isNecessary = features.some(
      (feature) => listItem.classList.contains(`popup__feature--${feature}`)
    );
    if (!isNecessary) {
      listItem.remove();
    }
  });
};

// Создаем элементы разметки под фото и присваиваем им адрес фотографий
const getPhotos = (photos, container, template) => {
  photos.forEach(() => {
    const photo = template.cloneNode(true);
    photo.src = photos;
    container.append(photo);
  });
  template.remove();
};

// Переносим сгенерированные данные в фрагмент с HTML разметкой
const renderElement = ({
  author: {avatar},
  offer: {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos}
}) => {
  const element = document.querySelector('#card').content.querySelector('.popup').cloneNode(true);

  if (avatar === undefined) {
    hideNode(element, '.popup__avatar');
  } else {
    element.querySelector('.popup__avatar').src = avatar;
  }

  if (title === undefined) {
    hideNode(element, '.popup__title');
  } else {
    element.querySelector('.popup__title').textContent = title;
  }

  if (address === undefined) {
    hideNode(element, '.popup__text--address');
  } else {
    element.querySelector('.popup__text--address').textContent = address;
  }

  if (description === undefined) {
    hideNode(element, '.popup__description');
  } else {
    element.querySelector('.popup__description').textContent = description;
  }

  if (type === undefined) {
    hideNode(element, '.popup__type');
  } else {
    element.querySelector('.popup__type').textContent = typeEngToRu[type];
  }

  if (price === undefined) {
    hideNode(element, '.popup__text--price');
  } else {
    element.querySelector('.popup__text--price').textContent = `${price} ₽/ночь`;
  }

  if (rooms === undefined || guests === undefined) {
    hideNode(element, '.popup__text--capacity');
  } else {
    element.querySelector('.popup__text--capacity').textContent = `${rooms} комнаты для ${guests} гостей`;
  }

  if (checkin === undefined || checkout === undefined) {
    hideNode(element, '.popup__text--time');
  } else {
    element.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  }

  const featureList = element.querySelector('.popup__features').querySelectorAll('.popup__feature');
  if (features === undefined) {
    hideNode(element, '.popup__features');
  } else {
    getFeatures(features, featureList);
  }

  const photoContainer = element.querySelector('.popup__photos');
  const templatePhoto = element.querySelector('.popup__photo');
  if (photos === undefined) {
    hideNode(element, '.popup__photos');
  } else {
    getPhotos(photos, photoContainer, templatePhoto);
  }

  return (element);
};

export {renderElement};
