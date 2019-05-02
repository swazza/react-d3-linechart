import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { sagas } from './sagas';
import { reducers } from './reducers';
import { Point } from '../components/Charts/Model';

export interface Store {
  /**
   * Points (unprocessed & raw) that need to be displayed on the Chart
   */
  points: Point[];

  /**
   * Indicates that an API call is underway to fetch points
   */
  isFetchingPoints: boolean;

  /**
   * Indicates that an API call is underway to save point
   */
  isAddingPoint: boolean;

  /**
   * Captures any error that occured while saving a point to the API endpoint.
   * A non-empty value indicates an error.
   */
  addError: string;

  /**
   * Captures any error that occured while fetching poitns from the API endpoint.
   * A non-empty value indicates an error.
   */
  fetchError: string;

  /**
   * Indicates if the AddPointForm can be reset. Instead of resetting the form after every submit, we
   * wait for a success before resetting it. In case of failure, we'd still want to retain form state should
   * the user want to re-submit
   */
  shouldClearAddPointForm: boolean;

  /**
   * A non-empty string indicates there is a notification that needs to be displayed
   */
  notification: string;
}

const initStore: Store = {
  points: [],
  isFetchingPoints: false,
  isAddingPoint: false,
  addError: '',
  fetchError: '',
  shouldClearAddPointForm: false,
  notification: ''
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
