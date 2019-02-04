import { StyleSheet } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

const styles = StyleSheet.create({
  tabBarHolder: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent'
  },

  innerContainer: {
    flex: 1,
    justifyContent: 'flex-start'
  },

  linearGradient: {
    flex: 1,
    paddingBottom: getBottomSpace()
  },

  tabBarContainer: {
    height: 49
  }
});

export default styles;
