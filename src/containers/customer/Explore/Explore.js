// @flow
import React, { PureComponent } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
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
      <Icon name="explore" size={24} color={props.tintColor} />
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
            };
          }, () => {
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

  // componentWillUnmount() {
	// 	navigator.geolocation.clearWatch(this.watchID);
  // }

  render() {
    return (
      <View style={styles.container}>
        <ExploreScreenHeader
          currentLatitude={this.state.customRegion.latitude}
          currentLongitude={this.state.customRegion.latitude}
        />
        <ExploreList />
      </View>
    );
  }
}
export default Explore;
