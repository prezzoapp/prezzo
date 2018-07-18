import {Map, fromJS} from 'immutable';
import {loop, combineReducers} from 'redux-loop-symbol-ponyfill';
import NavigatorStateReducer from '../containers/navigator/NavigatorState';
import CounterStateReducer from '../containers/counter/CounterState';
import AuthReducer from '../modules/auth';
import UserReducer from '../modules/user';
import SignupReducer from '../modules/Signup';
import SessionStateReducer, {RESET_STATE} from '../containers/session/SessionState';
import VendorReducer from '../modules/vendor';
import {menusListReducer} from '../containers/CreateMenu/reducers';
import {sectionListReducer, selectedListItemIDReducer} from '../containers/Explore/simpleHorizontalList/reducer';

import {restaurantsListReducer} from '../containers/Maps/reducers';

import {filtersReducer} from '../containers/Explore/headerSection/reducers';

const reducers = {
  counter: CounterStateReducer,
  navigatorState: NavigatorStateReducer,
  session: SessionStateReducer,
  auth: AuthReducer,
  user: UserReducer,
  signup: SignupReducer,
  vendor: VendorReducer,
  menusListReducer,
  sectionListReducer,
  selectedListItemIDReducer,
  restaurantsListReducer,
  filtersReducer
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
