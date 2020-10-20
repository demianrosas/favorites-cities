export const SEARCH = "SEARCH";

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
