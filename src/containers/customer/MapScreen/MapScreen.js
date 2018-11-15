// import React, { Component } from 'react';
// import { View, Text, Image } from 'react-native';
// import { LinearGradient, MapView, Location, Permissions } from 'expo';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// import PropTypes from 'prop-types';
// import styles from './styles';
// import MapStyle from '../../../services/mapStyle';
// import FilteredVendorBottomCard from '../../../components/FilteredVendorBottomCard';
//
// export default class MapScreen extends Component {
//   static navigationOptions = {
//     title: 'Local Search',
//     headerTintColor: 'white',
//     headerStyle: {
//       position: 'absolute',
//       top: 0,
//       right: 0,
//       left: 0,
//       backgroundColor: 'transparent',
//       borderBottomWidth: 0
//     }
//   };
//
//   constructor() {
//     super();
//
//     this.state = {
//       customRegion: {
//         latitude: 0,
//         longitude: 0,
//         latitudeDelta: 1.00922,
//         longitudeDelta: 1.00922
//       }
//     };
//
//     this.btnClicked = false;
//   }
//
//   componentDidMount() {
//     this.watchID = navigator.geolocation.getCurrentPosition(
//       position => {
//         this.setState(() => {
//           return {
//             customRegion: {
//               latitude: position.coords.latitude,
//               longitude: position.coords.longitude,
//               latitudeDelta: 1.00922,
//               longitudeDelta: 1.00922
//             }
//           }
//         });
//       },
//       error => console.log(error.message),
//       {
//         enableHighAccuracy: false,
//         timeout: 200000,
//         maximumAge: 1000
//       });
//   }
//
//   onMapReady() {
//     this.mapView.animateToRegion(this.state.customRegion);
//   }
//
//   onRegionChangeComplete(region) {
//     if(this.btnClicked === false) {
//       this.setState(() => {
//           return {
//           customRegion: {
//               ...region
//             }
//           };
//         },
//         () => {
//           console.log("onRegionChangeComplete function called!");
//           console.log(this.state.customRegion);
//           this.props.listVendors(
//             this.state.customRegion.latitude,
//             this.state.customRegion.longitude,
//             '200000000',
//             '',
//             ''
//           );
//
//           console.log("API called !");
//         }
//       );
//     } else {
//       this.btnClicked = false;
//     }
//   }
//
//   moveToPosition(coordinates) {
//     console.log('Move To Position Method Called!');
//
//     this.btnClicked = true;
//
//     this.mapView.animateToRegion({
//       latitude: coordinates[1],
//       longitude: coordinates[0],
//       latitudeDelta: 1.00922,
//       longitudeDelta: 1.00422
//     });
//   }
//
//   render() {
//     return (
//       <View style={styles.container}>
//         <MapView
//           ref={ref => {
//             this.mapView = ref;
//           }}
//           provider={MapView.PROVIDER_GOOGLE}
//           initialRegion={this.state.customRegion}
//           onRegionChangeComplete={region => this.onRegionChangeComplete(region)}
//           customMapStyle={MapStyle}
//           showsCompass={false}
//           loadingEnabled
//           followUserLocation={false}
//           onMapReady={() => this.onMapReady()}
//           onPress={() => {
//             this.btnClicked = false;
//           }}
//           style={styles.map}
//         >
//           {/*this.state.customRegion.latitude !== null &&
//             this.state.customRegion.latitude !== 0 &&
//             (this.state.customRegion.longitude !== null &&
//               this.state.customRegion.longitude !== 0) && (
//               <MapView.Marker
//                 coordinate={{
//                   latitude: this.state.customRegion.latitude,
//                   longitude: this.state.customRegion.longitude
//                 }}
//                 image={require('../../../../assets/images/location.png')}
//               />
//             )*/}
//
//           {this.props.data.map(item => {
//             return (
//               <MapView.Marker
//                 key={item._id}
//                 coordinate={{
//                   latitude: item.location.coordinates[1],
//                   longitude: item.location.coordinates[0]
//                 }}
//                 onPress={() => {
//                   this.filteredListRef.callMethod(item);
//                 }}
//
//               >
//                 <Image
//                   source={require("../../../../assets/images/map-pin.png")}
//                   style={styles.markerStyle}
//                 />
//               </MapView.Marker>
//             );
//           })}
//         </MapView>
//
//         <LinearGradient
//           colors={['rgb(43,44,44)', 'transparent']}
//           locations={[0, 0.6]}
//           style={styles.map}
//           pointerEvents="none"
//         />
//
//         <View style={styles.searchBarHolder}>
//           <Text style={styles.spotText}>Find, Your Spot?</Text>
//           <GooglePlacesAutocomplete
//             placeholder="Search Location..."
//             minLength={3}
//             autoFocus={false}
//             returnKeyType="search"
//             listViewDisplayed="auto"
//             enablePoweredByContainer={false}
//             fetchDetails
//             getDefaultValue={() => ''}
//             currentLocation={false}
//             currentLocationLabel="Current Location"
//             nearbyPlacesAPI="GooglePlacesSearch"
//             query={{
//               key: 'AIzaSyBhuq8RXrtTXm7e0TewsesDWW9e9CGJNYw',
//               language: 'en'
//             }}
//             debounce={200}
//             styles={{
//               textInputContainer: {
//                 paddingHorizontal: 12,
//                 backgroundColor: 'transparent',
//                 borderTopWidth: 0,
//                 borderBottomWidth: 0
//               },
//               textInput: {
//                 marginLeft: 0,
//                 marginRight: 0,
//                 height: 38,
//                 fontSize: 16,
//                 backgroundColor: '#414141',
//                 color: 'white'
//               },
//               listView: {
//                 zIndex: 999,
//                 // backgroundColor: 'white',
//                 marginHorizontal: 12,
//                 backgroundColor: '#414141'
//               },
//
//               description: {
//                 color: 'white'
//               }
//             }}
//           />
//         </View>
//
//         <FilteredVendorBottomCard
//           data={this.props.data}
//           ref={filteredListRef => {
//             this.filteredListRef = filteredListRef;
//           }}
//           moveToPosition={coordinates => this.moveToPosition(coordinates)}
//         />
//       </View>
//     );
//   }
// }
//
// MapScreen.propTypes = {
//   data: PropTypes.array.isRequired,
//   listVendors: PropTypes.func.isRequired
// };

