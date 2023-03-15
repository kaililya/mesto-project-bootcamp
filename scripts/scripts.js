const popupChangeProfile = document.querySelector('.popup-change-profile');
const popupAddCard = document.querySelector('.popup-add-card');
const popupOpenImage = document.querySelector('.popup-open-image');

const popupImage = popupOpenImage.querySelector('.popup__image');
const popupTitle = popupOpenImage.querySelector('.popup__title');

const popupGlobal = document.querySelector('.popup');


const formChangeProfile = document.querySelector('.form-profile')
const formAddCard = document.querySelector('.form-card');

const buttonAddCard = document.querySelector('.profile__buttom-add');
const buttonChangeDescription = document.querySelector('.profile__buttom-change-descrition');

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const inputCardName = document.querySelector('.form__input-card-name');
const inputCardlink = document.querySelector('.form__input-card-link');

const cardContainer = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('.card-template').content;

function openPopup(popup) {
  popup.classList.add(popupOpenedGlobal);
}

function closePopup(popup) {
  popup.classList.remove(popupOpenedGlobal);
}

function handleNewCardСlick() {
  openPopup(popupAddCard);
}

function openProfile () {
  document.querySelector('.form__input-profile-title').value = profileTitle.textContent;
  document.querySelector('.form__input-profile-subtitle').value = profileSubtitle.textContent;
  openPopup(popupChangeProfile);
}

function handleProfileSubmit (event) {
  event.preventDefault()

  profileTitle.textContent = document.querySelector('.form__input-profile-title').value;
  profileSubtitle.textContent = document.querySelector('.form__input-profile-subtitle').value;

  closePopup(popupChangeProfile);
}

function handleAddCard(event) {
  event.preventDefault()
  const newCard = {name: inputCardName.value, link: inputCardlink.value}; 
  addCard(cardContainer, newCard); 
  event.target.reset();
  closePopup(popupAddCard);
}

function deleteCard(event) {
  event.target.closest('.card').remove();
}

function LikeCard(event) {
  event.target.classList.toggle('card__buttom-like_active');
}

function createCard(card) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardElementImage = cardElement.querySelector('.card__image');
    const cardElementTitle = cardElement.querySelector('.card__title');
    const cardButtonLike = cardElement.querySelector('.card__buttom-like');
    const cardButtonDelete = cardElement.querySelector('.card__buttom-delete');

    cardElementImage.src = card.link;
    cardElementImage.alt = card.name;
    cardElementTitle.textContent = card.name;

    function openImage() {
      popupImage.alt = card.name;
      popupImage.src = card.link;
      popupTitle.textContent = card.name;
      openPopup(popupOpenImage)
    }

    cardButtonDelete.addEventListener('click',deleteCard);
    cardButtonLike.addEventListener('click', LikeCard);
    cardElementImage.addEventListener('click', openImage);

    return cardElement;
}


function addCard(cardsList, currentCard) {
    return cardsList.prepend(createCard(currentCard));
}

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
}

addEventListeners();

initialCards.forEach((card) => addCard(cardContainer, card));


