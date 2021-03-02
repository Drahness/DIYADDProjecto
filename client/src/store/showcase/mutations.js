import jwt from 'jsonwebtoken'

export const updateDrawerState = (state, opened) => {
  state.drawerState = opened
}

export const doLogin = (state, response) => {
  const decoded = jwt.decode(response.data.accessToken.token)
  state.token = response.data.accessToken.token
  state.username = decoded.username
  state.role = decoded.role
  state.exp = decoded.exp
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
  state.exp = 0
}
export const setToken = (state, data) => {
  console.log('setting token')
  state.token = data
  const exp = jwt.decode(data).exp
  if (exp) {
    console.log('setting exp', exp)
    state.exp = exp
  } else {
    console.log('elseing maxValue')
    state.exp = Number.MAX_VALUE
  }
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
