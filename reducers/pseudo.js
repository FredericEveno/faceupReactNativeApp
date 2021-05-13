export default (pseudo='[]', action) => {
  if(action.type === 'savePseudo') {
    console.log('action.pseudo', action.pseudo);
    return pseudo = action.pseudo;
  } else {
    return pseudo;
  }
}