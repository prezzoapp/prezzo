import { StyleSheet } from 'react-native';
import { FONT_FAMILY } from '../../services/constants';

const styles = StyleSheet.create({
  selectedText: {
    color: 'white',
    fontSize: 13,
    fontFamily: FONT_FAMILY,
    marginVertical: 5
  },

  unselectedText: {
    color: '#FAFAFA',
    fontSize: 13,
    fontFamily: FONT_FAMILY,
    marginVertical: 5
  },

  container: {
    marginHorizontal: 15,
    paddingTop:5,
    height: 50
  },

  listSection: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  textContainer: {
    flexDirection: 'column',
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default styles;
