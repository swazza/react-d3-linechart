import { Point } from '../components/Charts/contracts';

export const ADD_POINT = 'ADD_POINT';
export const SET_POINTS = 'SET_POINTS';
export const FETCH_POINTS = 'FETCH_POINTS';

export interface AddPointAction {
  type: typeof ADD_POINT;
  payload: Point;
}

export interface SetPointsAction {
  type: typeof SET_POINTS;
  payload: Point[];
}

export interface FetchPointsAction {
  type: typeof FETCH_POINTS;
}

export const addPoint = (point: Point): AddPointAction => ({
  type: ADD_POINT,
  payload: point
});

export const setPoints = (points: Point[]): SetPointsAction => ({
  type: SET_POINTS,
  payload: points
});

export const fetchPoints = (): FetchPointsAction => ({
  type: FETCH_POINTS
});

export type ActionTypes = AddPointAction | SetPointsAction | FetchPointsAction;
