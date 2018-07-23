import React, {PureComponent} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet, FlatList} from 'react-native';
import PropTypes from 'prop-types';

import DropArrowIcon from 'react-native-vector-icons/EvilIcons';
import SearchInput from '../../../components/SearchInput';
import FilterItems from './filterItems';

import Slider from 'react-native-slider';

import {
  FONT_FAMILY_BOLD,
  FONT_FAMILY_MEDIUM
} from '../../../services/constants';

export default class HeaderSection extends PureComponent {
  static propTypes = {
    navigate: PropTypes.func.isRequired,
    toggleFilter: PropTypes.func,
    filtersReducer: PropTypes.object,
    selectedFilterID: PropTypes.func,
    selectedFilterIDReducer: PropTypes.object
  };

  constructor() {
    super();
    this.state = {showFilters: false};
  }

  render() {
    const filtersList = this.props.filtersReducer.get('filters').toJS();

    return (
      <View style={styles.header}>
        <SearchInput />

        <View style={styles.filterPanel}>
          <Text style={styles.nearMeText}>Near Me</Text>
          <View style={styles.mainTitleFilterAndMapIconHolder}>
            <Text style={styles.restaurantTitle}>Restaurants</Text>
            <View style={styles.filterButtonAndMapIconHolder}>
              <TouchableOpacity activeOpacity={0.6}
                style={styles.filterBtn}
                onPress={() => this.setState({showFilters: !this.state.showFilters})}>
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

        {(this.state.showFilters) &&
          <View style={styles.filtersHolder}>
            <FlatList
              horizontal
              contentContainerStyle={styles.filtersList}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              data={filtersList}
              renderItem={({item}) =>
                <FilterItems item={item}
                  toggleFilter={() => this.props.toggleFilter(item.id)}
                  selectedFilterID={() => this.props.selectedFilterID(item.id)} />
              }
            />

            <View>
              {
                filtersList.map((item) => {
                  if (item.filterType === 'realtime' && item.active === true) {
                    return (
                      <View key={item.id} style={styles.slidersHolder}>
                        <View style={styles.sliderTitleHolder}>
                          <Text style={styles.sliderTitleText}>Distance</Text>
                          <Text style={styles.sliderTitleText}>2mi</Text>
                        </View>
                        <Slider
                          minimumValue={0}
                          maximumValue={2}
                          minimumTrackTintColor='rgb(47,212,117)'
                          maximumTrackTintColor='rgb(230,230,230)'
                          thumbTintColor='rgb(255,254,255)'
                          thumbStyle={{height: 18, width: 18}}
                          trackStyle={{height: 3}}/>
                      </View>
                    );
                  }
                  else if (item.filterType === 'price' && item.active === true) {
                    return (
                      <View key={item.id} style={styles.slidersHolder}>
                        <Slider
                          minimumValue={0}
                          maximumValue={100}
                          step={parseFloat((100 / 3).toFixed(2))}
                          minimumTrackTintColor='rgb(47,212,117)'
                          maximumTrackTintColor='rgb(230,230,230)'
                          thumbTintColor='rgb(255,254,255)'
                          thumbStyle={{height: 18, width: 18}}
                          onValueChange={(value) => console.log(value)}
                          trackStyle={{height: 3}}/>
                      </View>
                    );
                  }
                })
              }
            </View>
          </View>
        }
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
    paddingVertical: 15,
    backgroundColor: '#2B2C2C'
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
  }
});
