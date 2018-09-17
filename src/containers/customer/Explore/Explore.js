// @flow
import React, { PureComponent } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { MaterialIcons } from '../../../components/VectorIcons';
import { LinearGradient } from 'expo';
import ExploreSearch from '../ExploreSearch';
import ExploreScreenHeader from '../ExploreScreenHeader';
import ExploreList from '../ExploreList';
import styles from './styles';

type Props = {
  listVendors: Function
};

class Explore extends PureComponent<Props> {
  static navigationOptions = {
    title: 'Explore',
    tabBarIcon: props => (
      <MaterialIcons name="explore" size={24} color={props.tintColor} />
    ),
    headerTintColor: 'white',
    headerStyle: {
      position: 'absolute',
      backgroundColor: 'transparent',
      zIndex: 100,
      top: 0,
      left: 0,
      right: 0
    }
  };

  static displayName = 'Explore';

  constructor() {
    super();

    this.state = {
      customRegion: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0
      },
      isFetching: true
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
              },
              isFetching: false
            };
          }, () => {
            console.log('Current Coordinates: ');
            console.log(this.state.customRegion);
            this.props.listVendors(
              this.state.customRegion.latitude,
              this.state.customRegion.longitude,
              '200000000'
            );
          }
        );
      },
      error => console.log(error.message),
      {
        enableHighAccuracy: false,
        timeout: 200000,
        maximumAge: 1000
      }
    );
  }

  render() {
    return (
      <LinearGradient
        colors={['rgb(0,0,0)', 'transparent', 'transparent']}
        style={styles.container}
        locations={[0, 0.5, 0.5]}
      >
      {(() => {
          if (this.state.isFetching) {
            return (
              <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="white" />
                <Text style={styles.message}>
                  Please wait, While fetching restaurants.
                </Text>
              </View>
            );
        }
        return (
            <View style={{ flex: 1 }}>
              <ExploreList />
              <ExploreScreenHeader
                currentLatitude={this.state.customRegion.latitude}
                currentLongitude={this.state.customRegion.longitude}
              />
              <ExploreSearch />
            </View>
        );
      })()}
      </LinearGradient>
    );
  }
}
export default Explore;
