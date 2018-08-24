import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  item: {
    height: 60,
    width: 60,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5
  },

  itemImage: {
    height: 28,
    width: 28,
    resizeMode: 'contain'
  },

  itemName: {
    color: 'rgb(255,251,245)',
    fontSize: 11,
    textAlign: 'center',
    paddingTop: 3
  }
});

export default styles;
