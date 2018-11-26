import * as types from '../constants/ActionTypes';

export function setExpirationDate(expirationDate) {
  return { type: types.SET_EXPIRATION_DATE, expirationDate };
}

export function resetExpirationDate() {
  return { type: types.RESET_EXPIRATION_DATE };
}
