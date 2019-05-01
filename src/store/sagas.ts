import { takeEvery } from 'redux-saga/effects';
import { call, put, select, all } from 'redux-saga/effects';
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
    const points = [
      {
        x: '2018-04-19T12:45:03+00:00',
        y: 5
      },
      {
        x: '2018-04-19T13:45:03+01:00',
        y: 20
      },
      {
        x: '2018-04-20T12:45:03+04:00',
        y: 3
      },
      {
        x: '2018-04-18T10:45:03.123+00:00',
        y: -1
      }
    ]
      .map(d => ({ x: new Date(d.x).getTime(), y: d.y }))
      .sort((d1, d2) => d1.x - d2.x);
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
  });
}

export function* sagas() {
  try {
    yield all([watchFetchPoints(), watchAddPoint()]);
  } catch (err) {
    console.log(err);
  }
}
