export const SEARCH = "SEARCH";
export const IS_SEARCHING = "IS_SEARCHING";

export const search = (filter, offset, limit) => {
  return async (dispatch) => {
    const params = new URLSearchParams({
      filter,
      offset,
      limit,
    }).toString();
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/cities?${params}`
    );

    const responseData = await response.json();

    if (responseData.error) {
      throw new Error(responseData.error);
    }

    dispatch({
      type: SEARCH,
      payload: responseData,
    });
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
