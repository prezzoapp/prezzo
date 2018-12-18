import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  tabBarHolder: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    height: hp('9%')
  },

  innerContainer: {
    flex: 1,
    justifyContent: 'flex-start'
  }
});

export default styles;
