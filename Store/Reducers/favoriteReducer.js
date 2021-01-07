const initialState = { favoritesFilm : [] }

function toggleFavorite(state = initialState, action ){
  let nexState
  switch (action.type) {
    case 'TOGGLE_FAVORITE':
      const favoriteFilmIndex = state.favoritesFilm.findIndex(item => item.id === action.value.id)
      if(favoriteFilmIndex !== -1 ){
        //suppression
        nexState = {
          ...state,
          favoritesFilm : state.favoritesFilm.filter((item,index) => index !== favoriteFilmIndex)
        }
      }else{
        //ajouter
        nexState = {
          ...state,
          favoritesFilm : [...state.favoritesFilm,action.value]
        }
      }
      return nexState || state
    default:
      return state

  }
}

export default toggleFavorite
