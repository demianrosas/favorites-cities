import mapValues from "lodash.mapvalues";

import { hasError } from "store/actions/ui";

export const ADD_CITY_TO_FAVORITES = "ADD_CITY_TO_FAVORITES";
export const REMOVE_CITY_FROM_FAVORITES = "REMOVE_CITY_FROM_FAVORITES";
export const FETCH_FAVORITES_CITIES = "FETCH_FAVORITES_CITIES";

export const addCityToFavorites = (city) => {
  return async (dispatch, getState) => {
    try {
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
    } catch (err) {
      dispatch(hasError(err));
    }
  };
};

export const removeCityFromFavorites = (city) => {
  return async (dispatch, getState) => {
    try {
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
    } catch (err) {
      dispatch(hasError(err));
    }
  };
};

export const fetchFavoritesCities = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/preferences/cities`
      );

      const responseData = await response.json();

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
    } catch (err) {
      dispatch(hasError(err));
    }
  };
};

const fetchCity = async (geonameid) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/cities/${geonameid}`
  );

  const responseData = await response.json();

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
