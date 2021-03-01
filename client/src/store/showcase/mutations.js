import jwt from 'jsonwebtoken'

export const updateDrawerState = (state, opened) => {
  state.drawerState = opened
}
export const updateCredentialsState = (state, newCredentials) => {
  state.credentials = newCredentials
}
export const doLogin = (state, response) => {
  state.token = response.data.accessToken.token
  state.username = jwt.decode(response.data.accessToken.token).username
  state.role = jwt.decode(response.data.accessToken.token).role
  state.refreshToken = response.data.accessToken.refreshToken
  state.avatar = response.data.avatar
  state.logged = true
}
export const logout = (state) => {
  state.username = ''
  state.refreshToken = ''
  state.role = ''
  state.token = ''
  state.avatar = ''
  state.logged = false
}
export const setAsignatures = (state, data) => {
  state.asignatures = data
}
export const setModuls = (state, data) => {
  state.moduls = data
}
export const setNotes = (state, data) => {
  state.notes = data
}
export const actualizarAsignSync = (state) => {
  state.lastSyncAsignatures = Date.now()
}
export const actualizarNotesSync = (state) => {
  state.lastSyncNotes = Date.now()
}
export const actualizarModulsSync = (state) => {
  state.lastSyncNotes = Date.now()
}
