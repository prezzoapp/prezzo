import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { SF_PRO_TEXT_BOLD, SF_PRO_TEXT_MEDIUM } from '../../services/constants';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingBottom: hp('1.47%'),
    paddingLeft: wp('4.26%'),
    // paddingRight: wp('18.66%'),
    paddingRight: wp('22.92%')
  },

  userImageContainer: {
    width: wp('8.53%'),
    height: wp('8.53%'),
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
    right: wp('2.93%')
  },

  seprator: {
    height: 1,
    backgroundColor: '#2ED573',
    width: '100%'
  },

  buttonContainer: {
    position: 'absolute',
    right: wp('4.26%'),
    flexDirection: 'row'
  },

  delete: {
    marginRight: wp('5%')
  },

  itemImagesListStyle: {
    paddingTop: wp('3.2%'),
    paddingHorizontal: wp('4.26%')
  },

  separator: {
    width: wp('4%')
  }
});

export default styles;
