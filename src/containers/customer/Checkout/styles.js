import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.8)',
    zIndex: 999
  },

  modalView: {
    minHeight: hp('78.81%'),
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden'
  },

  blurView: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30
  },

  tabBarIconsHolder: {
    width: wp('100%'),
    alignItems: 'center',
    paddingVertical: wp('5%')
  },

  bottom_arrow: {
    width: wp('8%'),
    height: wp('5%'),
    resizeMode: 'contain'
  },

  bottomArrowIconContainer: {
    alignItems: 'center',
    paddingTop: wp('2.5%')
  },

  icon: {
    height: 30,
    width: 30,
    resizeMode: 'contain'
  }
});

export default styles;
