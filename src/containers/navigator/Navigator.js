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
import Maps from '../Maps';
import VendorAccountMenu from '../VendorAccountMenu';
import VendorAccountInfo from '../VendorAccountInfo';

import LocationSearch from '../LocationSearch';

import Profile from '../Profile';
import EditProfile from '../Profile/EditProfile';

import MenuItems from '../CreateMenu/createMenu';

const headerColor = '#2B2C2C';
const activeColor = 'white';

// Root navigator is a StackNavigator
const UnauthenticatedNavigator = StackNavigator({
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

const ProfileNavigator = StackNavigator({
  Profile: {screen: Profile},
  EditProfile: {screen: EditProfile},
  VendorAccountMenu: {screen: VendorAccountMenu},
  VendorAccountInfo: {screen: VendorAccountInfo},
  LocationSearch: {screen: LocationSearch},
  MenuItems: {screen: MenuItems}
}, {
  initialRouteName: 'Profile'
});

// const ExploreNaivgator = StackNavigator({
//   Explore: {screen: Explore},
//   Maps: {screen: Maps}
// },{
//   mode: 'modal'
// });

const AuthenticatedNavigator = TabNavigator({
  Explore: {screen: Explore},
  Profile: {screen: ProfileNavigator}
},{
  tabBarPosition: 'bottom',
  initialRouteName: 'Explore',
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

const MainStackNavigator = StackNavigator({
  AuthenticatedNavigator: {
    screen: AuthenticatedNavigator,
    navigationOptions: {
      header: null
    }
  },
  Maps: {screen: Maps}
},{
  mode: 'modal'
});

// AuthenticatedNavigator.navigationOptions = {
//   title: 'Prezzo',
//   headerTitleStyle: {color: 'white'},
//   headerStyle: {
//     backgroundColor: headerColor,
//     elevation: 0 // disable header elevation when TabNavigator visible
//   }
// };

const Navigator = SwitchNavigator({
  Unauthenticated: UnauthenticatedNavigator,
  Authenticated: MainStackNavigator
},{
  initialRouteName: 'Unauthenticated'
});

// export default {
//   UnauthenticatedNavigator,
//   AuthenticatedNavigator
// };

export default Navigator;