import { put, call, delay, select } from 'redux-saga/effects'
import _map from 'lodash/map'
import _isEmpty from 'lodash/isEmpty'

import { getLiveVisitors } from 'api'
import UIActions from 'redux/actions/ui'

const LIVE_VISITORS_UPDATE_INTERVAL = 40000

export default function* liveVisitors() {
  while (true) {
    yield delay(LIVE_VISITORS_UPDATE_INTERVAL)
    const projects = yield select(state => state.ui.projects.projects)
    if (_isEmpty(projects)) {
      continue
    }

    const pids = _map(projects, project => project.id)
    const liveStats = yield call(getLiveVisitors, pids)

    yield put(UIActions.setLiveStats(liveStats))
  }
}