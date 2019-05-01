import { takeEvery } from 'redux-saga/effects';
import { call, put, select, all, delay } from 'redux-saga/effects';
import { fetchPoints, addPoint } from '../api';
import {
  FETCH_POINTS,
  fetchPointsSuccess,
  fetchPointsError,
  ADD_POINT,
  addPointSuccess,
  addPointError,
  addPointOptimisticSuccess,
  FetchPointsAction,
  AddPointAction,
  clearNotification
} from './actions';

function* watchFetchPoints() {
  yield takeEvery(FETCH_POINTS, function* fetchPointsWorker(
    action: FetchPointsAction
  ) {
    try {
      let result = yield call(fetchPoints);
      let points = result.values
        .map((d: any) => ({ x: new Date(d.x).getTime(), y: d.y }))
        .sort((d1: any, d2: any) => d1.x - d2.x);

      yield put(fetchPointsSuccess(points));
    } catch (err) {
      yield put(
        fetchPointsError('Unable to fetch points. Please try again later.')
      );
    }
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

    yield put(addPointOptimisticSuccess(newPoints));
    try {
      yield call(addPoint, payload);
      yield put(addPointSuccess(newPoints));
      yield delay(3000);
      yield put(clearNotification());
    } catch (err) {
      yield put(
        addPointError(
          'Error saving point. Restoring chart to previous state.',
          points
        )
      );
    }
  });
}

export function* sagas() {
  try {
    yield all([watchFetchPoints(), watchAddPoint()]);
  } catch (err) {
    console.log(err);
  }
}
