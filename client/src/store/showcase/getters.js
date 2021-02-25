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
