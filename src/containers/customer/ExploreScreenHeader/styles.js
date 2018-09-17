import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import {
  FONT_FAMILY_BOLD,
  FONT_FAMILY_MEDIUM
} from '../../../services/constants';

const styles = StyleSheet.create({
  header: {
    alignSelf: 'stretch',
    position: 'absolute',
    top: hp('8.86%'),
    left: 0,
    right: 0
  },

  nearMeText: {
    fontSize: 15,
    color: 'rgb(50, 209, 119)',
    fontFamily: FONT_FAMILY_MEDIUM,
    backgroundColor: 'transparent'
  },

  filterPanel: {
    paddingHorizontal: 15,
    paddingTop: 8
  },

  filter: {
    color: '#fafafa',
    fontSize: 13,
    backgroundColor: 'transparent'
  },

  dropArrowIcon: {
    backgroundColor: 'transparent'
  },

  locationPin: {
    width: 30,
    height: 30
  },

  mainTitleFilterAndMapIconHolder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'rgb(36, 49, 42)',
    paddingBottom: 10
  },

  restaurantTitle: {
    fontFamily: FONT_FAMILY_BOLD,
    color: 'white',
    fontSize: 25,
    backgroundColor: 'transparent'
  },

  filterButtonAndMapIconHolder: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  filterBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  filtersHolder: {
    paddingVertical: 15
  },

  filtersList: {
    paddingLeft: 12
  },

  slidersHolder: {
    paddingHorizontal: 30,
    paddingVertical: 15
  },

  sliderTitleText: {
    color: 'rgb(255,251,245)',
    fontSize: 11
  },

  sliderTitleHolder: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  blurView: {
    ...StyleSheet.absoluteFillObject
  }
});

export default styles;
