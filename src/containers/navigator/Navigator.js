// @flow
import {TabNavigator, StackNavigator, SwitchNavigator} from 'react-navigation';

import Tutorial from '../../components/Tutorial';
import EnableNotifications from '../EnableNotifications';
import Login from '../Login';
import SignupName from '../Signup/SignupName';
import SignupEmail from '../Signup/SignupEmail';
import SignupPassword from '../Signup/SignupPassword';
import SignupComplete from '../Signup/SignupComplete';

import Explore from '../Explore';
import Profile from '../Profile';
import VendorAccountMenu from '../VendorAccountMenu';

const headerColor = '#2B2C2C';
const activeColor = 'white';

// Root navigator is a StackNavigator
const UnauthenticatedNavigator = StackNavigator({
  Home: {screen: Tutorial},
  EnableNotifications: {screen: EnableNotifications},
  Login: {screen: Login},
  SignupName: {screen: SignupName},
  SignupEmail: {screen: SignupEmail},
  SignupPassword: {screen: SignupPassword},
  SignupComplete: {screen: SignupComplete}
}, {
  initialRouteName: 'Home'
});

const AuthenticatedNavigator = TabNavigator({
  Home: {screen: Explore},
  Profile: {screen: Profile},
  VendorAccountMenu: {screen: VendorAccountMenu}
}, {
  initialRouteName: 'Home',
  tabBarOptions: {
    activeTintColor: activeColor,
    indicatorStyle: {backgroundColor: activeColor},
    style: {
      backgroundColor: headerColor,
      borderTopWidth: 1,
      borderTopColor: '#e1e1e1'
    }
  }
});

AuthenticatedNavigator.navigationOptions = {
  title: 'Prezzo',
  headerTitleStyle: {color: 'white'},
  headerStyle: {
    backgroundColor: headerColor,
    elevation: 0 // disable header elevation when TabNavigator visible
  }
};

const Navigator = SwitchNavigator({
  Home: UnauthenticatedNavigator,
  Authenticated: AuthenticatedNavigator
},{
  initialRouteName: 'Home'
});

// export default {
//   UnauthenticatedNavigator,
//   AuthenticatedNavigator
// };

export default Navigator;
