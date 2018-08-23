import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import PropTypes from 'prop-types';
import styles from './styles';
import MapStyle from '../../../services/mapStyle.json';
import FilteredVendorBottomCard from '../../../components/FilteredVendorBottomCard';

export default class MapScreen extends Component {
  static navigationOptions = {
    title: 'Local Search',
    headerTintColor: 'white',
    headerStyle: {
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0,
      backgroundColor: 'transparent',
      borderBottomWidth: 0
    }
  };

  constructor() {
    super();

    this.state = {
      customRegion: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0
      }
    };
  }

  componentDidMount() {
    this.watchID = navigator.geolocation.getCurrentPosition(
      position => {
        this.setState(() => {
          return {
            customRegion: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.00922,
              longitudeDelta: 0.00422
            }
          }
        });
      },
      error => console.log(error.message),
      {
        enableHighAccuracy: false,
        timeout: 200000,
        maximumAge: 1000
      });
  }

  // componentWillUnmount() {
	// 	navigator.geolocation.clearWatch(this.watchID);
  // }

  onRegionChangeComplete(region) {
    this.props.listVendors(region.latitude, region.longitude, '200000000');
  }

  render() {
    console.log(this.props.data);
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          region={this.state.customRegion}
          onRegionChangeComplete={region => this.onRegionChangeComplete(region)}
          customMapStyle={MapStyle}
          showsCompass={false}
          loadingEnabled
          followUserLocation={false}
          style={styles.map}
        >
          {this.state.customRegion.latitude !== null &&
            this.state.customRegion.latitude !== 0 &&
            (this.state.customRegion.longitude !== null &&
              this.state.customRegion.longitude !== 0) && (
              <MapView.Marker
                ref={currentLocation => {
                  this.currentLocation = currentLocation;
                }}
                coordinate={{
                  latitude: this.state.customRegion.latitude,
                  longitude: this.state.customRegion.longitude
                }}
                image={require('../../../../assets/images/location.png')}
              />
          )}

          {this.props.data.map(item => {
            return (
              <MapView.Marker
                key={item._id}
                coordinate={{
                  latitude: item.location.coordinates[0],
                  longitude: item.location.coordinates[1]
                }}
                onPress={() => {
                  this.filteredListRef.callMethod(item);
                }}
              >
                <Image
                  source={require("../../../../assets/images/map-pin.png")}
                  style={styles.markerStyle}
                />
              </MapView.Marker>
            );
          })}
        </MapView>

        <LinearGradient
          colors={["rgb(43,44,44)", "transparent"]}
          locations={[0, 0.6]}
          style={styles.map}
          pointerEvents="none"
        />

        <View style={styles.searchSpotHolder}>
          <Text style={styles.spotText}>Find, Your Spot?</Text>
          <GooglePlacesAutocomplete
            placeholder="Search Location"
            minLength={3}
            autoFocus={false}
            returnKeyType="search"
            listViewDisplayed="auto"
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
            styles={{
              textInputContainer: {
                paddingHorizontal: 12,
                backgroundColor: 'transparent',
                borderTopWidth: 0,
                borderBottomWidth: 0
              },
              textInput: {
                marginLeft: 0,
                marginRight: 0,
                height: 38,
                fontSize: 16
              },
              listView: {
                zIndex: 999,
                backgroundColor: 'white'
              }
            }}
          />
        </View>

        <FilteredVendorBottomCard
          data={this.props.data}
          ref={filteredListRef => {
            this.filteredListRef = filteredListRef;
          }}
        />
      </View>
    );
  }
}

MapScreen.propTypes = {
  data: PropTypes.array.isRequired,
  listVendors: PropTypes.func.isRequired
};
