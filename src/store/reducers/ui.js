import { HAS_ERROR } from "store/actions/ui";

const initalState = {
  error: false,
};

export default (state = initalState, action) => {
  switch (action.type) {
    case HAS_ERROR: {
      return {
        ...state,
        error: true,
      };
    }
    default: {
      return state;
    }
  }
};
