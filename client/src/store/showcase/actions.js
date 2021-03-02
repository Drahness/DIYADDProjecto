import { api } from 'boot/axios'
import { Notify } from 'quasar'

export function logout (state) {
  state.commit('logout')
  this.$router.push('/index')
}
// 1614705346.229 1614705139
export function refreshToken (store) {
  console.log('dispatching refreshToken', Date.now() / 1000, store.getters.tokenExp)
  if (store.getters.tokenExp <= Date.now() / 1000) {
    console.log('refreshing tokenExp')
    api.post('/refresh', { token: store.getters.getRefreshToken })
      .then((result) => {
        if (result.data.ok) {
          store.commit('setToken', result.data.data)
        } else {
          Notify.create(
            {
              type: 'negative',
              message: result.data.data
            }
          )
        }
      })
      .catch((error) => {
        console.log(error)
        Notify.create(
          {
            type: 'negative',
            message: error
          }
        )
      })
  }
}

export function login (state, form) {
  api
    .post('/login', { username: form.username, password: form.password })
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
    .post('/register', {
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
  store.dispatch('refreshToken')
  api
    .get('asignatures',
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
  store.dispatch('refreshToken')
  api
    .get('/notes',
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
  store.dispatch('refreshToken')
  api
    .get('/moduls',
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
