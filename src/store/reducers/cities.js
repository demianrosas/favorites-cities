import { SEARCH } from "store/actions/search";
import {
  ADD_CITY_TO_FAVORITES,
  REMOVE_CITY_FROM_FAVORITES,
} from "store/actions/cities";

const initalState = {
  cities: [],
  favoritesCities: [],
};

export default (state = initalState, action) => {
  switch (action.type) {
    case SEARCH: {
      const { data } = action.payload;
      return {
        ...state,
        cities: data,
      };
    }
    case ADD_CITY_TO_FAVORITES: {
      const { city } = action.payload;
      return {
        ...state,
        favoritesCities: [...state.favoritesCities, city],
      };
    }
    case REMOVE_CITY_FROM_FAVORITES: {
      const { city } = action.payload;
      const newListOfFavoritesCities = state.favoritesCities.filter(
        (favoriteCity) => favoriteCity.geonameid !== city.geonameid
      );
      return {
        ...state,
        favoritesCities: newListOfFavoritesCities,
      };
    }
    default: {
      return state;
    }
  }
};
