export const BASE_URL = 'https://auth.nomoreparties.co';

// метод для проверки ответа (чтобы не дублировать код во всех запросах)
const _checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
    .then(_checkResponse)
    .then((res) => {
      return res;
    })
    // блок catch лучше здесь не использовать, т.к. конец запроса в компоненте App.js
}

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
  .then(_checkResponse)
  .then((data) => {
    if(data.token) {
      localStorage.setItem('jwt', data.token);
      return data;
    }
  })
}

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  .then(_checkResponse)
}
