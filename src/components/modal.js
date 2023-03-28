import {popupOpenedGlobal, inputProfileTitle, inputProfileSubtitle, profileTitle, profileSubtitle, formChangeProfile, configValidation, popupChangeProfile, popupAddCard} from '../utils/constants.js'
import {hideErrorBeforeOpenForm} from '../components/validate.js'


export function handleNewCardСlick() {
    openPopup(popupAddCard);
  }

export function openPopup(popup) {
    popup.classList.add(popupOpenedGlobal);
    document.addEventListener('keydown',closeWithEscape)
}
  
export function closePopup(popup) {
    popup.classList.remove(popupOpenedGlobal);
    document.removeEventListener('keydown',closeWithEscape);
}

export function closeWithEscape(event) {
    if (event.key === 'Escape') {
        const currentPopup = document.querySelector('.popup_opened');
    closePopup(currentPopup);    
    }
}


export function openProfile() {
    inputProfileTitle.value = profileTitle.textContent;
    inputProfileSubtitle.value = profileSubtitle.textContent;
    hideErrorBeforeOpenForm(formChangeProfile, configValidation);
    openPopup(popupChangeProfile);
}

export function closeWithClickOnOverlay(event, currentPopup, closingElement) {
    const withinBoundaries = event.composedPath().includes(closingElement);
    if (! withinBoundaries) {
        closePopup(currentPopup);   
    }
};

export function handleProfileSubmit(event) {
    event.preventDefault();

    profileTitle.textContent = inputProfileTitle.value;
    profileSubtitle.textContent = inputProfileSubtitle.value;
    closePopup(popupChangeProfile);
}
