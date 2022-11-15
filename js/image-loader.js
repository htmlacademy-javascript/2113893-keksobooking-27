// Модуль обработки загружаемых изображений

import { IMG_TYPES } from './setup.js';

const avatarLoaderNode = document.querySelector('#avatar');
const avatarPreviewImgNode = document.querySelector('.ad-form-header__preview img');
const estateLoaderNode = document.querySelector('#images');
const estatePreviewNode = document.querySelector('.ad-form__photo');

// Функция получения img для аватара
const getAvatarImg = (file) => {
  avatarPreviewImgNode.src = URL.createObjectURL(file);
  avatarPreviewImgNode.alt = 'Аватар';
};

// Функция получения img для жилья
const getEstateImg = (file) => {
  estatePreviewNode.innerHTML = '';
  const image = document.createElement('img');
  image.src = URL.createObjectURL(file);
  image.style.maxWidth = '100%';
  image.style.height = 'auto';
  image.alt = 'Фотография жилья';
  image.style.objectFit = 'cover';
  estatePreviewNode.append(image);
};

// Функция получения превью изображения
const renderPreview = (loaderNode, cb) => {
  const file = loaderNode.files[0];
  const fileName = file.name.toLowerCase();
  const isFileMatchesToTypes = IMG_TYPES.some((it) => fileName.endsWith(it));
  if (isFileMatchesToTypes) {
    cb(file);
  }
};

// Функция получения превью при загрузке фото
const getImgPreview = () => {
  avatarLoaderNode.addEventListener('change', () => renderPreview(avatarLoaderNode, getAvatarImg));
  estateLoaderNode.addEventListener('change', () => renderPreview(estateLoaderNode, getEstateImg));
};

// Функция удаления превьюх
const resetImgPreview = () => {
  estatePreviewNode.innerHTML = '';
  avatarPreviewImgNode.src = 'img/muffin-grey.svg';
};

export { getImgPreview, resetImgPreview };
