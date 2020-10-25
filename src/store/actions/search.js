import { hasError } from "store/actions/ui";

export const SEARCH = "SEARCH";
export const IS_SEARCHING = "IS_SEARCHING";

export const search = (filter) => {
  return (dispatch, getState) => {
    const limitPerPage = getState().search.limitPerPage;
    return dispatch(searchFn(filter, limitPerPage));
  };
};

export const searchByUrl = (url) => {
  return async (dispatch) => {
    try {
      const response = await fetch(url);

      const responseData = await response.json();

      dispatch({
        type: SEARCH,
        payload: responseData,
      });
    } catch (err) {
      dispatch(hasError(err));
    }
  };
};

export const searchWithLimit = (limit) => {
  return async (dispatch, getState) => {
    await dispatch(searchFn(getState().search.filter, limit));
  };
};

export const setIsSearching = (isSearching) => {
  return {
    type: IS_SEARCHING,
    payload: {
      isSearching,
    },
  };
};

const searchFn = (filter, limit) => {
  return async (dispatch) => {
    try {
      const params = new URLSearchParams({
        filter,
        offset: 0,
        limit,
      }).toString();
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/cities?${params}`
      );

      const responseData = await response.json();

      dispatch({
        type: SEARCH,
        payload: {
          ...responseData,
          limitPerPage: limit,
        },
      });
    } catch (err) {
      dispatch(hasError(err));
    }
  };
};
