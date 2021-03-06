import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";

import React from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import { rootReducer } from "store/reducers/";
import MainContainer from "components/mainContainer/mainContainer";

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

function App() {
  return (
    <Provider store={store}>
      <MainContainer />
    </Provider>
  );
}

export default App;
