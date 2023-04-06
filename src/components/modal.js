import {buttonSubmitForm, popupChangeAvatar, popupOpenedGlobal, inputProfileTitle, inputProfileSubtitle, buttonSubmitProfile, formChangeProfile, configValidation, popupChangeProfile, popupAddCard, formChangeAvatar, inputProfileAvatar} from '../utils/constants.js'
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

export function renderLoading(isLoading, button, buttonText='Сохранить', loadingText='Сохранение...') {
    if (isLoading) {
      button.textContent = loadingText
    } else {
      button.textContent = buttonText
    }
  }
  
  // можно сделать универсальную функцию, которая принимает функцию запроса, объект события и текст во время загрузки
  function handleSubmit(request, evt, buttonText='Сохранить', loadingText = "Сохранение...") {
   // всегда нужно предотвращать перезагрузку формы при сабмите
    evt.preventDefault();
  
    // универсально получаем кнопку сабмита из `evt`
    const submitButton = evt.submitter;
    // записываем начальный текст кнопки до вызова запроса
    const initialText = submitButton.textContent;
    // изменяем текст кнопки до вызова запроса
    renderLoading(true, submitButton, initialText, loadingText);
    request()
      .then(() => {
        // любую форму нужно очищать после успешного ответа от сервера
        // а так же `reset` может запустить деактивацию кнопки сабмита (смотрите в `validate.js`)
        evt.target.reset();
      })
      .catch((err) => {
        // в каждом запросе нужно ловить ошибку
        console.error(`Ошибка: ${err}`);
      })
      // в каждом запросе в `finally` нужно возвращать обратно начальный текст кнопки
      .finally(() => {
        renderLoading(false, submitButton, initialText);
      });
  }
  

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
    updateButtonCaption(event.submitter, 'Сохранение...');

    
    api.patchAvatar({avatar: inputProfileAvatar.value})
    .then(avatar => {
        setAvatarData(avatar);

        closePopup(popupChangeAvatar);
    })
    .finally(() => {updateButtonCaption(event.submitter,"Сохранить")})

}

export function handleNewAvatarСlick() {
    hideErrorBeforeOpenForm(formChangeAvatar, configValidation);
    openPopup(popupChangeAvatar);
  }
