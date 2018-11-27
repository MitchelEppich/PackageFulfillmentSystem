/*******************************************/
/*This is where the redux store gets created.
  The combined reducers (rootReducer) and middleware
  (ie thunk) gets passed in when the store is created.

  */
/******************************************/
import rootReducer from "./reducer";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import middleware from "./middleware";
import DevTools from './DevTools';

export const makeStore = initialState => {


  const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(thunk, ...middleware),
    DevTools.instrument())
  );
  if (module.hot) {
    module.hot.accept("./reducer", () => {
      // console.log('Replacing reducer');
      store.replaceReducer(require("./reducer").default);
    });
  }

  return store;
};
