export function showError(formElement, inputElement, config) {
    const spanWithError = formElement.querySelector('#error-' + inputElement.id);
    spanWithError.textContent = inputElement.validationMessage;
    inputElement.classList.add(config.inputErrorClass); 
}
  
export function hideError(formElement, inputElement, config) {
    const spanWithError = formElement.querySelector('#error-' + inputElement.id);
    spanWithError.textContent = '';
    inputElement.classList.remove(config.inputErrorClass); 
}
  
export function hideErrorBeforeOpenForm(formElement, config) {
    Array.from(formElement.querySelectorAll(config.inputSelector)).forEach((inputElement) => {
      hideError(formElement, inputElement, config);
    })
}
  
export function checkInputValidity(formElement, inputElement, config) {
    if (!inputElement.validity.valid) {
      showError(formElement, inputElement, config);
    } else {
      hideError(formElement, inputElement, config);
    }
}
  
export function toggleButton(formElement, buttonSubmitForm) {
    if (formElement.checkValidity()) {
      buttonSubmitForm.disabled = false;
    } else {
      buttonSubmitForm.disabled = true;
    }
}
  
export function setEventListener (formElement, config) {
    const inputList = formElement.querySelectorAll(config.inputSelector);
    const buttonSubmitForm = formElement.querySelector(config.buttonSubmitSelector);
  
    toggleButton(formElement, buttonSubmitForm);
    inputList.forEach((input) => {
      input.addEventListener('input', () => {
        checkInputValidity(formElement, input, config);
        toggleButton(formElement, buttonSubmitForm);
      });
    });
}
  
export function enableValidation(config) {
    const formList = document.querySelectorAll(config.formSelector);
    formList.forEach((form) => {
      setEventListener(form, config)
    });
}
