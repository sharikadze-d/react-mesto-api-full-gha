const BASE_URL = 'https://api.mesto.dsharikdaze.nomoredomains.rocks';

const handleResponse = res => {
  return res.json()
    .then(res => {
      if (!res.message) return res;
      return Promise.reject(new Error(res.message));
    })
}

//Регистрация
export function register (email, password) {
  return fetch(`${BASE_URL}/signup`, {
    headers: { "Content-Type": "application/json" },
    method: 'POST',
    body: JSON.stringify({
      password: password,
      email: email
    })
  })
  .then(handleResponse)
}

//Авторизация
export function authorize (email, password) {
  return fetch(`${BASE_URL}/signin`, {
    headers: { "Content-Type": "application/json" },
    method: 'POST',
    body: JSON.stringify({
      password: password,
      email: email
    })
  })
  .then(handleResponse)
}

//Получение данных по токену
export function getUserData(token) {
  return fetch(`${BASE_URL}/users/me`, {
    headers: { 
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}` },
    method: 'GET'
  })
  .then(handleResponse)
}

export function getInitialCardsData(token) {
  return fetch(`${BASE_URL}/cards`, {
    headers: { 
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}` },
    method: 'GET'
} )
  .then(handleResponse)
}
