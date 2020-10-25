import { SEARCH } from "store/actions/search";
import {
  ADD_CITY_TO_FAVORITES,
  REMOVE_CITY_FROM_FAVORITES,
  FETCH_FAVORITES_CITIES,
  FETCH_FAVORITES_CITIES_INFO,
} from "store/actions/cities";
import keyBy from "lodash.keyby";

const initalState = {
  cities: [],
  favoritesCities: [],
  favoritesCitiesIds: [],
};

export default (state = initalState, action) => {
  switch (action.type) {
    case SEARCH: {
      const { data } = action.payload;

      const cities = data.map((city) => ({
        ...city,
        isFavorite: state.favoritesCitiesIds.some(
          (id) => id === city.geonameid
        ),
      }));

      return {
        ...state,
        cities: keyBy(cities, "geonameid"),
      };
    }
    case ADD_CITY_TO_FAVORITES: {
      const { city } = action.payload;
      const newListOfFavoritesCities = { ...state.favoritesCities };
      newListOfFavoritesCities[city.geonameid] = city;

      return {
        ...state,
        cities: updateIsFavoriteValueOnCities(state.cities, city, true),
        favoritesCities: newListOfFavoritesCities,
        favoritesCitiesIds: [...state.favoritesCitiesIds, city.geonameid],
      };
    }
    case REMOVE_CITY_FROM_FAVORITES: {
      const { city } = action.payload;
      const newListOfFavoritesCities = { ...state.favoritesCities };
      delete newListOfFavoritesCities[city.geonameid];

      return {
        ...state,
        cities: updateIsFavoriteValueOnCities(state.cities, city, false),
        favoritesCities: newListOfFavoritesCities,
        favoritesCitiesIds: state.favoritesCitiesIds.filter(
          (id) => id !== city.geonameid
        ),
      };
    }
    case FETCH_FAVORITES_CITIES: {
      const { favoritesCitiesIds } = action.payload;

      return {
        ...state,
        favoritesCitiesIds,
      };
    }
    case FETCH_FAVORITES_CITIES_INFO: {
      const { favoritesCities } = action.payload;

      return {
        ...state,
        favoritesCities: keyBy(favoritesCities, "geonameid"),
      };
    }
    default: {
      return state;
    }
  }
};

const updateIsFavoriteValueOnCities = (cities, city, isFavorite) => {
  const newListOfCities = { ...cities };
  if (newListOfCities[city.geonameid]) {
    newListOfCities[city.geonameid].isFavorite = isFavorite;
  }

  return newListOfCities;
};
