import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { FONT_FAMILY, FONT_FAMILY_MEDIUM } from '../../services/constants';

const styles = StyleSheet.create({
  container: {
    padding: wp('2.66%'),
    flex: 1,
    backgroundColor: '#3A3A3A',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    height: wp('17.68%'),
    marginHorizontal: wp('4.26%'),
    shadowOffset: { width: 1, height: 6 },
    shadowColor: 'black',
    shadowOpacity: 0.7
  },
  userImageContainer: {
    width: wp('10.66%'),
    height: wp('10.66%'),
    borderRadius: wp('5.33%'),
    borderWidth: 1,
    borderColor: 'white',
    overflow: 'hidden'
  },
  userImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  textContainer: {
    flexDirection: 'column',
    paddingLeft: 10,
    flex: 1,
    paddingRight: wp('8%')
  },
  userName: {
    color: 'white',
    fontFamily: FONT_FAMILY_MEDIUM,
    fontSize: wp('5.33%')
  },
  tableId: {
    color: 'white',
    fontFamily: FONT_FAMILY_MEDIUM,
    fontSize: wp('3.73%')
  },
  statusText: {
    fontFamily: FONT_FAMILY,
    fontSize: wp('3.73%')
  },
  statusContainer: {
    flexDirection: 'row',
    flex: 1
  },
  arrow: {
    position: 'absolute',
    right: 10
  }
});

export default styles;
