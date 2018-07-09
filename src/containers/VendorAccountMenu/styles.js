// @flow
import {StyleSheet} from 'react-native';
import {
  FONT_FAMILY,
  FONT_FAMILY_BOLD,
  COLOR_BLACK
} from '../../services/constants';

export default StyleSheet.create({
  avatar: {
    alignSelf: 'flex-end',
    borderColor: 'white',
    borderRadius: 51,
    borderWidth: 2,
    height: 102,
    resizeMode: 'contain',
    width: 102
  },
  avatarContainer: {
    display: 'none',
    marginBottom: 20
  },
  bodyContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    height: 'auto',
    marginTop: 28
  },
  container: {
    alignItems: 'center',
    height: '100%',
    marginHorizontal: 25,
    marginVertical: 70,
    paddingTop: 100,
    width: '100%'
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  parent: {
    alignItems: 'center',
    backgroundColor: COLOR_BLACK,
    flex: 1,
    justifyContent: 'center'
  }
});
