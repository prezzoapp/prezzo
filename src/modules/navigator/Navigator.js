// @Flow
import {Platform} from 'react-native';
import {TabNavigator, StackNavigator} from 'react-navigation';

import Tutorial from '../../components/Tutorial';
import EnableNotifications from '../EnableNotifications';
import SignupName from '../Signup/SignupName';
import SignupEmail from '../Signup/SignupEmail';
import SignupPassword from '../Signup/SignupPassword';
import SignupComplete from '../Signup/SignupComplete';

import CounterViewContainer from '../counter/CounterViewContainer';
import ColorViewContainer from '../colors/ColorViewContainer';

const headerColor = '#39babd';
const activeColor = 'white';

// TabNavigator is nested inside StackNavigator
export const MainScreenNavigator = TabNavigator({
  Counter: {screen: CounterViewContainer},
  Color: {screen: ColorViewContainer}
}, {
  tabBarOptions: {
    ...Platform.select({
      android: {
        activeTintColor: activeColor,
        indicatorStyle: {backgroundColor: activeColor},
        style: {backgroundColor: headerColor}
      }
    })
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

Tutorial.navigationOptions = {
  header: null
};

// Root navigator is a StackNavigator
const AppNavigator = StackNavigator({
  Home: {screen: Tutorial},
  EnableNotifications: {screen: EnableNotifications},
  SignupName: {screen: SignupName},
  SignupEmail: {screen: SignupEmail},
  SignupPassword: {screen: SignupPassword},
  SignupComplete: {screen: SignupComplete},
  InfiniteColorStack: {screen: ColorViewContainer}
}, {
  initialRouteName: 'Home'
});

export default AppNavigator;
