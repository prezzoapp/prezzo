// @flow
import {Map} from 'immutable';
import {
  UPLOAD_REQUEST,
  UPLOAD_SUCCESS,
  UPLOAD_FAILURE
} from './types';
import type State from './types';

const INITIAL_STATE: State = Map({
  data: null,
  isBusy: false
});

const reducer = (state: State = INITIAL_STATE, action) => {
  const {type} = action;
  switch (type) {
    case UPLOAD_REQUEST:
      return state.update('isBusy', () => true);
    case UPLOAD_SUCCESS:
    case UPLOAD_FAILURE:
      return state.update('isBusy', () => false);
    default:
      return state;
  }
};

export default reducer;
