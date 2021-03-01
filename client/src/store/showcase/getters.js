/*
export function someGetter (state) {
}
*/
export function getToken (state) {
  return state.token
}
export function isLogged (state) {
  return state.logged
}
export function tokenExpiration (state) {
  return state.tokenExpiresAt
}
export function getAvatar (state) {
  return state.avatar
}
export function getUsername (state) {
  return state.username
}
export function getRole (state) {
  return state.role
}
export function isProfe (state) {
  return state.role === 'Professor'
}
export function isAlumne (state) {
  return state.role === 'Alumne'
}
export function getAsignatures (state) {
  return state.asignatures
}
export function getModuls (state) {
  return state.moduls
}
export function getNotes (state) {
  return state.notes
}
export function getLastSyncAsignatures (state) {
  return state.lastSyncAsignatures
}
export function getLastSyncModuls (state) {
  return state.lastSyncModuls
}
export function getLastSyncNotes (state) {
  return state.lastSyncNotes
}
