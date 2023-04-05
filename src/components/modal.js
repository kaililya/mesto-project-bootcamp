import {formAddCard,popupChangeAvatar, buttomChangeAvatar, popupOpenedGlobal, inputProfileTitle, inputProfileSubtitle, profileTitle, profileSubtitle,buttonSubmitProfile, formChangeProfile, configValidation, popupChangeProfile, popupAddCard, formChangeAvatar, inputProfileAvatar} from '../utils/constants.js'
import {hideErrorBeforeOpenForm} from '../components/validate.js'
import {getProfileData, setProfileData, setAvatarData} from './profile.js' 
import {api} from './api.js'



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
    const {name, about} = getProfileData();
    inputProfileTitle.value = name;
    inputProfileSubtitle.value = about;
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
    updateButtonCaption(buttonSubmitProfile,"Сохранение...");

    api.patchProfile({name: inputProfileTitle.value, about:inputProfileSubtitle.value})
    .then((user) => {
      setProfileData(user);
      closePopup(popupChangeProfile);
    })
    .finally(() => {updateButtonCaption(buttonSubmitProfile,"Сохранить")})
}

export function updateButtonCaption(button, caption) {
    button.textContent = caption;
}

export function handleAvatarSubmit(event) {
    event.preventDefault();
    const buttonSubmitForm = formChangeAvatar.querySelector(configValidation.buttonSubmitSelector);
    updateButtonCaption(buttonSubmitForm, 'Сохранение...');

    
    api.patchAvatar({avatar: inputProfileAvatar.value})
    .then(avatar => {
        setAvatarData(avatar);

        closePopup(popupChangeAvatar);
    })
    .finally(() => {updateButtonCaption(buttonSubmitProfile,"Сохранить")})

}

export function handleNewAvatarСlick() {
    hideErrorBeforeOpenForm(formChangeAvatar, configValidation);
    openPopup(popupChangeAvatar);
  }
