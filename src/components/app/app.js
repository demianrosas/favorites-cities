import React from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import "./app.css";
import { rootReducer } from "store/reducers/";

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

function App() {
  return (
    <Provider store={store}>
      <div className="App"></div>
    </Provider>
  );
}

export default App;
