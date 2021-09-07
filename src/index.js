import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import { createStore } from "redux"; //The entry point file is where Webpack accesses the top level component in our application. Since we want the store to be available everywhere we need it, it needs to be in index.js.
//import reducer from './reducers/ticket-list-reducer';
import rootReducer from "./reducers/index";
import Provider from "react-redux";
const store = createStore(rootReducer); //instantiate the store
store.subscribe(() => console.log(store.getState())); //Remember the subscribe() method that Redux provides? Generally, we won't use Redux's subscribe() or getState() in our "production" code, but it's excellent for testing. This is a great way to keep an eye on the current state of the store.

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
