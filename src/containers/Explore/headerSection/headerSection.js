import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet, FlatList} from 'react-native';
import PropTypes from 'prop-types';

import DropArrowIcon from 'react-native-vector-icons/EvilIcons';
import SearchInput from '../../../components/SearchInput';

import {
  FONT_FAMILY_BOLD,
  FONT_FAMILY_MEDIUM
} from '../../../services/constants';

export default class HeaderSection extends Component {
  static propTypes = {
    navigate: PropTypes.func.isRequired
  };

  render() {
    console.log(this.props.filtersReducer);
    return (
      <View style={styles.header}>
        <SearchInput />

        <View style={styles.filterPanel}>
          <Text style={styles.nearMeText}>Near Me</Text>
          <View style={styles.mainTitleFilterAndMapIconHolder}>
            <Text style={styles.restaurantTitle}>Restaurants</Text>
            <View style={styles.filterButtonAndMapIconHolder}>
              <TouchableOpacity activeOpacity={0.6} style={styles.filterBtn}>
                <Text style={styles.filter}> Filter</Text>
                <DropArrowIcon name='chevron-down' size={25} color='#fafafa' />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.6}
                style={{marginLeft: 10}}
                onPress={() => this.props.navigate({routeName: 'Maps'})}>
                <Image
                  source={require('../../../../assets/images/location_icon.png')}
                  style={styles.location_pin} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

         <View style={[styles.filtersHolder]}>
          <FlatList
            horizontal
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            data={this.props.filtersReducer}
            renderItem={({item}) =>
              <View style={styles.item}>
                {/* <Image source={require(item.image)} style={styles.itemImage} /> */}
              </View>
            }
          />
         </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header:
  {
    alignSelf: 'stretch',
    position: 'absolute',
    top: 15,
    left: 0,
    right: 0,
    zIndex: 999
  },

  nearMeText:
  {
    fontSize: 15,
    color: 'rgb(50, 209, 119)',
    fontFamily: FONT_FAMILY_MEDIUM
  },

  filterPanel:
  {
    paddingHorizontal: 15,
    paddingTop: 8
  },

  filter:
  {
    color: '#fafafa',
    fontSize: 13
  },

  location_pin:
  {
    width: 30, height: 30
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
    fontSize: 25
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
    paddingHorizontal: 12,
    paddingVertical: 15,
    backgroundColor: '#2B2C2C'
  },

  item: {
    height: 60,
    width: 60,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#757575',
    marginRight: 10
  },

  itemImage: {
    height: 28,
    width: 28,
    resizeMode: 'contain'
  }
});