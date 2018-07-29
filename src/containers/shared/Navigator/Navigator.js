// @flow
import {TabNavigator, StackNavigator, SwitchNavigator} from 'react-navigation';

import Tutorial from '../../authentication/Tutorial';
import EnableNotifications from '../../authentication/EnableNotifications';
import Login from '../../authentication/Login';
import SignupName from '../../authentication/Signup/SignupName';
import SignupEmail from '../../authentication/Signup/SignupEmail';
import SignupPassword from '../../authentication/Signup/SignupPassword';
import SignupComplete from '../../authentication/Signup/SignupComplete';

import Explore from '../../customer/Explore';
import Profile from '../../customer/Profile';
import EditProfile from '../../customer/EditProfile';

import Tables from '../../vendor/Tables';
import VendorAccountMenu from '../../vendor/AccountMenu';
import VendorAccountInfo from '../../vendor/AccountInfo';
import CreateMenu from '../../vendor/CreateMenu';

import LocationSearch from '../../shared/LocationSearch';

const headerColor = '#2B2C2C';
const activeColor = 'white';

const tabBarOptions = {
  activeTintColor: activeColor,
  indicatorStyle: {backgroundColor: activeColor},
  style: {
    backgroundColor: headerColor,
    borderTopWidth: 1,
    borderTopColor: '#e1e1e1'
  }
};

// Root navigator is a StackNavigator
const AuthenticationNavigator = StackNavigator({
  Tutorial: {screen: Tutorial},
  EnableNotifications: {screen: EnableNotifications},
  Login: {screen: Login},
  SignupName: {screen: SignupName},
  SignupEmail: {screen: SignupEmail},
  SignupPassword: {screen: SignupPassword},
  SignupComplete: {screen: SignupComplete}
}, {
  initialRouteName: 'Tutorial'
});

const CustomerProfileNavigator = StackNavigator({
  Profile: {screen: Profile},
  EditProfile: {screen: EditProfile},
  VendorAccountMenu: {screen: VendorAccountMenu},
  VendorAccountInfo: {screen: VendorAccountInfo},
  LocationSearch: {screen: LocationSearch}
}, {
  initialRouteName: 'Profile'
});

const CustomerNavigator = TabNavigator({
  Explore: {screen: Explore},
  CustomerProfile: {screen: CustomerProfileNavigator}
}, {
  initialRouteName: 'Explore',
  tabBarOptions
});

const VendorProfileNavigator = StackNavigator({
  VendorAccountMenu: {screen: VendorAccountMenu},
  VendorAccountInfo: {screen: VendorAccountInfo},
  CreateMenu: {screen: CreateMenu},
  LocationSearch: {screen: LocationSearch}
}, {
  initialRouteName: 'VendorAccountMenu'
});

const VendorNavigator = TabNavigator({
  Tables: {screen: Tables},
  VendorProfile: {screen: VendorProfileNavigator}
}, {
  initialRouteName: 'VendorProfile',
  tabBarOptions
});

CustomerNavigator.navigationOptions = VendorNavigator.navigationOptions = {
  title: 'Prezzo',
  headerTitleStyle: {color: 'white'},
  headerStyle: {
    backgroundColor: headerColor,
    elevation: 0 // disable header elevation when TabNavigator visible
  }
};

const Navigator = SwitchNavigator({
  Authentication: AuthenticationNavigator,
  Customer: CustomerNavigator,
  Vendor: VendorNavigator
},{
  initialRouteName: 'Authentication'
});

export default Navigator;
