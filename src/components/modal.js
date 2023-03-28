import {popupOpenedGlobal, inputProfileTitle, inputProfileSubtitle, profileTitle, profileSubtitle, formChangeProfile, configValidation, popupChangeProfile} from '../utils/constants.js'
import {HideErrorBeforeOpenForm} from '../components/validate.js'


export function openPopup(popup) {
    popup.classList.add(popupOpenedGlobal);
}
  
export function closePopup(popup) {
    popup.classList.remove(popupOpenedGlobal);
}

export function openProfile() {
    inputProfileTitle.value = profileTitle.textContent;
    inputProfileSubtitle.value = profileSubtitle.textContent;
    HideErrorBeforeOpenForm(formChangeProfile, configValidation);
    openPopup(popupChangeProfile);
}

export function closeWithEscape(event, formElement) {
    if (event.key === 'Escape') {
    closePopup(formElement);    
    }
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
