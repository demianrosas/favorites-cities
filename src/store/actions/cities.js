import mapValues from "lodash.mapvalues";

export const ADD_CITY_TO_FAVORITES = "ADD_CITY_TO_FAVORITES";
export const REMOVE_CITY_FROM_FAVORITES = "REMOVE_CITY_FROM_FAVORITES";
export const FETCH_FAVORITES_CITIES = "FETCH_FAVORITES_CITIES";

export const addCityToFavorites = (city) => {
  return async (dispatch, getState) => {
    const favoritesCitiesAsObject = mapValues(
      getState().cities.favoritesCities,
      () => true
    );

    favoritesCitiesAsObject[city.geonameid] = true;

    city.isFavorite = true;

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
    const favoritesCitiesAsObject = mapValues(
      getState().cities.favoritesCities,
      () => true
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

export const fetchFavoritesCities = () => {
  return async (dispatch) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/preferences/cities`
    );

    const responseData = await response.json();

    if (responseData.error) {
      throw new Error(responseData.error);
    }

    const favoritesCities = [];

    for (const geonameid of responseData.data) {
      const city = await fetchCity(geonameid);
      city.isFavorite = true;
      favoritesCities.push(city);
    }

    dispatch({
      type: FETCH_FAVORITES_CITIES,
      payload: { favoritesCities },
    });
  };
};

const fetchCity = async (geonameid) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/cities/${geonameid}`
  );

  const responseData = await response.json();

  if (responseData.error) {
    throw new Error(responseData.error);
  }

  return responseData;
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
