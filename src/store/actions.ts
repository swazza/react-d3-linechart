import { Point } from '../components/Charts/contracts';

// Actions & Action Creators required for handling the side effects of HTTP POST /points
export const ADD_POINT = 'ADD_POINT';
export const ADD_POINT_OPTIMISTIC_SUCCESS = 'ADD_POINT_OPTIMISTIC_SUCCESS';
export const ADD_POINT_SUCCESS = 'ADD_POINT_SUCCESS';
export const ADD_POINT_ERROR = 'ADD_POINT_ERROR';

export interface AddPointAction {
  type: typeof ADD_POINT;
  payload: Point;
}

export interface AddPointSuccessAction {
  type: typeof ADD_POINT_SUCCESS;
  payload: Point[];
}

export interface AddPointErrorAction {
  type: typeof ADD_POINT_ERROR;
  payload: {
    error: string;
    prevPoints: Point[];
  };
}

export interface AddPointOptimsticSuccess {
  type: typeof ADD_POINT_OPTIMISTIC_SUCCESS;
  payload: Point[];
}

export const addPoint = (point: Point): AddPointAction => ({
  type: ADD_POINT,
  payload: point
});

export const addPointSuccess = (points: Point[]): AddPointSuccessAction => ({
  type: ADD_POINT_SUCCESS,
  payload: points
});

export const addPointError = (
  error: string,
  prevPoints: Point[]
): AddPointErrorAction => ({
  type: ADD_POINT_ERROR,
  payload: {
    error,
    prevPoints
  }
});

export const addPointOptimisticSuccess = (
  points: Point[]
): AddPointOptimsticSuccess => ({
  type: ADD_POINT_OPTIMISTIC_SUCCESS,
  payload: points
});

// Actions & Action Creators required for handling the side effects of HTTP GET /data
export const FETCH_POINTS = 'FETCH_POINTS';
export const FETCH_POINTS_SUCCESS = 'FETCH_POINTS_SUCCESS';
export const FETCH_POINTS_ERROR = 'FETCH_POINTS_ERROR';

export interface FetchPointsAction {
  type: typeof FETCH_POINTS;
}

export interface FetchPointsSuccessAction {
  type: typeof FETCH_POINTS_SUCCESS;
  payload: Point[];
}

export interface FetchPointsErrorAction {
  type: typeof FETCH_POINTS_ERROR;
  payload: string;
}

export const fetchPoints = (): FetchPointsAction => ({
  type: FETCH_POINTS
});

export const fetchPointsSuccess = (
  points: Point[]
): FetchPointsSuccessAction => ({
  type: FETCH_POINTS_SUCCESS,
  payload: points
});

export const fetchPointsError = (error: string): FetchPointsErrorAction => ({
  type: FETCH_POINTS_ERROR,
  payload: error
});

// Exporting a union of all action types makes it easier for the reducer to switch on types
export type ActionTypes =
  | AddPointAction
  | AddPointSuccessAction
  | AddPointErrorAction
  | AddPointOptimsticSuccess
  | FetchPointsAction
  | FetchPointsSuccessAction
  | FetchPointsErrorAction;
