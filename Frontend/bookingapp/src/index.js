import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { userReducer } from "./redux/reducers/user-reducer";
import { searchReducer } from "./redux/reducers/search-reducer";
import { modal } from "./redux/reducers/modal-reducer";
import { appointmentReducer } from "./redux/reducers/appointment-reducer";
import logger from "redux-logger";
import { Provider } from "react-redux";

const store = createStore(
  combineReducers({
    user: userReducer,
    results: searchReducer,
    modal: modal,
    appointment: appointmentReducer
  }),
  {},
  applyMiddleware(logger)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
