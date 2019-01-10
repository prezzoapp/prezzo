import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  btn: {
    padding: 3
  },

  ratingBarContainer: {
    flexDirection: 'row'
  },

  starImage: {
    width: wp('5.33%'),
    height: wp('5.33%'),
    resizeMode: 'cover',
    tintColor: '#FFD64D'
  }
});

export default styles;
