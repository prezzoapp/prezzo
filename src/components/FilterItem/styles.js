import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  item: {
    height: 60,
    width: 60,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },

  itemImage: {
    height: 28,
    width: 28,
    resizeMode: 'cover'
  },

  itemName: {
    color: 'rgb(255,251,245)',
    fontSize: 11,
    textAlign: 'center',
    paddingTop: 8
  }
});

export default styles;
