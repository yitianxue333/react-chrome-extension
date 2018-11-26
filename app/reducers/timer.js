import * as ActionTypes from '../constants/ActionTypes';

const initialState = [{
  expirationDate: 0
}];

const actionsMap = {
  [ActionTypes.SET_EXPIRATION_DATE](state, action) {
    return [{
      expirationDate: action.expirationDate
    }];
  },
  [ActionTypes.RESET_EXPIRATION_DATE](/*state, action*/) {
    return [{
      expirationDate: 0
    }]
  }
};

export default function timer(state = initialState, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
}
