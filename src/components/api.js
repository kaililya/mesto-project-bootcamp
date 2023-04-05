// Токен: 0a794f82-8707-4ab9-84a6-76fc4dbd55c1
// Идентификатор группы: wbf-cohort-7


export const config = {
  baseUrl: 'https://nomoreparties.co/v1/wbf-cohort-7',
  headers: {
    authorization: '0a794f82-8707-4ab9-84a6-76fc4dbd55c1',
    'Content-Type': 'application/json'
  }
}


function checkResponse(res){
  if (res.ok) {
     return res.json(); 
    };
 return res.json() 
   .then((err) => {
     err.statusCode = res.status;
    return Promise.reject(err);
  });
}


const getCards = () => {
    return fetch(`${config.baseUrl}/cards`,
    {
  headers: config.headers,
  method: 'GET'
})
  .then(checkResponse);   
}

function getCardId(idCard) {
  return fetch(`${config.baseUrl}/cards/${idCard}`, {
    headers: config.headers,
    method: 'GET'
  })
  .then(checkResponse);   
}

const postCard = (data) => {
  return fetch(`${config.baseUrl}/cards`,
    {
  headers: config.headers,
  method: 'POST',
  body: JSON.stringify(data)
})
  .then(checkResponse);   
}

function deleteCard(idCard) {  
  // Вместо cardId в URL нужно подставить свойство _id соответствующей карточки.
  return fetch(`${config.baseUrl}/cards/${idCard}`, {
    headers: config.headers,
    method: 'DELETE'
  })
  .then(checkResponse);   
}

const getProfile = () => {
  return fetch(`${config.baseUrl}/users/me`,{
    headers: config.headers,
    method: 'GET'
  })
  .then(checkResponse)   
}


function patchProfile(data) {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
    method: 'PATCH',
    body: JSON.stringify(data)
  })
  .then(checkResponse)   
} 

const getAvatar = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
    method: 'GET'
  })
  .then(checkResponse)   
}


function patchAvatar(data) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    headers: config.headers,
    method: 'PATCH',
    body: JSON.stringify(data)
  })
  .then(checkResponse)   
} 



function putLike(idCard) {  
  return fetch(`${config.baseUrl}/cards/likes/${idCard}`, {
    headers: config.headers,
    method: 'PUT'
  })
  .then(checkResponse);   
}

function deleteLike(idCard) {  
  return fetch(`${config.baseUrl}/cards/likes/${idCard}`, {
    headers: config.headers,
    method: 'DELETE'
  })
  .then(checkResponse);   
}

const api = {
  getProfile,
  getCards,
  patchProfile,
  postCard,
  getAvatar,
  patchAvatar,
  putLike,
  deleteLike,
  deleteCard,
}

export {api}
