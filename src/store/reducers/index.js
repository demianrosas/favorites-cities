import { combineReducers } from "redux";

import citiesReducer from "./cities";
import searchReducer from "./search";
import uiReducer from "./ui";

export const rootReducer = combineReducers({
  cities: citiesReducer,
  search: searchReducer,
  ui: uiReducer,
});
