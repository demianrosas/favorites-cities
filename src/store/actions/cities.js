import mapValues from "lodash.mapvalues";

import { hasError } from "store/actions/ui";

export const ADD_CITY_TO_FAVORITES = "ADD_CITY_TO_FAVORITES";
export const REMOVE_CITY_FROM_FAVORITES = "REMOVE_CITY_FROM_FAVORITES";
export const FETCH_FAVORITES_CITIES = "FETCH_FAVORITES_CITIES";
export const FETCH_FAVORITES_CITIES_INFO = "FETCH_FAVORITES_CITIES_INFO";

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

      if (responseData.statusCode === 500) {
        throw new Error();
      }

      dispatch({
        type: FETCH_FAVORITES_CITIES,
        payload: { favoritesCitiesIds: responseData.data },
      });
    } catch (err) {
      dispatch(hasError(err));
    }
  };
};

export const fetchFavoritesCitiesInfo = () => {
  return async (dispatch, getState) => {
    try {
      const favCitiesIds = getState().cities.favoritesCitiesIds;

      const favoritesCities = [];

      for (const geonameid of favCitiesIds) {
        const data = await fetchCity(geonameid);
        if (data.statusCode === 500) {
          continue;
        }
        data.isFavorite = true;
        favoritesCities.push(data);
      }

      dispatch({
        type: FETCH_FAVORITES_CITIES_INFO,
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
