// @flow
import {
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator
} from 'react-navigation';

import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';

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
import VendorAdminActivityDetails from '../../../components/VendorAdminActivityDetails';
import VendorAccountMenu from '../../vendor/AccountMenu';
import VendorAccountInfo from '../../vendor/AccountInfo';
import CreateMenu from '../../vendor/CreateMenu';
import Activity from '../../vendor/Activity';
import Delivery from '../../vendor/Delivery';
import { COLOR_GREEN } from '../../../services/constants';
import LocationSearch from '../../shared/LocationSearch';

import VendorTabBar from '../../../components/VendorTabBar';

const headerColor = '#2B2C2C';
const activeColor = COLOR_GREEN;
const inactiveColor = '#919191';

const tabBarOptions = {
  activeTintColor: activeColor,
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
    initialRouteName: 'Tutorial'
  }
);

const CustomerProfileNavigator = createStackNavigator({
    Profile: { screen: Profile },
    EditProfile: { screen: EditProfile },
    PaymentMenu: { screen: PaymentMenu },
    PaymentDetails: { screen: PaymentDetails },
    LocationSearch: { screen: LocationSearch }
  },
  {
    initialRouteName: 'Profile'
  }
);

const CustomerActivityNavigator = createStackNavigator({
    CustomerActivity: { screen: CustomerActivity }
  },
  {
    initialRouteName: 'CustomerActivity'
  }
);

const CustomerSectionTabNavigator = createBottomTabNavigator(
  {
    Explore: { screen: Explore },
    CustomerActivityNavigator: { screen: CustomerActivityNavigator,
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
          <MaterialIcons
            name="person"
            size={24}
            color={focused ? activeColor : inactiveColor}
          />
        )
      }
    }
  },
  {
    initialRouteName: 'Explore',
    tabBarOptions
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
    initialRouteName: 'VendorAccountMenu'
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

// const VendorDeliveryNavigator = createStackNavigator(
//   {
//     Delivery: { screen: Delivery },
//     OpenDeliveryDetails: { screen: OpenDeliveryDetails }
//   },
//   {
//     headerMode: 'screen'
//   }
// );

const VendorActivityNavigator = createStackNavigator(
  {
    Activity: { screen: Activity },
    VendorAdminActivityDetails: { screen: VendorAdminActivityDetails }
  },
  {
    headerMode: 'screen'
  }
);

const VendorNavigator = createBottomTabNavigator(
  {
    VendorTablesNavigator: { screen: VendorTablesNavigator,
      navigationOptions: {
        title:'Tables',
        tabBarIcon: ({ focused }) => (
          <Image
            style={{
              height: 24,
              width: 24,
              tintColor: focused ? activeColor : inactiveColor
            }}
            source={require('../../../../assets/images/icons/TableIcon.png')}
          />
        )
      }
    },

    // VendorDeliveryNavigator: { screen: VendorDeliveryNavigator,
    //   navigationOptions: {
    //     title:'Delivery',
    //     tabBarIcon: ({ focused }) => (
    //       <Image
    //         style={{
    //           height: 24,
    //           width: 24,
    //           tintColor: focused ? activeColor : inactiveColor
    //         }}
    //         source={require('../../../../assets/images/icons/Delivery.png')}
    //       />
    //     )
    //   }
    // },

    VendorActivityNavigator: { screen: VendorActivityNavigator,
      navigationOptions: {
        title:'Activity',
        tabBarIcon: ({ focused }) => (
          <Feather
            name="bell"
            size={24}
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
          <Image
            style={{
              height: 22,
              width: 22,
              resizeMode: 'contain',
              tintColor: focused ? activeColor : inactiveColor
            }}
            source={require('../../../../assets/images/icons/VendorProfile.png')}
          />
        )
      }
    }
  },
  {
    initialRouteName: 'VendorProfile',
    tabBarOptions,
    tabBarComponent: VendorTabBar
  }
);

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
