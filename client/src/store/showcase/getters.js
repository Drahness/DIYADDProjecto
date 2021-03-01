/*
export function someGetter (state) {
}
*/
export function isLogged (state) {
  console.log(state)
  return state.logged
}
export function isExpired (state) {
  return false
}
export function getNotes (state) {
  return false
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
