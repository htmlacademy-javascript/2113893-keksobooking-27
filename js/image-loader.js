// Модуль обработки загружаемых изображений

const avatarLoaderNode = document.querySelector('#avatar');
const avatarPreviewImgNode = document.querySelector('.ad-form-header__preview img');
const estateLoaderNode = document.querySelector('#images');
const estatePreviewNode = document.querySelector('.ad-form__photo');

// Поддерживаемые типы изображений
const IMG_TYPES = ['jpg', 'jpeg', 'png', 'webp', 'avif'];

const getAvatarImg = (file) => {
  avatarPreviewImgNode.src = URL.createObjectURL(file);
};

const getEstateImg = (file) => {
  estatePreviewNode.innerHTML = '';
  const image = document.createElement('img');
  image.src = URL.createObjectURL(file);
  image.style.maxWidth = '100%';
  image.style.height = 'auto';
  estatePreviewNode.append(image);
};

const renderImage = (loaderNode, cb) => {
  const file = loaderNode.files[0];
  const fileName = file.name.toLowerCase();
  const isFileMatchesToTypes = IMG_TYPES.some((it) => fileName.endsWith(it));
  if (isFileMatchesToTypes) {
    cb(file);
  }
};

const getImgPreview = () => {
  avatarLoaderNode.addEventListener('change', () => renderImage(avatarLoaderNode, getAvatarImg));
  estateLoaderNode.addEventListener('change', () => renderImage(estateLoaderNode, getEstateImg));
};

const resetImgPreview = () => {
  estatePreviewNode.innerHTML = '';
  avatarPreviewImgNode.src = 'img/muffin-grey.svg';
};

export {getImgPreview, resetImgPreview};
