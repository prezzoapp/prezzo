// @Flow
import {Platform} from 'react-native';
import {TabNavigator, StackNavigator} from 'react-navigation';

import Tutorial from '../../components/Tutorial';
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
  InfiniteColorStack: {screen: ColorViewContainer}
});

export default AppNavigator;