export default {
  setLocalState({Meteor, LocalState}, field){
    console.log(field)
    LocalState.set(Object.keys(field)[0], field);
  },
}
