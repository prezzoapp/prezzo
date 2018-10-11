import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
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
    fontSize: wp('3.46%'),
    fontFamily: FONT_FAMILY,
    paddingVertical: wp('1.33%')
  },

  unselectedText: {
    color: '#FAFAFA',
    fontSize: wp('3.46%'),
    fontFamily: FONT_FAMILY,
    marginVertical: 5
  },

  container: {
    // marginHorizontal: wp('4.26%')
    // width: wp('91.46%')
    // width: '100%'
  },

  listSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    // backgroundColor: 'red',
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
    backgroundColor: '#2ED573',
    height: 1,
    marginTop: 15
  }
});

export default styles;
