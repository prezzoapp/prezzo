// @flow
import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import Slider from 'react-native-slider';
import LinearGradient from 'react-native-linear-gradient';

import DropArrowIcon from 'react-native-vector-icons/EvilIcons';
import ExploreSearchInput from '../../../components/ExploreSearchInput';
import FilterItem from '../../../components/FilterItem';
import styles from './styles';

export default class ExploreScreenHeader extends PureComponent {
  static propTypes = {
    navigate: PropTypes.func.isRequired,
    toggleFilter: PropTypes.func.isRequired,
    filtersReducer: PropTypes.object.isRequired
  };

  constructor() {
    super();
    this.state = { showFilters: false };
  }

  render() {
    const filtersList = this.props.filtersReducer.filters;

    return (
      <View style={styles.header}>
        <LinearGradient
          colors={['rgb(0,0,0)', 'transparent']}
          style={styles.LinearGradientStyle}
        >
          <ExploreSearchInput />

          <View style={styles.filterPanel}>
            <Text style={styles.nearMeText}>Near Me</Text>
            <View style={styles.mainTitleFilterAndMapIconHolder}>
              <Text style={styles.restaurantTitle}>Restaurants</Text>
              <View style={styles.filterButtonAndMapIconHolder}>
                <TouchableOpacity activeOpacity={0.6}
                  style={styles.filterBtn}
                  onPress={() =>
                    this.setState({ showFilters: !this.state.showFilters })
                  }
                >
                  <Text style={styles.filter}> Filter</Text>
                  <DropArrowIcon name="chevron-down" size={25} color="#fafafa" style={styles.dropArrowIcon}/>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.6}
                  style={{ marginLeft: 10 }}
                  onPress={() => this.props.navigate({ routeName: 'MapScreen' })}
                >
                  <Image
                    source={require('../../../../assets/images/location_icon.png')}
                    style={styles.locationPin} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </LinearGradient>

        {this.state.showFilters &&
          <View style={styles.filtersHolder}>
            <FlatList
              horizontal
              contentContainerStyle={styles.filtersList}
              keyExtractor={item => item.id}
              showsHorizontalScrollIndicator={false}
              data={filtersList}
              renderItem={({ item }) =>
                <FilterItem item={item}
                  toggleFilter={() => this.props.toggleFilter(item.id)}
                />
              }
            />

            <View>
              {filtersList.map(item => {
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
                        minimumTrackTintColor="rgb(47,212,117)"
                        maximumTrackTintColor="rgb(230,230,230)"
                        thumbTintColor="rgb(255,254,255)"
                        thumbStyle={{ height: 18, width: 18 }}
                        trackStyle={{ height: 3 }}
                      />
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
                        minimumTrackTintColor="rgb(47,212,117)"
                        maximumTrackTintColor="rgb(230,230,230)"
                        thumbTintColor="rgb(255,254,255)"
                        thumbStyle={{ height: 18, width: 18 }}
                        onValueChange={value => console.log(value)}
                        trackStyle={{ height: 3 }}
                      />
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
