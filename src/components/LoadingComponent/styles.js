import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { FONT_FAMILY } from '../../services/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingView: {
    backgroundColor: 'white',
    padding: wp('4%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    flexDirection: 'row'
  },
  waitText: {
    fontFamily: FONT_FAMILY,
    fontSize: wp('4%'),
    paddingLeft: wp('2.66%')
  }
});

export default styles;
