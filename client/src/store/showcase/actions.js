import { api } from 'boot/axios'
import { Notify } from 'quasar'

export function logout (state) {
  console.log('logout action')
  state.commit('logout')
  this.$router.push('/index')
}

export function login (state, form) {
  api
    .post('https://localhost:1234/login', { username: form.username, password: form.password })
    .then((response) => {
      if (response.data.ok) {
        state.commit('doLogin', response.data)
        Notify.create(
          {
            type: 'info',
            message: 'Logged in!'
          }
        )
        this.$router.push('/') // mandas la web a cierto lugar
      } else {
        console.log(response.data, 'aa')
        Notify.create(
          {
            type: 'negative',
            message: response.data.data
          }
        )
      }
    })
    .catch((err) => {
      Notify.create(
        {
          type: 'negative',
          message: 'Ha salido algo mal con el servidor ' + err
        }
      )
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
      if (response.data.ok) { // A salido bien la cosa
        Notify.create(
          {
            type: 'positive',
            message: 'User created'
          }
        )
        store.commit('registerState')
        this.$router.push('/login')
      } else {
        Notify.create(
          {
            type: 'negative',
            message: response.data.data
          }
        )
      }
    })
    .catch((...err) => {
      Notify.create({
        type: 'negative',
        message: 'Ha salido algo mal con el servidor ' + err
      })
    })
}

export function getAsignaturesFromServer (store) {
  api
    .get('https://localhost:1234/asignatures',
      {
        headers: {
          Authorization: 'Bearer ' + store.getters.getToken
        }
      })
    .then((results) => {
      if (results.data.ok) {
        store.commit('setAsignatures', results.data.data)
        store.commit('actualizarAsignSync')
      } else {
        Notify.create({
          type: 'negative',
          message: 'Ha salido algo mal con el servidor ' + results.data.data
        })
      }
    })
    .catch((err) => {
      console.log(err, 'error')
    })
}
export function getNotesFromServer (store) {
  api
    .get('https://localhost:1234/notes',
      {
        headers: {
          Authorization: 'Bearer ' + store.getters.getToken
        }
      })
    .then((results) => {
      if (results.data.ok) {
        store.commit('setNotes', results.data.data)
        store.commit('actualizarNotesSync')
      } else {
        Notify.create({
          type: 'negative',
          message: 'Ha salido algo mal con el servidor: ' + results.data.data
        })
      }
    })
    .catch((err) => {
      console.log(err, 'error')
    })
}
export function getModulsFromServer (store) {
  api
    .get('https://localhost:1234/moduls',
      {
        headers: {
          Authorization: 'Bearer ' + store.getters.getToken
        }
      })
    .then((results) => {
      if (results.data.ok) {
        console.log(results, 'results')
        store.commit('setModuls', results.data.data)
        store.commit('actualizarModulsSync')
      } else {
        Notify.create({
          type: 'negative',
          message: 'Ha salido algo mal con el servidor:' + results.data.data
        })
      }
    })
    .catch((err) => {
      console.log(err, 'error')
    })
}
