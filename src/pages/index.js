import './index.css';
import {handleNewCardСlick,  HideErrorBeforeOpenForm, checkInputValidity, toggleButton, setEventListener, enableValidation} from '../components/validate.js'
import {openPopup, closePopup, openProfile, closeWithEscape, closeWithClickOnOverlay, handleProfileSubmit} from '../components/modal.js'
import {handleAddCard, deleteCard, likeCard, createCard, addCard} from '../components/card.js'
import {configValidation, initialCards, popupChangeProfile, formChangeProfile, popupAddCard, formAddCard, cardContainer, buttonAddCard, buttonChangeDescription, popupImage, popupOpenImage} from '../utils/constants.js'



function addEventListeners() {
  document.querySelectorAll('.popup__buttom-hide')
  .forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => {
      closePopup(popup);
    });
  });
  formAddCard.addEventListener('submit', handleAddCard);
  formChangeProfile.addEventListener('submit', handleProfileSubmit); 
  buttonAddCard.addEventListener('click', handleNewCardСlick);
  buttonChangeDescription.addEventListener('click', openProfile);

  popupOpenImage.addEventListener('click', (event) => {
    closeWithClickOnOverlay(event, popupOpenImage, popupImage);
  });

  popupChangeProfile.addEventListener('click', (event) => {
    closeWithClickOnOverlay(event, popupChangeProfile, formChangeProfile);
  });

  popupAddCard.addEventListener('click', (event) => {
    closeWithClickOnOverlay(event,popupAddCard, formAddCard);
  });

  document.addEventListener('keydown', (event) => {
    closeWithEscape(event, popupChangeProfile);
    closeWithEscape(event, popupAddCard);
    closeWithEscape(event, popupOpenImage);
  });
}

addEventListeners();

initialCards.forEach((card) => addCard(cardContainer, card));
  

enableValidation(configValidation);
