// import state from "../DIYADDStore/state";

export function someMutation (/* state */) {
}

export function changeDrawerOpened (state, opened) {
  console.log('entered mutation changeDrawerOpened()', opened)
  state.drawerOpened = opened
}
