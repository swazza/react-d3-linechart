import { ActionTypes, SET_POINTS, ADD_POINT } from './actions';

const points = (state = [], action: ActionTypes) => {
  switch (action.type) {
    case SET_POINTS:
      return action.payload;
    default:
      return state;
  }
};

export const reducers = {
  points
};
