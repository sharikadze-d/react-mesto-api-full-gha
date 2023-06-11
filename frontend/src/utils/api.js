const apiConfig = {
  url: 'https://api.mesto.dsharikdaze.nomoredomains.rocks',
  headers: {
    'Content-Type': 'application/json',
    authorization: `Bearer ${localStorage.getItem('jwt')}`
  }
}

const handleResponse = res => { //Обработка ответа
  if (res.ok) {
    if (res.item) { return res.item };
    return res.json();
  }
  return Promise.reject(new Error(`Ошибка: ${res.status}`));
}

class Api {
  constructor({ url, headers}) {
    this._url = url;
    this._headers = headers
  }

  //Получение данных пользователя
  getUserData() {
    return fetch(`${this._url}/users/me`, { headers: this._headers })
    .then(handleResponse)
  }

  //Установка данных пользователя
  setUserData({ name, about }) {
    return fetch(`${this._url}/users/me`, { 
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        name: name,
        about: about
      })
     })
    .then(handleResponse)
  }

  //Получение данных карточек "из коробки"
  getInitialCardsData(token) {
    return fetch(`${this._url}/cards`, { headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`
    } })
    .then(handleResponse)
  }

  //Отправка данных карточки на сервер
  setCardData( {name, link } ) {
    return fetch(`${this._url}/cards`, { 
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({
        name: name,
        link: link
       })
      })
    .then(handleResponse)
  }

  //Удаление данных карточки с сервера
  deleteCard(item) {
    return fetch(`${this._url}/cards/${item._id}`, {
      headers: this._headers,
      method: 'DELETE'
    })
    .then((res) => {
      res.item = item;
      return res;
    })
    .then(handleResponse)
  }

  changeLikeCardStatus( card, isLiked) {
    return fetch(`${this._url}/cards/${card._id}/likes`, {
      headers: this._headers,
      method: `${isLiked ? 'DELETE' : 'PUT'}`
    })
    .then(handleResponse)
  }

  //установка аватара
  setAvatar( link ) {
    return fetch(`${this._url}/users/me/avatar`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        avatar: link
       })
    })
    .then(handleResponse);
  }
}

const api = new Api(apiConfig)
export default api;