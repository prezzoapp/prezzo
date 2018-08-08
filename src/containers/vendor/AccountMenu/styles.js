// @flow
import { StyleSheet } from 'react-native';
import { FONT_FAMILY, COLOR_BLACK } from '../../../services/constants';

export default StyleSheet.create({
  avatar: {
    alignSelf: 'flex-end',
    borderColor: 'white',
    borderRadius: 51,
    borderWidth: 2,
    height: 102,
    resizeMode: 'cover',
    width: 102
  },
  avatarContainer: {},
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
  footerContainer: {
    alignSelf: 'center',
    justifyContent: 'space-between',
    flex: 0.15,
    flexDirection: 'row',
    marginTop: 20,
    width: '85%'
  },
  footerLeft: {
    alignSelf: 'flex-start'
  },
  footerRight: {
    alignSelf: 'flex-end'
  },
  footerText: {
    color: 'white',
    fontFamily: FONT_FAMILY,
    fontSize: 18
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
