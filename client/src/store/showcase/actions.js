import { api } from 'boot/axios'

export function login (state, form) {
  api
    .post('https://localhost:1234/login', { username: form.username, password: form.password })
    .then((response) => {
      if (response.data.ok) {
        state.commit('doLogin', response.data)
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

export function register (store, form) {
  api
    .post('https://localhost:1234/register', {
      username: form.username,
      password: form.password,
      full_name: form.full_name,
      dni: form.dni,
      avatar: form.avatar
    })
    .then((response) => {
      if (response.data.ok) {
        store.commit('showcase/registerState')
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
