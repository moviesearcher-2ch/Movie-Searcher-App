import * as types from "./ActionTypes.js";

const initialState = {
  movies: [],
  genres: [],
  autocompleteMovies: [],
  currentMovie: {}
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_MOVIES:
      return {
        ...state,
        movies: action.value
      };
    case types.GET_AUTOCOMPLETE_MOVIES:
      return {
        ...state,
        autocompleteMovies: action.value
      };
    case types.GET_GENRES:
      return {
        ...state,
        genres: action.value
      };
    // case types.GET_SINGLE_MOVIE:
    //   return {
    //     ...state,
    //     currentMovie: action.value
    //   };
    default:
      return state;
  }
};
