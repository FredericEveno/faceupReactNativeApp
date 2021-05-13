export default (imagesList = [], action) => {
  if(action.type === 'addUrl') {
    console.log('action.imageslist', action.url);
    return [...imagesList, action.url]; /* On récupere l'URL de l'image et on la pousse 
    dans la liste */
  } else {
    return imagesList;
  }
}