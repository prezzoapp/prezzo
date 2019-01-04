import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import {
  FONT_FAMILY,
  SF_PRO_TEXT_BOLD,
  SF_PRO_TEXT_MEDIUM
} from '../../services/constants';

const styles = StyleSheet.create({
  container: {
    paddingTop: 10
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp('1.23%'),
    paddingRight: wp('18.66%')
  },

  userImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#fff',
    paddingVertical: hp('1.47%')
  },

  userName: {
    color: '#fff',
    fontSize: 17,
    fontFamily: SF_PRO_TEXT_BOLD,
    paddingLeft: 10,
    flex: 1
  },

  tableId: {
    color: '#fff',
    fontSize: 14,
    fontFamily: SF_PRO_TEXT_MEDIUM
  },

  arrowBtn: {
    position: 'absolute',
    right: 0
  },

  seprator: {
    height: 1,
    backgroundColor: '#2ED573',
    width: '100%'
  },

  buttonContainer: {
    position: 'absolute',
    right: 0,
    flexDirection: 'row'
  },

  delete: {
    marginRight: wp('5%')
  }
});

export default styles;
