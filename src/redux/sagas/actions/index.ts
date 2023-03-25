/* eslint-disable no-unused-vars */
import types from 'redux/sagas/actions/types'
import { getRefreshToken } from 'utils/refreshToken'
import { logoutApi } from 'api'
import { IUser } from '../../models/IUser'

const loadProjects = (take: string, skip: string) => ({
  type: types.LOAD_PROJECTS,
  payload: { take, skip },
})

const loadSharedProjects = (take: string, skip: string) => ({
  type: types.LOAD_SHARED_PROJECTS,
  payload: { take, skip },
})

const loadProjectsCaptcha = (take: string, skip: string) => ({
  type: types.LOAD_PROJECTS,
  payload: { take, skip, isCaptcha: true },
})
const loadExtensions = () => ({
  type: types.LOAD_EXTENSIONS,
})
const loadProjectAlerts = (take: string, skip: string) => ({
  type: types.LOAD_PROJECT_ALERTS,
  payload: { take, skip },
})
const loginAsync = (credentials: {
    email: string,
    password: string,
}, callback = () => { }) => ({
  type: types.LOGIN_ASYNC,
  payload: {
    credentials, callback,
  },
})

const signupAsync = (data: {
    email: string,
    password: string,
}, t: (string: string) => {}, callback = () => { }) => ({
  type: types.SIGNUP_ASYNC,
  payload: {
    data, callback, t,
  },
})

const emailVerifyAsync = (data: {
    email: string,
    code: string,
}, successfulCallback: () => {}, errorCallback: () => {}) => ({
  type: types.EMAIL_VERIFY_ASYNC,
  payload: { data, successfulCallback, errorCallback },
})

const updateUserProfileAsync = (data: IUser, callback = () => { }) => ({
  type: types.UPDATE_USER_PROFILE_ASYNC,
  payload: { data, callback },
})

const deleteAccountAsync = (errorCallback: (e: string) => {}, successCallback: (str: string) => {}, t: (str: string) => {}) => {
  const refreshToken = getRefreshToken()
  logoutApi(refreshToken)

  return {
    type: types.DELETE_ACCOUNT_ASYNC,
    payload: {
      errorCallback, successCallback, t,
    },
  }
}

const sagaActions = {
  loadProjects,
  loadSharedProjects,
  loadProjectsCaptcha,
  loadExtensions,
  loadProjectAlerts,
  loginAsync,
  signupAsync,
  emailVerifyAsync,
  updateUserProfileAsync,
  deleteAccountAsync,
}

export default sagaActions
