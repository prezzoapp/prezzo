import { Map, fromJS } from 'immutable';
import { loop, combineReducers } from 'redux-loop-symbol-ponyfill';
import NavigatorStateReducer from '../containers/shared/Navigator/NavigatorState';
import AuthReducer from '../modules/auth';
import MenuReducer from '../modules/menu';
import UploadReducer from '../modules/upload';
import UserReducer from '../modules/user';
import SignupReducer from '../modules/Signup';
import SessionStateReducer from '../modules/session';
import { RESET_STATE } from '../modules/session/types';
import { USER_LOGOUT_SUCCESS } from '../modules/auth/types';
import VendorReducer from '../modules/vendor';
import ExploreReducer from '../modules/explore';
import RestaurantDetails from '../modules/restaurant';
import paymentMethods from '../modules/paymentMethods';
import TableReducer from '../modules/table';
// import DeliveryReducer from '../modules/delivery';
import VendorActivityReducer from '../modules/vendorActivity';
import UserActivityReducer from '../modules/userActivity';

const reducers = {
  navigatorState: NavigatorStateReducer,
  session: SessionStateReducer,
  auth: AuthReducer,
  explore: ExploreReducer,
  menu: MenuReducer,
  upload: UploadReducer,
  user: UserReducer,
  signup: SignupReducer,
  vendor: VendorReducer,
  restaurant: RestaurantDetails,
  paymentMethods,
  table: TableReducer,
  // delivery: DeliveryReducer,
  vendorActivity: VendorActivityReducer,
  userActivity: UserActivityReducer
};

// initial state, accessor and mutator for supporting root-level
// immutable data with redux-loop reducer combinator
const immutableStateContainer = Map();
const getImmutable = (child, key) => (child ? child.get(key) : void 0);
const setImmutable = (child, key, value) => child.set(key, value);

const namespacedReducer = combineReducers(
  reducers,
  immutableStateContainer,
  getImmutable,
  setImmutable
);

export default function mainReducer(state, action) {
  if(action.type === RESET_STATE) {
    const [nextState, effects] = namespacedReducer(action.payload, action);
    return loop(fromJS(nextState), effects);
  } else if(action.type === USER_LOGOUT_SUCCESS) {
    const { session } = state.toJS();
    state = { session };
    const [nextState, effects] = namespacedReducer(fromJS(state), action);
    return loop(fromJS(nextState), effects);
  }
  const [nextState, effects] = namespacedReducer(state || void 0, action);
  return loop(fromJS(nextState), effects);
}
