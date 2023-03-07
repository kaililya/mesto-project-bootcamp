
// Навешиваем событие появления формы
let buttonChangeDescription = document.querySelector('.profile .profile__buttom-change-descrition');
buttonChangeDescription.addEventListener('click', function () {
    document.querySelector('.popup').classList.add('popup_opened');});


// Навешиваем событие закрытия формы, если ничего менять не нужно
let buttonHide = document.querySelector('.buttom-hide');
buttonHide.addEventListener('click', function () {
    document.querySelector('.popup').classList.remove('popup_opened');});


// Навешиваем событие отправки формы как при помощи Enter,
// так и при помощи кнопки
let form = document.querySelector('.form')
form.addEventListener('submit', function(event) {
    event.preventDefault()

    // Берем новые значения из формы
    // Выбираем элемент, который нужно изменить
    // Меняем текстовое содержимое элемента
    document.querySelector('.profile__title').textContent = document.querySelector('.form__input_title').value;
    document.querySelector('.profile__subtitle').textContent = document.querySelector('.form__input_subtitle').value;

    // Закрываем форму
    document.querySelector('.popup').classList.remove('popup_opened');   
});

// function listner(typeOfEvent, someForm='none', somePopup='none', classPopupOpened='none', massiveOfInputsFromForm='none', massiveOfInterstingTags='none',classButtomFromHtml='none, typeOfButtonAction='none') {
//     if (typeOfEvent === 'submit') {
//         someForm.addEventListener('submit', function(event) {
//             event.preventDefault()
//             for (let i = 0; i <= massiveOfInputs.length; i += 1){
//                 document.querySelector('.${massiveOfInterstingTags[i]}').textContent = document.querySelector('.${massiveOfInputsFromForm[i]}').value;
//             } 
//         if (popup !== 'none') {
//             document.querySelector('.${somePopup}').classList.remove('.{classPopupOpened}'); 
//         } else {
//             let just = 228
//         }
        
//         });
//     } else {
//         typeOfEvent = 'click';
//         let innerButton = document.querySelector('.classButtomFromHtml');
//         document.querySelector('.${somePopup}').classList.remove('popup_opened');});
//     }
// };

