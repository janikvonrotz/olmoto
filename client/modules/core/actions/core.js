export default {
  setLocalState({Meteor, LocalState}, field){
    LocalState.set(Object.keys(field)[0], field);
  },
}
