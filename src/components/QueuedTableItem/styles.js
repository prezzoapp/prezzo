import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { FONT_FAMILY, FONT_FAMILY_MEDIUM } from '../../services/constants';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#3A3A3A',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginHorizontal: wp('4.26%'),
    shadowOffset: { width: 1, height: 6 },
    shadowColor: 'black',
    shadowOpacity: 0.7
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'white'
  },
  textContainer: {
    flexDirection: 'column',
    paddingLeft: 10
  },
  userName: {
    color: 'white',
    fontFamily: Expo.Font.processFontFamily(FONT_FAMILY_MEDIUM),
    fontSize: 20
  },
  tableId: {
    color: 'white',
    fontFamily: Expo.Font.processFontFamily(FONT_FAMILY),
    fontSize: 14
  },
  statusText: {
    color: '#2ED573',
    fontFamily: Expo.Font.processFontFamily(FONT_FAMILY),
    marginLeft: 5
  },
  statusContainer: {
    flexDirection: 'row'
  },
  add: {
    position: 'absolute',
    right: 10
  },
  delete: {
    position: 'absolute',
    right: 50
  }
});

export default styles;
