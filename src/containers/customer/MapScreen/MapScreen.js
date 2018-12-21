import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { LinearGradient, MapView } from 'expo';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import PropTypes from 'prop-types';
import publicIP from 'react-native-public-ip';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Feather } from '../../../components/VectorIcons';
import styles from './styles';
import MapStyle from '../../../services/mapStyle';
import FilteredVendorBottomCard from '../../../components/FilteredVendorBottomCard';
import showGenericAlert from '../../../components/GenericAlert';
import {
  FONT_FAMILY_MEDIUM,
  COLOR_WHITE,
  SF_PRO_TEXT_REGULAR
} from '../../../services/constants';

export default class MapScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: (
        <Text
          style={{
            width: wp('50%'),
            fontSize: wp('6.4%'),
            fontFamily: FONT_FAMILY_MEDIUM,
            color: COLOR_WHITE,
            textAlign: 'center'
          }}
          numberOfLines={1}
        >
          My Profile
        </Text>
      ),
      headerTintColor: 'white',
      headerStyle: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        borderBottomWidth: 0,
        backgroundColor: 'transparent'
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
    this._isMounted = true;
    this.activeFilters = '';
    const activatedFiltersArray = [];
    this.props.filters.map(item => {
      if (item.on) {
        activatedFiltersArray.push(item.filterType);
      }
    });

    this.activeFilters = activatedFiltersArray.join(',');

    this.watchID = navigator.geolocation.getCurrentPosition(
      position => {
        this.setState(
          () => ({
            customRegion: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.00922,
              longitudeDelta: 0.00422
            },
            isGetLocation: true
          }),
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
              .catch(e => {
                showGenericAlert('Uh-oh!', e.message || e);
              });

            console.log('After Getting Correct Coordinates: ');
            console.log(this.state.customRegion);
            console.log('First Time API Called!');
          }
        );
      },
      error => this.getNetworkIP(),
      {
        enableHighAccuracy: false,
        timeout: 200000,
        maximumAge: 1000
      }
    );
  }

  componentWillUnmount() {
    this.watchID = null;
  }

  onRegionChangeComplete(region) {
    if (this.btnClicked === false && this.isFirstLoad === false) {
      this.setState(
        () => ({
          customRegion: {
            ...region,
            latitudeDelta: 0.00922,
            longitudeDelta: 0.00422
          }
        }),
        () => {
          this.props.listVendors(
            this.state.customRegion.latitude,
            this.state.customRegion.longitude,
            this.props.distance,
            this.activeFilters,
            this.props.pricing
          );
          this.isFirstLoad = false;

          console.log('API called !');
        }
      );
    } else {
      this.btnClicked = false;
      this.isFirstLoad = false;
    }
  }

  getIPLocation(ip) {
    const commonHtml = `http://api.ipstack.com/${ip}?access_key=21b99644b45d75826af90f114a9923ea&format=1`;
    console.log('location url is ------ ', commonHtml);
    fetch(commonHtml)
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        if (responseJson.latitude) {
          this.setState({
            customRegion: {
              latitude: responseJson.latitude,
              longitude: responseJson.longitude,
              latitudeDelta: 0.00922,
              longitudeDelta: 0.00422
            },
            isGetLocation: true,
            countryName: responseJson.country_name,
            regionName: responseJson.region_name
          });
          console.log('location ip  --- ', this.state.customRegion);
          this.props
            .listVendors(
              this.state.customRegion.latitude,
              this.state.customRegion.longitude,
              this.props.distance,
              this.activeFilters,
              this.props.pricing
            )
            .then(() => {})
            .catch(e => {
              showGenericAlert('Uh-oh!', e.message || e);
            });

          console.log('After Getting Correct Coordinates: ');
          console.log(this.state.customRegion);
          console.log('First Time API Called!');
        } else {
          // show error message
        }
      })
      .catch(error => {});
  }

  getNetworkIP() {
    publicIP()
      .then(ip => {
        this.getIPLocation(ip);
      })
      .catch(error => {
        console.log(error);
      });
  }

  moveToPosition(coordinates) {
    this.btnClicked = true;

    this.mapView.animateToRegion({
      latitude: coordinates[1],
      longitude: coordinates[0],
      latitudeDelta: 0.00922,
      longitudeDelta: 0.00422
    });
  }

  moveMapPositionOnSearch(lat, lon) {
    this.mapView.animateToRegion({
      latitude: lat,
      longitude: lon,
      latitudeDelta: 0.00922,
      longitudeDelta: 0.00422
    });
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
            {this.state.customRegion.latitude !== null &&
              this.state.customRegion.latitude !== 0 &&
              (this.state.customRegion.longitude !== null &&
                this.state.customRegion.longitude !== 0) && (
                <MapView.Marker
                  coordinate={{
                    latitude: this.state.customRegion.latitude,
                    longitude: this.state.customRegion.longitude
                  }}
                  image={require('../../../../assets/images/location.png')}
                />
              )}

            {this.props.data.map(item => (
              <MapView.Marker
                key={item._id}
                coordinate={{
                  latitude: item.location.coordinates[1],
                  longitude: item.location.coordinates[0]
                }}
                onPress={() => {
                  this.filteredListRef.callMethod(item);
                }}
              >
                <Image
                  source={require('../../../../assets/images/map-pin.png')}
                  style={styles.markerStyle}
                />
              </MapView.Marker>
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
              language: 'en'
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
                height: 38,
                fontSize: 16,
                backgroundColor: '#414141',
                color: 'white',
                fontFamily: SF_PRO_TEXT_REGULAR
              },
              listView: {
                zIndex: 99999,
                top: 38,
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
          moveToPosition={coordinates => this.moveToPosition(coordinates)}
        />
      </View>
    );
  }
}

MapScreen.propTypes = {
  data: PropTypes.array.isRequired,
  listVendors: PropTypes.func.isRequired
};
