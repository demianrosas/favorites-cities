import { SEARCH, IS_SEARCHING } from "store/actions/search";

const initalState = {
  total: 0,
  links: {
    first: "",
    next: "",
    prev: "",
    last: "",
  },
  filter: "",
  limitPerPage: 10,
  isSearching: false,
};

export default (state = initalState, action) => {
  switch (action.type) {
    case SEARCH: {
      const { cities, ...rest } = action.payload;
      return {
        ...state,
        ...rest,
        isSearching: false,
      };
    }
    case IS_SEARCHING: {
      return {
        ...state,
        isSearching: action.payload.isSearching,
      };
    }
    default: {
      return state;
    }
  }
};
