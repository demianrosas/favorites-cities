import { hasError } from "store/actions/ui";

let controller = null;

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
      if (controller) {
        controller.abort();
      }
      controller = new AbortController();

      const params = new URLSearchParams({
        filter,
        offset: 0,
        limit,
      }).toString();
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/cities?${params}`,
        { signal: controller.signal }
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
      if (err.name !== "AbortError") {
        dispatch(hasError(err));
      }
    }
  };
};
