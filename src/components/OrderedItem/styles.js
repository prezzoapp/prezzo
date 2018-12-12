import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { FONT_FAMILY } from '../../services/constants';

const styles = StyleSheet.create({
  container: {
    paddingBottom: hp('2.4%'),
    marginRight: wp('4%'),
    width: wp('26.66%')
  },

  itemImage: {
    height: wp('26.66%'),
    flex: 1,
    resizeMode: 'cover',
    borderRadius: 5
  },

  itemName: {
    color: '#fff',
    fontFamily: FONT_FAMILY,
    fontSize: wp('4%'),
    paddingRight: 5,
    flex: 1
  },

  itemTextContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 5
  },

  quantity: {
    marginLeft: 13,
    color: '#fff',
    fontFamily: FONT_FAMILY,
    fontSize: 15
  },

  dot: {
    color: '#0DD24A',
    marginTop: 5,
    marginRight: 5
  }
});

export default styles;
