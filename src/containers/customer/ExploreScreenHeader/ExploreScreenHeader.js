// @flow
import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, Alert } from 'react-native';
import PropTypes from 'prop-types';
import Slider from 'react-native-slider';
import { LinearGradient, BlurView, Location, Permissions } from 'expo';
import { EvilIcons } from '../../../components/VectorIcons';
import ExploreSearchInput from '../../../components/ExploreSearchInput';
import FilterItem from '../../../components/FilterItem';
import styles from './styles';
import {NetInfo} from 'react-native';


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
    this.state = {
      showFilters: false
    };

    this.activeFilters = [];
  }

  hideFilterPanel() {
    this.setState(() => {
      return {
        showFilters: false
      }
    });
  }

  updateDistance(distance) {
    const newDistance = parseFloat(distance.toFixed(1));
    this.props.updateDistance(newDistance).then(() => {
      this.props.listVendors(
        this.props.currentLatitude,
        this.props.currentLongitude,
        this.props.distance,
        this.activeFilters.join(','),
        this.props.pricing
      ).then(() => {
          // this.hideFilterPanel();
      });
    });
  }

  updatePrice(price) {
    this.props.updatePrice(price).then(() => {
      this.props.listVendors(
        this.props.currentLatitude,
        this.props.currentLongitude,
        this.props.distance,
        this.activeFilters.join(','),
        this.props.pricing
      ).then(() => {
          // this.hideFilterPanel();
      });
    });
  }

  toggleFilter(id) {
    this.activeFilters = [];
    this.props.toggleFilter(id).then(() => {
      this.props.filters.map(item => {
          if(item.on) {
            this.activeFilters.push(item.filterType);
          }
      });

      this.props.listVendors(
        this.props.currentLatitude,
        this.props.currentLongitude,
        this.props.distance,
        this.activeFilters.join(','),
        this.props.pricing
      ).then(() => {
          // this.hideFilterPanel();
      });
    });
  }

  _getLocationAsync = async () => {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);

      NetInfo.isConnected.fetch().done(
        (isConnected) => { console.log(isConnected);
         if(isConnected)
         {
           this.props.navigate({ routeName: 'MapScreen' });
         }
         else{

              Alert.alert(
               'Prezzo',
                'Please check your internet connection and try again later.',
                [
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
              )
         }

        }
      );



    // let { status } = await Permissions.askAsync(Permissions.LOCATION);
    // const { locationServicesEnabled } = await Location.getProviderStatusAsync({});
    // if (locationServicesEnabled === false || status !== 'granted') {
    //   Alert.alert(
    //     'Prezzo',
    //     'Uh oh! Location service Unavailable.',
    //     [
    //       {text: 'OK', onPress: () => console.log('OK Pressed')},
    //     ],
    //     { cancelable: false }
    //   )
    // }
    //else{
    //  this.props.navigate({ routeName: 'MapScreen' });
    //}
  };

  handleConnectionChange = (isConnected) => {
         this.setState({ status: isConnected });
         console.log(`is connected: ${this.state.status}`);
 }

  render() {
    const { filters } = this.props;
    console.log("Explore screen Header component.");
    return (
      <View style={styles.header}>
        <LinearGradient
          colors={['rgb(0,0,0)', 'transparent']}
          style={styles.LinearGradientStyle}
        >
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
                  <EvilIcons name="chevron-down" size={25} color="#fafafa" style={styles.dropArrowIcon} />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.6}
                  style={{ marginLeft: 10 }}
                  onPress={() => this._getLocationAsync()}
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
            <BlurView style={styles.blurView} tint="dark" intensity={90} />
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
                  toggleFilter={() => this.toggleFilter(item._id)}
                />
              }
            />

            <View>
              {filters.map(item => {
                if (item.filterType === 'openNow' && item.on === true) {
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
                        value={this.props.distance}
                        trackStyle={{ height: 3 }}
                        onSlidingComplete={value => this.updateDistance(value)}
                      />
                    </View>
                  );
                } else if (item.filterType === 'price' && item.on === true) {
                  return (
                    <View key={item._id} style={styles.slidersHolder}>
                      <Slider
                        minimumValue={0}
                        maximumValue={3}
                        step={1}
                        minimumTrackTintColor="rgb(47,212,117)"
                        maximumTrackTintColor="rgb(230,230,230)"
                        thumbTintColor="rgb(255,254,255)"
                        thumbStyle={{ height: 18, width: 18 }}
                        value={this.props.pricing - 1}
                        onSlidingComplete={value => this.updatePrice(value)}
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
