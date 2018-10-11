import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { FONT_FAMILY, FONT_FAMILY_MEDIUM } from '../../services/constants';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: '#3A3A3A',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('1.84%'),
    marginHorizontal: 1,
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
    paddingLeft: 10,
    flex: 1,
    paddingRight: wp('8%')
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
    fontFamily: Expo.Font.processFontFamily(FONT_FAMILY)
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
