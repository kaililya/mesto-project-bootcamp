import {cardTemplate, inputCardName, inputCardlink, cardContainer, popupAddCard, popupImage, popupTitle, popupOpenImage, formAddCard, configValidation} from '../utils/constants.js'
import {closePopup,openPopup, updateButtonCaption} from './modal.js'
import {toggleButton} from '../components/validate.js'
import {api} from './api.js'


export function handleAddCard(event) {
    event.preventDefault();
    const buttonSubmitForm = formAddCard.querySelector(configValidation.buttonSubmitSelector);
    updateButtonCaption(buttonSubmitForm, 'Сохранение...');

    const newCard = {name: inputCardName.value, link: inputCardlink.value}; 
    

    Promise.all([api.postCard(newCard), api.getProfile()])
    .then(([card,user]) => {
      const {name, about, _id} = user; 
      addCard(cardContainer, {name: card.name, link: card.link, massiveLikes: card['likes'], cardId: card['_id'], cardOwner: card['owner'], userAuthorized: user}, 'y');

      event.target.reset();
      toggleButton(formAddCard, buttonSubmitForm);
      closePopup(popupAddCard);

    })
    .catch((res) => {console.log(res)})
    .finally(() => {
      updateButtonCaption(buttonSubmitForm,"Сохранить")
    })

  }
  
export function deleteCard(event) {
    event.target.closest('.card').remove();
  }
  
export function likeCard(event) {
    event.target.classList.toggle('card__buttom-like_active');
  }

export function createCard(card, deleteable) {

      const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
      const cardElementImage = cardElement.querySelector('.card__image');
      const cardElementTitle = cardElement.querySelector('.card__title');
      const cardButtonLike = cardElement.querySelector('.card__buttom-like');
      const cardElementLikeNumber = cardElement.querySelector('.card__like-number');
      const cardButtonDelete = cardElement.querySelector('.card__buttom-delete');
      
      cardElementImage.src = card.link;
      cardElementImage.alt = card.name;
      cardElementImage.id = card.cardId;
      cardElementTitle.textContent = card.name;
         
      cardElementLikeNumber.textContent = card.massiveLikes['length']; // кол-во лайков у карточки (число)

      // массив id'шников лайкнушивх карточку пользователй
      const listLikes = card.massiveLikes.map((liker) => liker['_id'])
      cardElementLikeNumber.id = listLikes;

      

      if (listLikes.includes(card.userAuthorized['_id'])) {
        cardButtonLike.classList.add('card__buttom-like_active') // для смены состояния есть функция, но она работает только в слушателе
      }

      function openImage() {
        popupImage.alt = card.name;
        popupImage.src = card.link;
        popupTitle.textContent = card.name;
        openPopup(popupOpenImage)
      }

      // если карточка моя - сохраянем фичу удаления, иначе удаляем кнопку удаления карточки
      if (deleteable === 'y') { 
        cardButtonDelete.addEventListener('click', deleteCard);
        cardButtonDelete.addEventListener('click', (event) => {
          const idCurrentCard = event.target.closest('.card').querySelector('.card__image').id;
          api.deleteCard(idCurrentCard)
          .catch(console.dir)
        })
      } else {
        cardButtonDelete.remove();
      }

      cardButtonLike.addEventListener('click', (event) => {
        const idCurrentCard = event.target.closest('.card').querySelector('.card__image').id;
        const listLikers = event.target.closest('.card').querySelector('.card__like-number').id;
        api.getProfile()
        .then((res) => {
          if (listLikers.split(',').includes(res['_id'])) {
            api.deleteLike(idCurrentCard)
            .then((res) => {
              cardElementLikeNumber.textContent = res['likes']['length'];
              const listLikes = res['likes'].map((liker) => liker['_id'])
              cardElementLikeNumber.id = listLikes;
              // console.log('Я снял лайк')
            })
            .catch(console.dir)
            .finally(() => {likeCard(event);})
          } else {
            api.putLike(idCurrentCard)
            .then((res) => {
              cardElementLikeNumber.textContent = res['likes']['length'];
              const listLikes = res['likes'].map((liker) => liker['_id'])
              cardElementLikeNumber.id = listLikes;
              // console.log('Я поставил лайк')
            })
            .catch(console.dir)
            .finally(() => {likeCard(event);})
            }
        })
      })
      
      cardElementImage.addEventListener('click', openImage);
  
      return cardElement;
  }
  
export function addCard(cardsList, currentCard, deleteable) {
      return cardsList.append(createCard(currentCard, deleteable));
}


