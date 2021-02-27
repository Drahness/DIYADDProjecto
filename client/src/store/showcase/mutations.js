import jwt from 'jsonwebtoken'

export const updateDrawerState = (state, opened) => {
  console.log('updateDrawerState mutation')
  state.drawerState = opened
}

export const updateCredentialsState = (state, newCredentials) => {
  console.log('updateCredentialsState mutation')
  state.credentials = newCredentials
}

export const doLogin = (state, response) => {
  console.log('doLogin mutation')
  state.token = response.data.accessToken.token
  state.username = jwt.decode(response.data.accessToken.token).username
  state.refreshToken = response.data.accessToken.refreshToken
  state.avatar = response.data.avatar
  state.logged = true
}
export const logout = (state) => {
  console.log('logout mutation')
  state.username = ''
  state.refreshToken = ''
  state.role = ''
  state.token = ''
  state.avatar = ''
  state.registered = false
  state.logged = false
}
export const registerState = (state, register) => {
  console.log('registerState mutation')
  state.register = register
}
