import { StyleSheet } from 'react-native';
import { FONT_FAMILY, FONT_FAMILY_MEDIUM } from '../../services/constants';

const styles = StyleSheet.create({
  container: {
    width: 110,
    height: 190,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 5
  },

  itemImage: {
    height: 100,
    width: 100,
    resizeMode: 'contain',
    borderRadius: 5
  },

  itemName: {
    color: '#fff',
    fontFamily: FONT_FAMILY,
    width: '80%',
    fontSize: 15
  },

  itemTextContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 5
  },

  quantity: {
    marginLeft: 13,
    color: '#fff',
    fontFamily: FONT_FAMILY,
    fontSize: 15
  },

  dot: {
    color: '#0DD24A',
    marginTop: 5,
    marginRight: 5
  }
});

export default styles;
