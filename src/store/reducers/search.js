import { SEARCH } from "store/actions/search";

const initalState = {
  total: 0,
  links: {
    first: "",
    next: "",
    prev: "",
    last: "",
  },
  filter: "",
};

export default (state = initalState, action) => {
  switch (action.type) {
    case SEARCH: {
      const { cities, ...rest } = action.payload;
      return {
        ...state,
        ...rest,
      };
    }
    default: {
      return state;
    }
  }
};