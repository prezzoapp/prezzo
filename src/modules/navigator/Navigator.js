// @flow
import {TabNavigator, StackNavigator} from 'react-navigation';

import Tutorial from '../../components/Tutorial';
import EnableNotifications from '../EnableNotifications';
import SignupName from '../Signup/SignupName';
import SignupEmail from '../Signup/SignupEmail';
import SignupPassword from '../Signup/SignupPassword';
import SignupComplete from '../Signup/SignupComplete';

import CounterViewContainer from '../counter/CounterViewContainer';
import Explore from '../Explore';

const headerColor = '#2B2C2C';
const activeColor = 'white';

// TabNavigator is nested inside StackNavigator
export const MainScreenNavigator = TabNavigator({
  Explore: {screen: Explore},
  Counter: {screen: CounterViewContainer}
}, {
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

MainScreenNavigator.navigationOptions = {
  title: 'Prezzo',
  headerTitleStyle: {color: 'white'},
  headerStyle: {
    backgroundColor: headerColor,
    elevation: 0 // disable header elevation when TabNavigator visible
  }
};

// Root navigator is a StackNavigator
const AppNavigator = StackNavigator({
  Home: {screen: Tutorial},
  EnableNotifications: {screen: EnableNotifications},
  SignupName: {screen: SignupName},
  SignupEmail: {screen: SignupEmail},
  SignupPassword: {screen: SignupPassword},
  SignupComplete: {screen: SignupComplete},
  Main: {screen: MainScreenNavigator}
}, {
  initialRouteName: 'Home'
});

export default AppNavigator;
