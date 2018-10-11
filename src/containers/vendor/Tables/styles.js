import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#2B2C2C'
  },

  tabBarUnderLineStyle: {
    backgroundColor: '#2ED573'
  },

  tabBarTextStyle: {
    fontSize: 15
  },

  innerContainer: {
    marginTop: 145,
    width: wp('91.46%'),
    flex: 1
  },

  flatListStyle: {
    paddingTop: hp('0.61%'),
    paddingBottom: hp('2.46%')
  }
});

export default styles;
