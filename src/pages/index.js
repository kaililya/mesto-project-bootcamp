import './index.css';
import {enableValidation} from '../components/validate.js'
import {closePopup, openProfile, closeWithClickOnOverlay, handleProfileSubmit, handleNewCardСlick, handleNewAvatarСlick,handleAvatarSubmit} from '../components/modal.js'
import {handleAddCard, addCard} from '../components/card.js'
import {configValidation, popupChangeProfile, formChangeProfile, popupAddCard, formAddCard, formChangeAvatar, cardContainer, buttonAddCard, buttonChangeDescription, popupImage, popupOpenImage, buttomChangeAvatar, popupChangeAvatar} from '../utils/constants.js'
import {api} from '../components/api';
import {setProfileData,setAvatarData} from '../components/profile';



export function InitialData() {
  Promise.all([api.getCards(), api.getProfile(), api.getAvatar()])
  .then(([cards, user, avatarka]) => {
    const {name, about, _id} = user; 
    setProfileData(user);
    setAvatarData(avatarka);

    cards.forEach((card) => {

      if (user['_id'] === card.owner['_id']) {
        addCard(cardContainer, {name: card.name, link: card.link, massiveLikes: card['likes'], cardId: card['_id'], cardOwner: card['owner'], userAuthorized: user}, 'y');
      } else {
        addCard(cardContainer, {name: card.name, link: card.link, massiveLikes: card['likes'], cardId: card['_id'], cardOwner: card['owner'], userAuthorized: user}, 'n');
      }
    })
  })
  .catch(console.dir)
  .finally(() => {console.log('Попытка загрузки данных завершена')})
}

InitialData();

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
  formChangeAvatar.addEventListener('submit', handleAvatarSubmit)
  buttonAddCard.addEventListener('click', handleNewCardСlick);
  buttonChangeDescription.addEventListener('click', openProfile);
  buttomChangeAvatar.addEventListener('click', handleNewAvatarСlick);

  popupOpenImage.addEventListener('click', (event) => {
    closeWithClickOnOverlay(event, popupOpenImage, popupImage);
  });

  popupChangeProfile.addEventListener('click', (event) => {
    closeWithClickOnOverlay(event, popupChangeProfile, formChangeProfile);
  });

  popupAddCard.addEventListener('click', (event) => {
    closeWithClickOnOverlay(event, popupAddCard, formAddCard);
  });

  popupChangeAvatar.addEventListener('click', (event) => {
    closeWithClickOnOverlay(event, popupChangeAvatar, formChangeAvatar);
  });
}

addEventListeners();
  

enableValidation(configValidation);


// сбработает call back если не было catch у промиса

window.addEventListener('unhandledrejection', (evt) => {
  console.error('Необработанная ошибка.\nМесто возникновения: ');
  console.error(evt.promise);
  console.error('Информация об ошибке:');
  console.error(evt.reason);
});



// async function anotherInitialData() {
//   try {  
//     const [cards, user] = await Promise.all([api.getCards(), api.getProfile()]);
//     const {name, about, _id} = user; 

//     profileTitle.textContent = name;
//     profileSubtitle.textContent = about;

//     cards.forEach(({link, name: place}) => {
//       addCard(cardContainer, {name: place, link});

//     })
//     } catch(err) {
//       console.log("Сработал catch")
//       console.dir(err)
//     } finally {
//       console.log('Попытка загрузки данных завершена');
//     }

//     }
  