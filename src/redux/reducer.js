import {Map, fromJS} from 'immutable';
import {loop, combineReducers} from 'redux-loop-symbol-ponyfill';
import NavigatorStateReducer from '../containers/shared/Navigator/NavigatorState';
import AuthReducer from '../modules/auth';
import MenuReducer from '../modules/menu';
import UploadReducer from '../modules/upload';
import UserReducer from '../modules/user';
import SignupReducer from '../modules/Signup';
import SessionStateReducer from '../modules/session';
import {RESET_STATE} from '../modules/session/types';
import VendorReducer from '../modules/vendor';

const reducers = {
  navigatorState: NavigatorStateReducer,
  session: SessionStateReducer,
  auth: AuthReducer,
  menu: MenuReducer,
  upload: UploadReducer,
  user: UserReducer,
  signup: SignupReducer,
  vendor: VendorReducer
};

// initial state, accessor and mutator for supporting root-level
// immutable data with redux-loop reducer combinator
const immutableStateContainer = Map();
const getImmutable = (child, key) => child ? child.get(key) : void 0;
const setImmutable = (child, key, value) => child.set(key, value);

const namespacedReducer = combineReducers(
  reducers,
  immutableStateContainer,
  getImmutable,
  setImmutable
);

export default function mainReducer(state, action) {
  const [nextState, effects] = action.type === RESET_STATE
    ? namespacedReducer(action.payload, action)
    : namespacedReducer(state || void 0, action);

  // enforce the state is immutable
  return loop(fromJS(nextState), effects);
}
