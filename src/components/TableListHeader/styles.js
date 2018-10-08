import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { FONT_FAMILY } from '../../services/constants';

const styles = StyleSheet.create({
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
    marginHorizontal: wp('4.26%'),
    height: 50
  },

  listSection: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  textContainer: {
    flexDirection: 'column',
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center'
  },

  icons: {
    flexDirection: 'column',
    width: '12%',
    justifyContent: 'center',
    alignItems: 'center'
  },

  seperator: {
    backgroundColor: '#2ED573',
    height: 1,
    marginVertical: 15
  }
});

export default styles;
