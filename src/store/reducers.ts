import {
  ActionTypes,
  FETCH_POINTS,
  ADD_POINT,
  ADD_POINT_SUCCESS,
  FETCH_POINTS_SUCCESS,
  ADD_POINT_ERROR,
  FETCH_POINTS_ERROR,
  ADD_POINT_OPTIMISTIC_SUCCESS,
  CLEAR_NOTIFICATION,
  RESET_ADD_POINT_FORM
} from './actions';
import { Point } from '../components/Charts/contracts';

const points = (state = [], action: ActionTypes): Point[] => {
  switch (action.type) {
    case ADD_POINT_SUCCESS:
    case FETCH_POINTS_SUCCESS:
    case ADD_POINT_OPTIMISTIC_SUCCESS:
      return action.payload;
    case ADD_POINT_ERROR:
      return action.payload.prevPoints;
    default:
      return state;
  }
};

const addError = (state = '', action: ActionTypes): string => {
  switch (action.type) {
    case ADD_POINT:
      return '';
    case ADD_POINT_ERROR:
      return action.payload.error;
    default:
      return state;
  }
};

const fetchError = (state = '', action: ActionTypes): string => {
  switch (action.type) {
    case FETCH_POINTS_ERROR:
      return action.payload;
    default:
      return state;
  }
};

const isFetchingPoints = (state = false, action: ActionTypes): boolean => {
  switch (action.type) {
    case FETCH_POINTS:
      return true;
    case FETCH_POINTS_SUCCESS:
    case FETCH_POINTS_ERROR:
      return false;
    default:
      return state;
  }
};

const isAddingPoint = (state = false, action: ActionTypes): boolean => {
  switch (action.type) {
    case ADD_POINT:
      return true;
    case ADD_POINT_SUCCESS:
    case ADD_POINT_ERROR:
      return false;
    default:
      return state;
  }
};

const shouldClearAddPointForm = (
  state = false,
  action: ActionTypes
): boolean => {
  switch (action.type) {
    case ADD_POINT_SUCCESS:
      return true;
    case RESET_ADD_POINT_FORM:
      return false;
    default:
      return state;
  }
};

const notification = (state = '', action: ActionTypes): string => {
  switch (action.type) {
    case ADD_POINT_SUCCESS:
      return 'Point successfully saved.';
    case CLEAR_NOTIFICATION:
      return '';
    default:
      return state;
  }
};

export const reducers = {
  points,
  addError,
  fetchError,
  isFetchingPoints,
  isAddingPoint,
  shouldClearAddPointForm,
  notification
};
