const templateContent = document.querySelector('#card').content;
const template = templateContent.querySelector('.popup');
const fragment = document.createDocumentFragment();

const fillFragment = (cardsArray) => {
  cardsArray.forEach(({
    author: {avatar},
    offer: {title, address, price, rooms, guests, checkin, checkout, features, description, photos}
  }) => {
    const element = template.cloneNode(true);

    if (avatar === undefined) {
      element.querySelector('.popup__avatar').classList.add('visually-hidden');
    }
    if (title === undefined) {
      element.querySelector('.popup__title').classList.add('visually-hidden');
    }
    if (address === undefined) {
      element.querySelector('.popup__text--address').classList.add('visually-hidden');
    }
    if (price === undefined) {
      element.querySelector('.popup__text--price').classList.add('visually-hidden');
    }
    if (rooms === undefined || guests === undefined) {
      element.querySelector('.popup__text--capacity').classList.add('visually-hidden');
    }
    if (checkin === undefined || guests === checkout) {
      element.querySelector('.popup__text--time').classList.add('visually-hidden');
    }
    if (features === undefined) {
      element.querySelector('.popup__features').classList.add('visually-hidden');
    }
    if (description === undefined) {
      element.querySelector('.popup__description').classList.add('visually-hidden');
    }
    if (photos === undefined) {
      element.querySelector('.popup__photos').classList.add('visually-hidden');
    }

    element.querySelector('.popup__title').textContent = title;
    element.querySelector('.popup__text--address').textContent = address;
    element.querySelector('.popup__text--price').textContent = `${price} ₽/ночь`;
    element.querySelector('.popup__text--capacity').textContent = `${rooms} комнаты для ${guests} гостей`;
    element.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
    element.querySelector('.popup__description').textContent = description;
    element.querySelector('.popup__avatar').src = avatar;

    const photoContainer = element.querySelector('.popup__photos');
    const templatePhoto = element.querySelector('.popup__photo');
    photos.forEach(() => {
      const elementPhoto = templatePhoto.cloneNode(true);
      elementPhoto.src = photos;
      photoContainer.appendChild(elementPhoto);
    });
    templatePhoto.remove();

    const featureContainer = element.querySelector('.popup__features');
    const featureList = featureContainer.querySelectorAll('.popup__feature');
    featureList.forEach((featureListItem) => {
      const isNecessary = features.some(
        (feature) => featureListItem.classList.contains(`popup__feature--${feature}`)
      );
      if (!isNecessary) {
        featureListItem.remove();
      }
    });

    fragment.appendChild(element);
  });
  return (fragment);
};

export {fillFragment};
