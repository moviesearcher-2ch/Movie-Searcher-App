import { put, takeLatest, call } from "redux-saga/effects";
import * as types from "./ActionTypes.js";
import XHRProvider from "./DataProvider/XHRProvider.js";

const xhr = new XHRProvider();

function* fetchSearchMovies(action, page = 1) {
  const response = yield call(xhr.requestApi, `search/movie`, {
    query: action.searchPredicate,
    page: action.page
  });
  yield put({ type: types.GET_MOVIES, value: response.results });
}

// function* fetchSingleMovie(action) {
//   const response = yield call(xhr.requestApi, `search/movie/${action.movieId}`);
//   yield put({ type: types.GET_SINGLE_MOVIE, value: response.results });
// }

function* fetchGenres(action) {
  const response = yield call(
    xhr.requestApi,
    "genre/movie/list?&language=en-US&"
  );
  yield put({ type: types.GET_GENRES, value: response.genres });
}

function* fetchByGenres(action, page = 1) {
  const response = yield call(
    xhr.requestApi,
    `discover/movie?&with_genres=${action.ids.join()}&page=${page}`
  );
  yield put({ type: types.GET_MOVIES, value: response.results });
}

function* fetchAutocompleteMovies(action) {
  const response = yield call(xhr.requestApi, `search/movie`, {
    query: action.searchPredicate
  });
  yield put({ type: types.GET_AUTOCOMPLETE_MOVIES, value: response.results });
}

export function* watchFetches() {
  yield takeLatest(types.FETCH_SEARCH_MOVIES, fetchSearchMovies);
  yield takeLatest(types.FETCH_GENRES, fetchGenres);
  yield takeLatest(types.FETCH_BY_GENRES, fetchByGenres);
  yield takeLatest(types.FETCH_AUTOCOMPLETE_MOVIES, fetchAutocompleteMovies);
  // yield takeLatest(types.FETCH_SINGLE_MOVIE, fetchSingleMovie);
}

export default watchFetches;
