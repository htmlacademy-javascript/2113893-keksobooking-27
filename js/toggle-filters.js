// Модуль переключения режимов страницы между неактивным и активным

const deactivateFilters = (formFilters, mapFilters) => {
  formFilters.classList.add('ad-form--disabled');
  formFilters.querySelectorAll('fieldset').forEach((fieldset) => {
    fieldset.disabled = true;
  });
  mapFilters.classList.add('map__filters--disabled');
  mapFilters.querySelectorAll('fieldset').forEach((fieldset) => {
    fieldset.disabled = true;
  });
};

const activateFilters = (formFilters, mapFilters) => {
  formFilters.classList.remove('ad-form--disabled');
  formFilters.querySelectorAll('fieldset').forEach((fieldset) => {
    fieldset.disabled = false;
  });
  mapFilters.classList.remove('map__filters--disabled');
  mapFilters.querySelectorAll('fieldset').forEach((fieldset) => {
    fieldset.disabled = false;
  });
};

export {deactivateFilters, activateFilters};
