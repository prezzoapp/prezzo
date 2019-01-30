import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { SF_PRO_TEXT_BOLD, SF_PRO_TEXT_MEDIUM } from '../../services/constants';

const styles = StyleSheet.create({
  container: {
    // marginTop: hp('1.84%')
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: hp('1.47%'),
    paddingRight: wp('18.66%')
  },

  userImage: {
    width: wp('8.53%'),
    height: wp('8.53%'),
    borderRadius: wp('4.26%'),
    borderWidth: 1,
    borderColor: '#fff'
  },

  userName: {
    color: '#fff',
    fontSize: wp('4.53%'),
    fontFamily: SF_PRO_TEXT_BOLD,
    paddingLeft: wp('2.13%'),
    flex: 1
  },

  tableId: {
    color: '#fff',
    fontSize: wp('3.73%'),
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
