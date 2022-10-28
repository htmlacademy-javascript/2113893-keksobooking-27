// Модуль переноса данных объявления в разметку

const TYPE_ENG_TO_RU = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

// Скрываем (визуально) узлы без значений
const hideNode = (element, className) => {
  element.querySelector(className).classList.add('visually-hidden');
};

// Присваиваем значение узлу попапа или скрываем узел
const processPopupElement = (element, className, elementProperty, value) => {
  if (value === undefined) {
    element.querySelector(className).classList.add('visually-hidden');
    return;
  }
  element.querySelector(className)[elementProperty] = value;
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

// Создаем узлы под фото и присваиваем им адрес фотографий
const getPhotos = (photos, container, template, alt) => {
  photos.forEach(() => {
    const photo = template.cloneNode(true);
    photo.src = photos;
    photo.alt = alt;
    container.append(photo);
  });
  template.remove();
};

// Переносим сгенерированные данные во фрагмент с HTML разметкой
const renderPopup = ({
  author: {avatar},
  offer: {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos}
}) => {
  const popup = document.querySelector('#card').content.querySelector('.popup').cloneNode(true);

  processPopupElement(popup, '.popup__avatar', 'src', avatar);
  processPopupElement(popup, '.popup__title', 'textContent', title);
  processPopupElement(popup, '.popup__text--address', 'textContent', address);
  processPopupElement(popup, '.popup__description', 'textContent', description);
  processPopupElement(popup, '.popup__type', 'textContent', TYPE_ENG_TO_RU[type]);
  processPopupElement(popup, '.popup__text--price', 'textContent', `${price} ₽/ночь`);
  processPopupElement(popup, '.popup__text--capacity', 'textContent', `${rooms} комнаты для ${guests} гостей`);
  processPopupElement(popup, '.popup__text--time', 'textContent', `Заезд после ${checkin}, выезд до ${checkout}`);

  const featureList = popup.querySelector('.popup__features').querySelectorAll('.popup__feature');
  if (features === undefined) {
    hideNode(popup, '.popup__features');
    return;
  }
  getFeatures(features, featureList);

  const photoContainer = popup.querySelector('.popup__photos');
  const templatePhoto = popup.querySelector('.popup__photo');
  if (photos === undefined) {
    hideNode(popup, '.popup__photos');
    return;
  }
  getPhotos(photos, photoContainer, templatePhoto, title);

  return (popup);
};

export {renderPopup};
