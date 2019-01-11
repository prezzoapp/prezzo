import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { FONT_FAMILY_MEDIUM } from '../../services/constants';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp('4.26%')
  },

  selectedTab: {
    borderBottomWidth: hp('0.24%'),
    borderBottomColor: '#2ED573'
  },

  unselectedTab: {
    borderBottomWidth: hp('0.24%'),
    borderBottomColor: 'transparent'
  },

  selectedText: {
    color: 'white',
    fontSize: wp('3.46%'),
    fontFamily: FONT_FAMILY_MEDIUM,
    paddingBottom: hp('0.36%')
  },

  unselectedText: {
    color: '#FAFAFA',
    fontSize: wp('3.46%'),
    fontFamily: FONT_FAMILY_MEDIUM,
    paddingBottom: hp('0.36%')
  },

  listSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: wp('2.40%')
  },

  textContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },

  icons: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },

  seperator: {
    backgroundColor: 'rgba(46, 213, 115, 0.3)',
    height: 1,
    marginTop: hp('2.58%')
  }
});

export default styles;
