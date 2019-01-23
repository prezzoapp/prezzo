import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { SF_PRO_TEXT_REGULAR } from '../../services/constants';

const styles = StyleSheet.create({
  filterItem: {
    marginRight: wp('2.66%')
  },

  item: {
    height: wp('16%'),
    width: wp('16%'),
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5
  },

  itemImage: {
    height: wp('7.46%'),
    width: wp('7.46%'),
    resizeMode: 'contain'
  },

  itemName: {
    color: 'rgb(255,251,245)',
    fontSize: wp('2.93%'),
    textAlign: 'center',
    paddingTop: 3,
    fontFamily: SF_PRO_TEXT_REGULAR
  }
});

export default styles;
