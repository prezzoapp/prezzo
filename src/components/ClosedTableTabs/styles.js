import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { FONT_FAMILY } from '../../services/constants';

const styles = StyleSheet.create({
  selectedTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#2ED573'
  },

  unselectedTab: {
    borderBottomWidth: 2,
    borderBottomColor: 'transparent'
  },

  selectedText: {
    color: 'white',
    fontSize: 13,
    fontFamily: FONT_FAMILY,
    marginVertical: 5
  },

  unselectedText: {
    color: '#FAFAFA',
    fontSize: 13,
    fontFamily: FONT_FAMILY,
    marginVertical: 5
  },

  container: {
    // marginHorizontal: wp('6.66%'),
    paddingVertical: hp('1%'),
    // backgroundColor: 'green'
  },

  listSection: {
    flexDirection: 'row',
    paddingHorizontal: wp('2.40%')
  },

  textContainer: {
    flexDirection: 'column',
    width: '25%',
    justifyContent: 'center',
    alignItems: 'flex-start'
  }
});

export default styles;
