import React, { Component } from 'react';
import { View } from 'react-native';
import { MapView, Location, Permissions } from 'expo';
import PropTypes from 'prop-types';
import styles from './styles';

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
      customRegion: null,
      isFetchingLocation: false
    };

    //this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this);

    this.btnClicked = false;
  }

  componentWillMount() {
    this._getLocationAsync();
  }

  // onRegionChangeComplete(region) {
  //   console.log("Region After drag: ");
  //   console.log(region);
  //   if (this.btnClicked === false) {
  //     this.setState(() => {
  //         return {
  //           customRegion: {
  //             ...region,
  //             latitude: region.latitude,
  //             longitude: region.longitude
  //           }
  //         };
  //       },
  //       () => {
  //         console.log("onRegionChangeComplete function called!");
  //         console.log(this.state.customRegion);
  //         this.props.listVendors(
  //           this.state.customRegion.latitude,
  //           this.state.customRegion.longitude,
  //           '200000000',
  //           '',
  //           ''
  //         );
  //
  //         console.log("API called !");
  //       }
  //     );
  //   } else {
  //     this.btnClicked = false;
  //   }
  // }

  // onMapReady = () => {
  //   console.log("Map Ready: ");
  //   console.log(this.state.customRegion);
  //   this.mapView.animateToRegion(this.state.customRegion);
  // }

  _getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      console.log('Permission Denied!');
    }

    const location = await Location.getCurrentPositionAsync({});

    const region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    };

    await this.setState({
      customRegion: {
        ...region,
        latitudeDelta: 0.00922,
        longitudeDelta: 0.00422
      },

      isFetchingLocation: true
    });
  };

  render() {
    return (
      <View style={styles.container}>
        {(() => {
          //if(this.state.isFetchingLocation) {
          return (
            <MapView
              ref={ref => {
                this.mapView = ref;
              }}
              provider={MapView.PROVIDER_GOOGLE}
              initialRegion={this.state.customRegion}
              // customMapStyle={MapStyle}
              showsCompass={false}
              loadingEnabled
              followUserLocation={false}
              onRegionChangeComplete={this.onRegionChangeComplete}
              onPress={() => {
                this.btnClicked = false;
              }}
              // onMapReady={this.onMapReady}
              style={styles.map}
            >
              {(() => {
                if(this.state.customRegion) {
                  return (
                    <MapView.Marker
                      coordinate={{
                        latitude: this.state.customRegion.latitude,
                        longitude: this.state.customRegion.longitude
                      }}
                      image={require('../../../../assets/images/location.png')}
                    />
                  );
                }
              })()}
            </MapView>
          );
          ///}
          //return null;
        })()}
      </View>
    );
  }
}

MapScreen.propTypes = {
  data: PropTypes.array.isRequired,
  listVendors: PropTypes.func.isRequired
};
