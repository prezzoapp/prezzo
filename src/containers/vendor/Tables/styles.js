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
    marginTop: hp('20.68%'),
    width: '100%',
    flex: 1
  },

  flatListStyle: {
    paddingTop: hp('0.65%'),
    paddingBottom: hp('11%'),
    paddingHorizontal: wp('4.26%')
  },
  loaderView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)'
  },

  separator: {
    height: 1,
    backgroundColor: '#2ED573',
    width: '100%'
  },

  message: {
    color: 'white',
    fontSize: 20
  }
});

export default styles;
