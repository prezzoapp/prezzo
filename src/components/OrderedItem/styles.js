import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { FONT_FAMILY_MEDIUM } from '../../services/constants';

const styles = StyleSheet.create({
  container: {
    marginRight: wp('4%'),
    width: wp('26.66%')
  },

  itemImageContainer: {
    height: wp('26.66%'),
    width: wp('26.66%'),
    overflow: 'hidden',
    borderRadius: 5
  },

  itemImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },

  itemName: {
    color: '#fff',
    fontFamily: FONT_FAMILY_MEDIUM,
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
    fontFamily: FONT_FAMILY_MEDIUM,
    fontSize: 15
  },

  dot: {
    color: '#0DD24A',
    marginTop: 5,
    marginRight: 5
  }
});

export default styles;
