import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { COLOR_BLACK } from '../../../services/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_BLACK,
    paddingLeft: wp('5%')
  },
  headerLeftBtn: {
    marginLeft: wp('4.4%')
  },

  contentContainerStyle: {
    paddingTop: wp('10.66%')
  }
});

export default styles;
