import React, { Component } from 'react';
import { View, Text, TouchableOpacity, InteractionManager } from 'react-native';
import { LinearGradient, MapView } from 'expo';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import PropTypes from 'prop-types';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { Feather } from '../../../components/VectorIcons';
import styles from './styles';
import MapStyle from '../../../services/mapStyle';
import FilteredVendorBottomCard from '../../../components/FilteredVendorBottomCard';
import {
  FONT_FAMILY_MEDIUM,
  COLOR_WHITE,
  SF_PRO_TEXT_REGULAR,
  COLOR_GREEN
} from '../../../services/constants';

import {
  showAlertWithMessage,
  manuallyLogout
} from '../../../services/commonFunctions';

export default class MapScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: (
        <Text
          style={{
            width: wp('70%'),
            fontSize: wp('6.4%'),
            fontFamily: FONT_FAMILY_MEDIUM,
            color: COLOR_WHITE,
            textAlign: 'center'
          }}
          numberOfLines={1}
        >
          Local Search
        </Text>
      ),
      headerTintColor: 'white',
      headerStyle: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        borderBottomWidth: 0,
        backgroundColor: 'transparent',
        elevation: 0
      },
      headerLeft: (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
          style={styles.headerLeftBtn}>
          <Feather
            title="Back"
            name="chevron-left"
            color="white"
            size={wp('8%')}
          />
        </TouchableOpacity>
      )
    }
  };

  constructor() {
    super();

    this.state = {
      isGetLocation: false,
      customRegion: null
    };

    this.btnClicked = false;
    this.isFirstLoad = true;

    this.activeFilters = '';
  }

  componentDidMount() {
    this.activeFilters = '';
    const activatedFiltersArray = [];
    this.props.filters.map(item => {
      if (item.on) {
        activatedFiltersArray.push(item.filterType);
      }
    });

    this.activeFilters = activatedFiltersArray.join(',');

    InteractionManager.runAfterInteractions(() => {
      this.props
        .getUserCurrentLocation()
        .then(coords => {
          this.setState({
            isGetLocation: true,
            customRegion: {
                latitude: coords.latitude,
                longitude: coords.longitude,
                latitudeDelta: 1,
                longitudeDelta: 1
              }
            }, () => {
              this.props
                .listVendors(
                  coords.latitude,
                  coords.longitude,
                  this.props.distance,
                  this.activeFilters,
                  this.props.pricing
                )
                .then(() => {})
                .catch(err => {
                  if(err.code === 401) {
                    manuallyLogout(err, () => this.props.userLogout());
                  } else {
                    showAlertWithMessage('Uh-oh!', err)
                  }
                });
            }
          );
        })
        .catch(err => showAlertWithMessage('Uh-oh!', err));
    });
  }

  onRegionChangeComplete(region) {
    if (this.btnClicked === false && this.isFirstLoad === false) {
      this.setState({
        customRegion: {
            ...region,
            latitudeDelta: 1,
            longitudeDelta: 1
          }
        },
        () => {
          this.props
            .listVendors(
              this.state.customRegion.latitude,
              this.state.customRegion.longitude,
              this.props.distance,
              this.activeFilters,
              this.props.pricing
            )
            .then(() => {})
            .catch(err => {
              if(err.code === 401) {
                manuallyLogout(err, () => this.props.userLogout());
              } else {
                showAlertWithMessage('Uh-oh!', err);
              }
            });
          this.isFirstLoad = false;
        }
      );
    } else {
      console.log('Only Moving!');
      this.btnClicked = false;
      this.isFirstLoad = false;
    }
  }

  /**
   * @param  {Array} coordinates [lat,long]
   * return distance in miles from user cureent location
   * if user cureent loc is not available will reurn empty string
   */
  getDistanceFromCurrentLocation = coordinates => {
    if (this.state.customRegion) {
      const userCurrentLat = this.state.customRegion.latitude;
      const userCurrentLong = this.state.customRegion.longitude;

      const radlat1 = (Math.PI * userCurrentLat) / 180;
      const radlat2 = (Math.PI * coordinates[1]) / 180;
      const theta = userCurrentLong - coordinates[0]
      const radtheta = (Math.PI * theta) / 180;
      let dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      dist = Math.acos(dist)
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515
      return `${Math.round(dist * 0.8684 * 1.15078)} miles`;
    }
    return '';
  }

  /**
   *
   * @param  {array} coordinates - [lon ,lat]
   * Move to given coordinates on map.
   */
  moveToPosition = (id, coordinates) => {
    this.btnClicked = true;
    this.props.disableVendorListItem(id);
    this.moveMapPositionOnSearch(coordinates[1], coordinates[0]);
  }

  moveMapPositionOnSearch(lat, lon) {
    if(this.mapView) {
      this.mapView.animateToRegion({
        latitude: lat,
        longitude: lon,
        latitudeDelta: 1,
        longitudeDelta: 1
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.isGetLocation && (
          <MapView
            ref={ref => {
              this.mapView = ref;
            }}
            provider={MapView.PROVIDER_GOOGLE}
            initialRegion={this.state.customRegion}
            moveOnMarkerPress={false}
            onRegionChangeComplete={region =>
              this.onRegionChangeComplete(region)
            }
            showsCompass={false}
            customMapStyle={MapStyle}
            loadingEnabled
            followUserLocation={false}
            onPress={() => {
              this.btnClicked = false;
            }}
            style={styles.map}
          >
            {this.state.customRegion !== null &&
              this.state.customRegion.latitude !== 0 &&
              this.state.customRegion.longitude !== 0 && (
                <MapView.Marker
                  coordinate={{
                    latitude: this.state.customRegion.latitude,
                    longitude: this.state.customRegion.longitude
                  }}
                >
                  <CacheImage
                    style={{ width: wp('23.73%'), aspectRatio: 1, resizeMode: 'contain' }}
                    type='image'
                    source={require('../../../../assets/images/location.png')}
                  />
                </MapView.Marker>
              )}

            {this.props.data.map(item => (
              <CustomMarker
                key={item._id.toString()}
                coordinates={item.location}
                onPress={() => this.filteredListRef.callMethod(item)}
              />
            ))}
          </MapView>
        )}

        <LinearGradient
          colors={['rgb(43,44,44)', 'transparent']}
          locations={[0, 0.6]}
          style={styles.map}
          pointerEvents="none"
        />

        <View style={styles.searchBarHolder}>
          <Text style={styles.spotText}>Find, Your Spot?</Text>
          <GooglePlacesAutocomplete
            placeholder="Search Location..."
            minLength={3}
            autoFocus={false}
            returnKeyType="search"
            listViewDisplayed="false"
            enablePoweredByContainer={false}
            fetchDetails
            getDefaultValue={() => ''}
            currentLocation={false}
            currentLocationLabel="Current Location"
            nearbyPlacesAPI="GooglePlacesSearch"
            query={{
              key: 'AIzaSyBhuq8RXrtTXm7e0TewsesDWW9e9CGJNYw',
              language: 'en',
              radius: '2000',
              location: '28.002510, 73.322440',
              types: 'establishment',
              strictbounds: true
            }}
            GooglePlacesSearchQuery={{
              rankby: 'distance',
              types: 'restaurant'
            }}
            debounce={200}
            onPress={(data, details = null) => {
              this.moveMapPositionOnSearch(
                details.geometry.location.lat,
                details.geometry.location.lng
              );
            }}
            styles={{
              textInputContainer: {
                paddingHorizontal: wp('4.26%'),
                backgroundColor: 'transparent',
                borderTopWidth: 0,
                borderBottomWidth: 0
              },
              textInput: {
                marginLeft: 0,
                marginRight: 0,
                height: hp('5.03%'),
                fontSize: wp('4.26%'),
                backgroundColor: '#414141',
                color: 'white',
                fontFamily: SF_PRO_TEXT_REGULAR
              },
              listView: {
                zIndex: 99999,
                top: hp('5.03%'),
                position: 'absolute',
                marginHorizontal: wp('4.26%'),
                backgroundColor: '#414141'
              },

              description: {
                color: 'white'
              }
            }}
          />
        </View>

        <FilteredVendorBottomCard
          data={this.props.data}
          ref={filteredListRef => {
            this.filteredListRef = filteredListRef;
          }}
          moveToPosition={(id, coordinates) =>
            this.moveToPosition(id, coordinates)
          }
          getDistanceFromCurrentLocation={this.getDistanceFromCurrentLocation}
        />
      </View>
    );
  }
}

MapScreen.propTypes = {
  data: PropTypes.array.isRequired,
  listVendors: PropTypes.func.isRequired,
  filters: PropTypes.array.isRequired,
  distance: PropTypes.number.isRequired,
  pricing: PropTypes.number.isRequired,
  disableVendorListItem: PropTypes.func.isRequired
};
