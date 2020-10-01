import { createSlice } from '@reduxjs/toolkit';

// Local
import api, { descriptor } from '../api';

import { setLoading, setToast, unsetLoading } from './ui';

const NAMESPACE = 'user';

//
// Keys
//
export const key = {
  search: 'search',
  searchNext: 'searchNext',
};

//
// Slice
//
const initialState = {
  search: {
    results: [],
  },
  searchString: '',
};

const searchSlice = createSlice({
  name: NAMESPACE,
  initialState,
  reducers: {
    setSearch: (state, { payload }) => { state.search = payload; },
    setSearchNext: (state, { payload }) => {
      state.search.next = payload.next;
      state.search.results.push(...payload.results);
    },
    setSearchString: (state, { payload }) => {
      state.searchString = payload;
    },
  },
});

const { actions, reducer } = searchSlice;
const { setSearch, setSearchNext, setSearchString } = actions;
export default reducer;

//
// Selectors
//
export const selectSearch = (state) => state.search.search;

export const selectSearchString = (state) => state.search.searchString;

//
// Side effects
//
export const getSearch = (searchString, nextUrl = null) => async (dispatch) => {
  let thisKey = key.search;
  if (nextUrl) {
    thisKey = key.searchNext;
  }
  try {
    dispatch(setLoading(NAMESPACE, thisKey));
    const data = await api(descriptor.getSearch(searchString), nextUrl);
    if (nextUrl) {
      dispatch(setSearchNext(data));
    } else {
      dispatch(setSearch(data));
    }
    dispatch(setSearchString(searchString));
  } catch (error) {
    dispatch(setToast('Something went wrong', 'error'));
    console.error(error);
  } finally {
    dispatch(unsetLoading(NAMESPACE, thisKey));
  }
};
