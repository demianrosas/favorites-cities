import { combineReducers } from "redux";

import citiesReducer from "./cities";
import searchReducer from "./search";

export const rootReducer = combineReducers({
  cities: citiesReducer,
  search: searchReducer,
});
