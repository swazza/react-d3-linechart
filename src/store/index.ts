import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { sagas } from './sagas';
import { reducers } from './reducers';

const initStore = {
  points: []
};

export const getStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const appliedMiddleware = applyMiddleware(sagaMiddleware);
  const composeEnhancers =
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const composedMiddleware =
    process.env.NODE_ENV !== 'production'
      ? composeEnhancers(appliedMiddleware)
      : compose(appliedMiddleware);

  const store = createStore(
    //@ts-ignore
    combineReducers(reducers),
    initStore,
    composedMiddleware
  );

  sagaMiddleware.run(sagas);
  return store;
};
