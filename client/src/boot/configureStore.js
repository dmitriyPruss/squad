import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import appReducer from "../reducers/index";
import rootSaga from "../sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware();

export default function configureStore() {
  const store = createStore(
    appReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  );
  sagaMiddleware.run(rootSaga, store.dispatch);
  return store;
}
