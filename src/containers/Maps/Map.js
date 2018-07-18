import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity, Image} from 'react-native';

import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

import MapStyle from './mapStyle';

import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

import LinearGradient from 'react-native-linear-gradient';

import Permissions from 'react-native-permissions';

// import Icon from 'react-native-vector-icons/FontAwesome';

import {
  FONT_FAMILY, FONT_FAMILY_MEDIUM
} from '../../services/constants';

export default class Maps extends Component {
  static navigationOptions =
  {
    title: 'Local Search',

    headerStyle: {
      backgroundColor: 'transparent',
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0,
      elevation: 0
    },

    headerTitleStyle:
    {
      fontWeight: 'bold',
      fontFamily: FONT_FAMILY
    },

    headerTintColor: '#fff'
  };

  constructor()
	{
    super();
    this.state = {
      customRegion: {latitude: 0, longitude: 0, latitudeDelta: 0, longitudeDelta: 0}
    }	
  }

  componentDidMount()
	{
    this.watchID = navigator.geolocation.watchPosition((position) =>
    {
      this.setState({
        customRegion:
        {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.00922,
          longitudeDelta: 0.00422
        }
      }, () => console.log(this.state.customRegion));
    }, (error) => console.log(error.message),
      {
        enableHighAccuracy: false, timeout: 200000, maximumAge: 1000
      });
  }

  componentWillUnmount()
	{
		navigator.geolocation.clearWatch(this.watchID);
  }

  requestLocationPermission()
  {
    Permissions.request('location', {
      rationale: {
        title: 'Cool Photo App Camera Permission',
        message:
          'Cool Photo App needs access to your camera ' +
          'so you can take awesome pictures.'
      }}).then(response => {
        console.log(response);
      });
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: 'rgb(59,97,74)'
        }}
      />
    );
  }

  render()
  {
    return (
      <View style = { styles.container }>
        <MapView
          provider={PROVIDER_GOOGLE}
          region = {this.state.customRegion}
          style={styles.map}
          customMapStyle={MapStyle}
          loadingEnabled = {true}
          followUserLocation={true}
          showsCompass={false}
        >
          {((this.state.customRegion.latitude !== null && this.state.customRegion.latitude !== 0) && (this.state.customRegion.longitude !== null && this.state.customRegion.longitude !== 0)) &&
            <MapView.Marker
              ref={currentLocation => {
                this.currentLocation = currentLocation;
              }}
              coordinate = {{latitude: this.state.customRegion.latitude, longitude: this.state.customRegion.longitude}}
              image={require('../../../assets/images/my_location.png')}
            />
          }

          {
            this.props.restaurantsListReducer.filteredRestaurantsList.map((item) => {
              return (
                <MapView.Marker
                  key={item.id}
                  coordinate = {{latitude: item.latitude, longitude: item.longitude}}
                  image={require('../../../assets/images/map_pin.png')}
                  style={{width: 50}}
                />
              );
            })
          }
        </MapView>

        <LinearGradient colors={['rgb(43,44,44)', 'transparent']} locations={[0, 0.5]} style={styles.map} />

        <View style={styles.searchSpotHolder}>
          <Text style={styles.spotText}>Find, Your Spot?</Text>
          <GooglePlacesAutocomplete
            placeholder='Search'
            minLength={3}
            autoFocus={false}
            returnKeyType={'search'}
            listViewDisplayed='auto'
            fetchDetails={true}
            getDefaultValue={() => ''}
            currentLocation={false}
            currentLocationLabel='Current Location'
            nearbyPlacesAPI='GooglePlacesSearch'
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
                paddingHorizontal: -12,
                backgroundColor: 'white'
              }
            }}
          />
        </View>

        <View style={styles.filteredRestaurantsListHolder}>
          <FlatList
            contentContainerStyle={{paddingVertical: 5, paddingHorizontal: 15}}
            keyExtractor={(item) => item.id}
            data={this.props.restaurantsListReducer.filteredRestaurantsList}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent = {this.renderSeparator}
            renderItem={({item}) =>
              <TouchableOpacity activeOpacity={0.6} style={styles.listItemBtn}>
                <View style={styles.titleHolder}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.distance}>{item.distance} miles</Text>
                </View>

                <View style={styles.statusHolder}>
                  <Image source={require('../../../assets/images/open_restaurant_status.png')} style={styles.statusImage}/>
                  <Text style={styles.status}>{item.status}</Text>
                </View>
              </TouchableOpacity>
            }
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end'
  },

  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },

  listItemBtn: {
    paddingHorizontal: 15,
    paddingVertical: 15
  },

  titleHolder: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  status: {
    color: 'rgb(46,214,116)',
    fontFamily: FONT_FAMILY,
    paddingLeft: 15,
    position: 'relative',
    top: -4
  },

  statusHolder: {
    flexDirection: 'row',
    paddingTop: 10
  },

  name: {
    fontSize: 20,
    fontFamily: FONT_FAMILY,
    color: 'white',
    flex: 1,
    paddingRight: 5
  },

  distance: {
    fontSize: 18,
    fontFamily: FONT_FAMILY,
    color: 'white'
  },

  statusImage: {
    height: 18,
    width: 18,
    resizeMode: 'contain'
  },

  searchSpotHolder: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 50,
    zIndex: 999
  },

  spotText: {
    fontSize: 22,
    color: 'white',
    fontFamily: FONT_FAMILY_MEDIUM,
    paddingBottom: 10,
    paddingHorizontal: 12
  },

  filteredRestaurantsListHolder: {
    backgroundColor: 'rgb(51,51,51)',
    flex: 0.35,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 5
  }
});