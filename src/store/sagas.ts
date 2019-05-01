import { takeEvery } from 'redux-saga/effects';
import { call, put, select, all } from 'redux-saga/effects';
import { fetchPoints, addPoint } from '../api';
import {
  FETCH_POINTS,
  ADD_POINT,
  setPoints,
  FetchPointsAction,
  AddPointAction
} from './actions';

function* watchFetchPoints() {
  yield takeEvery(FETCH_POINTS, function* fetchPointsWorker(
    action: FetchPointsAction
  ) {
    let result = yield call(fetchPoints);
    let points = result.values
      .map((d: any) => ({ x: new Date(d.x).getTime(), y: d.y }))
      .sort((d1: any, d2: any) => d1.x - d2.x);

    yield put(setPoints(points));
  });
}

function* watchAddPoint() {
  yield takeEvery(ADD_POINT, function* addPointWorker(action: AddPointAction) {
    const { payload } = action;
    const points = yield select(state => state.points);
    const newPoints = [
      ...points,
      { x: new Date(payload.x).getTime(), y: payload.y }
    ].sort((d1, d2) => d1.x - d2.x);

    yield put(setPoints(newPoints));
    let result = yield call(addPoint, payload);
  });
}

export function* sagas() {
  try {
    yield all([watchFetchPoints(), watchAddPoint()]);
  } catch (err) {
    console.log(err);
  }
}
