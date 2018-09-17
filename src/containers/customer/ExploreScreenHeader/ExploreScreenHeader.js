// @flow
import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import Slider from 'react-native-slider';
import { BlurView } from 'react-native-blur';

import DropArrowIcon from 'react-native-vector-icons/EvilIcons';
import FilterItem from '../../../components/FilterItem';
import styles from './styles';

export default class ExploreScreenHeader extends PureComponent {
  static propTypes = {
    navigate: PropTypes.func.isRequired,
    toggleFilter: PropTypes.func.isRequired,
    filters: PropTypes.array.isRequired,
    updateDistance: PropTypes.func.isRequired,
    currentLatitude: PropTypes.number.isRequired,
    currentLongitude: PropTypes.number.isRequired,
    maxDistance: PropTypes.number.isRequired,
    minDistance: PropTypes.number.isRequired,
    distance: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
    this.state = { showFilters: false, sliderValue: this.props.distance };
  }

  changeDistance(value) {
    const distance = parseFloat(value.toFixed(1));
    console.log(distance);
    this.props.updateDistance(
      this.props.currentLatitude,
      this.props.currentLongitude,
      distance
    );
  }

  render() {
    const { filters } = this.props;

    return (
      <View style={styles.header}>
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
                <DropArrowIcon
                  name="chevron-down"
                  size={25}
                  color="#fafafa"
                  style={styles.dropArrowIcon}
                />
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

        {this.state.showFilters &&
          <View style={styles.filtersHolder}>
            <BlurView style={styles.blurView} blurType="dark" blurAmount={6} />
            <FlatList
              horizontal
              contentContainerStyle={styles.filtersList}
              keyExtractor={item => item._id.toString()}
              showsHorizontalScrollIndicator={false}
              data={filters}
              renderItem={({ item }) =>
                <FilterItem
                  image={item.image}
                  name={item.name}
                  on={item.on}
                  style={{ marginRight: 12 }}
                  toggleFilter={() => this.props.toggleFilter(item._id)}
                />
              }
            />

            <View>
              {filters.map(item => {
                if (item.filterType === 'realtime' && item.on === true) {
                  return (
                    <View key={item._id} style={styles.slidersHolder}>
                      <View style={styles.sliderTitleHolder}>
                        <Text style={styles.sliderTitleText}>Distance</Text>
                        <Text style={styles.sliderTitleText}>
                          {this.props.maxDistance}mi
                        </Text>
                      </View>
                      <Slider
                        minimumValue={this.props.minDistance}
                        maximumValue={this.props.maxDistance}
                        minimumTrackTintColor="rgb(47,212,117)"
                        maximumTrackTintColor="rgb(230,230,230)"
                        thumbTintColor="rgb(255,254,255)"
                        thumbStyle={{ height: 18, width: 18 }}
                        value={this.state.sliderValue}
                        trackStyle={{ height: 3 }}
                        onSlidingComplete={value => this.changeDistance(value)}
                      />
                    </View>
                  );
                } else if (item.filterType === 'price' && item.on === true) {
                  return (
                    <View key={item._id} style={styles.slidersHolder}>
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
              })}
            </View>
          </View>
        }
      </View>
    );
  }
}