import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { LinearGradient, MapView } from 'expo';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import PropTypes from 'prop-types';
import styles from './styles';
import MapStyle from '../../../services/mapStyle';
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
      isGetLocation: false,
      customRegion: null
    };

    this.btnClicked = false;
    this.isFirstLoad = true;
    this.timer = -1;
  }

  componentWillMount() {
    console.log('custom region is....', this.state.customRegion);

    this.watchID = navigator.geolocation.getCurrentPosition(
      position => {
        this.setState(() => ({
          customRegion: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.00922,
            longitudeDelta: 0.00422
          },
          isGetLocation: true
        }));

        this.props
          .listVendors(
            this.state.customRegion.latitude,
            this.state.customRegion.longitude,
            '200000000',
            '',
            ''
          )
          .then(() => {
            this.isFirstLoad = false;
          });
        console.log('First Time API Called!');
      },
      error => console.log(error.message),
      {
        enableHighAccuracy: false,
        timeout: 200000,
        maximumAge: 1000
      }
    );
  }

  componentWillUnmount() {
    this.setState(() => {
      return {
        isGetLocation: true
      }
    });

    this.watchID = null;
  }

  onRegionChangeComplete(region) {
    console.log('region changed called');

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
            '200000000'
          );
          this.isFirstLoad = false;

          console.log('API called !');
        }
      );
    } else {
      this.btnClicked = false;
    }
  }

  onMapReady() {
    console.log('OnMapReady Method Called!');

    this.mapView.animateToRegion(this.state.customRegion);
  }

  moveToPosition(coordinates) {
    console.log('Move To Position Method Called!');

    this.btnClicked = true;

    this.mapView.animateToRegion({
      latitude: coordinates[1],
      longitude: coordinates[0],
      latitudeDelta: 0.00922,
      longitudeDelta: 0.00422
    });
  }

  render() {
    console.log('Map screen render called');
    console.log('Map screen region', this.state.customRegion);
    //  console.log('Map screen default region', region);

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
            //  onMapReady={() => this.onMapReady()}
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
            listViewDisplayed="auto"
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
                fontSize: 16,
                backgroundColor: '#414141',
                color: 'white'
              },
              listView: {
                zIndex: 999,
                // backgroundColor: 'white',
                marginHorizontal: 12,
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
