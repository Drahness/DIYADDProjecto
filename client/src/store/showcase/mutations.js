
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
  state.refreshToken = response.data.accessToken.refreshToken
  state.avatar = response.data.avatar
  state.logged = true
}
export const registerState = (state, register) => {
  console.log('registerState mutation')
  state.register = register
}
