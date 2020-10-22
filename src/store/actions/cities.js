export const ADD_CITY_TO_FAVORITES = "ADD_CITY_TO_FAVORITES";
export const REMOVE_CITY_FROM_FAVORITES = "REMOVE_CITY_FROM_FAVORITES";

export const addCityToFavorites = (city) => {
  return async (dispatch, getState) => {
    const favoritesCitiesAsObject = citiesToObject(
      getState().cities.favoritesCities
    );

    favoritesCitiesAsObject[city.geonameid] = true;

    await updateFavoritesCities(favoritesCitiesAsObject);
    dispatch({
      type: ADD_CITY_TO_FAVORITES,
      payload: {
        city,
      },
    });
  };
};

export const removeCityFromFavorites = (city) => {
  return async (dispatch, getState) => {
    const favoritesCitiesAsObject = citiesToObject(
      getState().cities.favoritesCities
    );

    favoritesCitiesAsObject[city.geonameid] = false;

    await updateFavoritesCities(favoritesCitiesAsObject);

    dispatch({
      type: REMOVE_CITY_FROM_FAVORITES,
      payload: {
        city,
      },
    });
  };
};

const citiesToObject = (cities) => {
  return cities.reduce((favoritesCities, favCity) => {
    favoritesCities[favCity.geonameid] = true;
    return favoritesCities;
  }, {});
};

const updateFavoritesCities = async (cities) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/preferences/cities`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cities),
    }
  );

  if (response.status !== 204) {
    throw new Error(response.statusText);
  }
};
