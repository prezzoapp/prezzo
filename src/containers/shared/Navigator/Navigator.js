// @flow
import {
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator
} from 'react-navigation';

import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { MaterialIcons, Feather } from '../../../components/VectorIcons';
import Tutorial from '../../authentication/Tutorial';
import EnableNotifications from '../../authentication/EnableNotifications';
import Login from '../../authentication/Login';
import SignupName from '../../authentication/Signup/SignupName';
import SignupEmail from '../../authentication/Signup/SignupEmail';
import SignupPassword from '../../authentication/Signup/SignupPassword';
import SignupComplete from '../../authentication/Signup/SignupComplete';
import SignupMergeFacebook from '../../authentication/Signup/SignupMergeFacebook';
import Explore from '../../customer/Explore';
import RestaurantDetails from '../../customer/RestaurantDetails';

import MapScreen from '../../customer/MapScreen';
import Profile from '../../customer/Profile';
import EditProfile from '../../customer/EditProfile';
import PaymentMenu from '../../customer/PaymentMenu';
import PaymentDetails from '../../customer/PaymentDetails';

import CustomerActivity from '../../customer/Activity';

import Tables from '../../vendor/Tables';
import OpenTableDetails from '../../vendor/OpenTableDetails';
import OpenDeliveryDetails from '../../../components/OpenDeliveryDetails';
import VendorAdminActivityDetails from '../../vendor/VendorAdminActivityDetails';
import VendorAccountMenu from '../../vendor/AccountMenu';
import VendorAccountInfo from '../../vendor/AccountInfo';
import CreateMenu from '../../vendor/CreateMenu';
import Activity from '../../vendor/Activity';
import Delivery from '../../vendor/Delivery';
import { COLOR_GREEN } from '../../../services/constants';
import LocationSearch from '../../shared/LocationSearch';

import VendorTabBar from '../../../components/VendorTabBar';
import CacheImage from '../../../components/CacheImage';

import '../../../services/globalVars';

const headerColor = '#2B2C2C';
const activeColor = COLOR_GREEN;
// const inactiveColor = '#919191';
const inactiveColor = 'white';

const tabBarOptions = {
  activeTintColor: activeColor,
  inactiveTintColor: inactiveColor,
  indicatorStyle: { backgroundColor: activeColor },
  style: {
    backgroundColor: headerColor,
    borderTopWidth: 1,
    borderTopColor: '#e1e1e1'
  }
};

// Root navigator is a StackNavigator
const AuthenticationNavigator = createStackNavigator(
  {
    Tutorial: { screen: Tutorial },
    EnableNotifications: { screen: EnableNotifications },
    Login: { screen: Login },
    SignupName: { screen: SignupName },
    SignupEmail: { screen: SignupEmail },
    SignupPassword: { screen: SignupPassword },
    SignupMergeFacebook: { screen: SignupMergeFacebook },
    SignupComplete: { screen: SignupComplete }
  },
  {
    initialRouteName: 'Tutorial',
    headerMode: 'screen'
  }
);

const CustomerActivityNavigator = createStackNavigator({
    CustomerActivity: { screen: CustomerActivity }
  },
  {
    initialRouteName: 'CustomerActivity'
  }
);

// DON'T DELETE THIS BELOW COMMENTED CODE.
// CustomerActivityNavigator.navigationOptions = ({ navigation }) => {
//   return {
//     tabBarOnPress: ({ navigation, defaultHandler }) => {
//       if(userActivityTabSelected === false) {
//         userActivityTabSelected = true;
//         defaultHandler();
//         console.log(navigation.state.routes[0]);
//         if(navigation.state.routes[0].params &&
//           navigation.state.routes[0].params['onTabFocus'] !== undefined
//         ) {
//           //navigation.state.routes[0].params.onTabFocus();
//         }
//       }
//     }
//   };
// }

const CustomerProfileNavigator = createStackNavigator({
    Profile: { screen: Profile },
    EditProfile: { screen: EditProfile },
    PaymentMenu: { screen: PaymentMenu },
    PaymentDetails: { screen: PaymentDetails },
    LocationSearch: { screen: LocationSearch }
  },
  {
    initialRouteName: 'Profile',
    headerMode: 'screen'
  }
);

Explore.navigationOptions = ({ navigation }) => {
  return {
    tabBarOnPress: ({ navigation, defaultHandler }) => {
      userActivityTabSelected = false;
      defaultHandler();
    }
  };
}

CustomerProfileNavigator.navigationOptions = ({ navigation }) => {
  return {
    tabBarOnPress: ({ navigation, defaultHandler }) => {
      userActivityTabSelected = false;
      defaultHandler();
    }
  };
}

