import { SEARCH } from "store/actions/search";

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
    default: {
      return state;
    }
  }
};
