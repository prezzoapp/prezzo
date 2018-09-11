import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },

  listHolder: {
    flex: 1,
    marginTop: hp('11.57%')
  },

  listSeparator: {
    height: 1,
    backgroundColor: '#979797'
  }
});

export default styles;