const CustomerSectionTabNavigator = createBottomTabNavigator(
  {
    Explore: {
      screen: Explore,
      navigationOptions: {
        title: 'Explore',
        tabBarIcon: props => (
          <MaterialIcons name="explore" size={24} color={props.tintColor} />
        ),
        headerTintColor: 'white',
        headerStyle: {
          position: 'absolute',
          backgroundColor: 'transparent',
          zIndex: 100,
          top: 0,
          left: 0,
          right: 0
        }
      },
    },
    CustomerActivityNavigator: {
      screen: CustomerActivityNavigator,
      navigationOptions: {
        title:'Activity',
        tabBarIcon: ({ focused }) => (
          <Feather
            name="activity"
            size={24}
            color={focused ? activeColor : inactiveColor}
          />
        )
      }
    },
    CustomerProfileNavigator: {
      screen: CustomerProfileNavigator,
      navigationOptions: {
        title:'Profile',
        tabBarIcon: ({ focused }) => (
          <Feather
            name="user"
            size={24}
            color={focused ? activeColor : inactiveColor}
          />
        )
      }
    }
  },
  {
    initialRouteName: 'Explore',
    tabBarOptions,
    tabBarComponent: props => <VendorTabBar {...props} />
  }
);

const CustomerNavigator = createStackNavigator(
  {
    CustomerSectionTabNavigator: {
      screen: CustomerSectionTabNavigator,
      navigationOptions: {
        header: null
      }
    },
    MapScreen: { screen: MapScreen },
    RestaurantDetails: { screen: RestaurantDetails },
    CheckoutPaymentDetails: { screen: PaymentDetails }
  },
  {
    mode: 'modal'
  }
);

const VendorProfileNavigator = createStackNavigator(
  {
    VendorAccountMenu: { screen: VendorAccountMenu },
    VendorAccountInfo: { screen: VendorAccountInfo },
    CreateMenu: { screen: CreateMenu },
    LocationSearch: { screen: LocationSearch }
  },
  {
    initialRouteName: 'VendorAccountMenu',
    headerMode: 'screen'
  }
);

const VendorTablesNavigator = createStackNavigator(
  {
    Tables: { screen: Tables },
    OpenTableDetails: { screen: OpenTableDetails }
  },
  {
    headerMode: 'screen'
  }
);

const VendorActivityNavigator = createStackNavigator(
  {
    Activity: { screen: Activity },
    VendorAdminActivityDetails: { screen: VendorAdminActivityDetails }
  },
  {
    headerMode: 'screen'
  }
);

const VendorSectionTabNavigator = createBottomTabNavigator(
  {
    VendorTablesNavigator: { screen: VendorTablesNavigator,
      navigationOptions: {
        title:'Tables',
        tabBarIcon: ({ focused }) => (
          <CacheImage
            style={{
              height: wp('6.4%'),
              width: wp('6.4%'),
              resizeMode: 'contain',
              tintColor: focused ? activeColor : inactiveColor
            }}
            type='image'
            source={require('../../../../assets/images/icons/TableIcon.png')}
          />
        )
      }
    },

    VendorActivityNavigator: { screen: VendorActivityNavigator,
      navigationOptions: {
        title: 'Activity',
        tabBarIcon: ({ focused }) => (
          <Feather
            name="bell"
            size={wp('6.4%')}
            color={focused ? activeColor : inactiveColor}
          />
        )
      }
    },

    VendorProfile: {
      screen: VendorProfileNavigator,
      navigationOptions: {
        title: 'Profile',
        tabBarIcon: ({ focused }) => (
          <Feather
            name="user"
            size={24}
            color={focused ? activeColor : inactiveColor}
          />
        )
      }
    }
  },
  {
    initialRouteName: 'VendorProfile',
    tabBarOptions,
    tabBarComponent: props => <VendorTabBar {...props} />
  }
);

const VendorNavigator = createStackNavigator({
  VendorSectionTabNavigator: {
    screen: VendorSectionTabNavigator,
    navigationOptions: {
      header: null
    }
  }
}, {
  headerMode: 'screen'
});

CustomerNavigator.navigationOptions = VendorNavigator.navigationOptions = {
  title: 'Prezzo',
  headerTitleStyle: { color: 'white' },
  headerStyle: {
    backgroundColor: headerColor,
    elevation: 0 // disable header elevation when TabNavigator visible
  }
};

const Navigator = createSwitchNavigator(
  {
    Authentication: AuthenticationNavigator,
    Customer: CustomerNavigator,
    Vendor: VendorNavigator
  },
  {
    initialRouteName: 'Authentication'
  }
);

Navigator.propTypes = {
  focused: PropTypes.bool
};

export default Navigator;
