import { put, call } from 'redux-saga/effects'
import Debug from 'debug'

import UIActions from 'redux/actions/ui'

import {
  getInstalledExtensions,
} from '../../../api'

const debug = Debug('swetrix:rx:s:load-extensions')

export default function* loadExtensions() {
  try {
    const { extensions } = yield call(getInstalledExtensions)

    yield put(UIActions.setExtensions(extensions))
  } catch ({ message }) {
    // if (_isString(message)) {
    //   yield put(UIActions.setProjectsError(message))
    // }
    debug('failed to load extensions: %s', message)
  }
}