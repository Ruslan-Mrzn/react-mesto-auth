export const BASE_URL ='http://localhost:3000'; // 'https://api.murzinruslan.students.nomoredomains.monster'

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
    credentials: 'include', // теперь куки посылаются вместе с запросом
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
    credentials: 'include', // теперь куки посылаются вместе с запросом
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
  .then(_checkResponse)
  .then((data) => data)
}

export const getContent = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    credentials: 'include', // теперь куки посылаются вместе с запросом
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .then(_checkResponse)
}

export const logout = () => {
  return fetch(`${BASE_URL}/signout`, {
    method: 'POST',
    credentials: 'include', // теперь куки посылаются вместе с запросом
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .then(_checkResponse)
}
