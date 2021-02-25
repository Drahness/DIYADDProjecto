import { api } from 'boot/axios'
import { Notify } from 'quasar'

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
        this.$router.push('/')
      } else {
        Notify.create(
          {
            type: 'negative',
            message: response.data.err.msg
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
            message: response.data.err.msg
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
