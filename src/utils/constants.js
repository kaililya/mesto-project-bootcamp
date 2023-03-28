export const popupOpenedGlobal = 'popup_opened';

export const popupChangeProfile = document.querySelector('.popup-change-profile');
export const popupAddCard = document.querySelector('.popup-add-card');
export const popupOpenImage = document.querySelector('.popup-open-image');
export const popupImage = popupOpenImage.querySelector('.popup__image');
export const popupTitle = popupOpenImage.querySelector('.popup__title');

export const formChangeProfile = document.querySelector('.form-profile')
export const formAddCard = document.querySelector('.form-card');

export const buttonAddCard = document.querySelector('.profile__buttom-add');
export const buttonChangeDescription = document.querySelector('.profile__buttom-change-descrition');

export const profileTitle = document.querySelector('.profile__title');
export const profileSubtitle = document.querySelector('.profile__subtitle');

export const inputProfileTitle = document.querySelector('.form__input-profile-title');
export const inputProfileSubtitle = document.querySelector('.form__input-profile-subtitle');

export const inputCardName = document.querySelector('.form__input-card-name');
export const inputCardlink = document.querySelector('.form__input-card-link');

export const cardContainer = document.querySelector('.cards__list');
export const cardTemplate = document.querySelector('.card-template').content;

export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const configValidation = {
  formSelector: '.form',
  inputSelector: '.form__input',
  buttonSubmitSelector: '.form__button-update',
  inputErrorClass: 'form__input_error'
};

