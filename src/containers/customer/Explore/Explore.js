// @flow
import React, { PureComponent } from 'react';
import { View, ActivityIndicator, Text, Modal } from 'react-native';
import { MaterialIcons } from '../../../components/VectorIcons';
import { LinearGradient } from 'expo';
import ExploreSearch from '../ExploreSearch';
import ExploreScreenHeader from '../ExploreScreenHeader';
import ExploreList from '../ExploreList';
import styles from './styles';
import showGenericAlert from '../../../components/GenericAlert';

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

  constructor(props) {
    super(props);
  }

  showAlert(title, message, duration) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      showGenericAlert(title, message);
    }, duration);
  }

  componentDidMount() {
    let activeFilters = [];
    this.props.filters.map(item => {
      if(item.on) {
        activeFilters.push(item.filterType);
      }
    });

    this.props.getUserCurrentLocation().then(coords => {
      this.props.listVendors(
        coords.latitude,
        coords.longitude,
        this.props.distance,
        activeFilters.join(','),
        this.props.pricing
      ).then(() => {})
        .catch(err => {
          this.showAlert('Uh-oh!', err.message, 300);
        });
    }).catch(err => {
      this.showAlert('Uh-oh!', err.message, 300);
    });

    // this.watchID = navigator.geolocation.getCurrentPosition(
    //   position => {
    //     this.setState(() => {
    //       return {
    //           customRegion: {
    //             ...this.state.customRegion,
    //             latitude: position.coords.latitude,
    //             longitude: position.coords.longitude
    //           }
    //         };
    //       }, () => {
    //         this.props.listVendors(
    //           this.state.customRegion.latitude,
    //           this.state.customRegion.longitude,
    //           this.props.distance,
    //           activeFilters.join(','),
    //           this.props.pricing
    //         );
    //       }
    //     );
    //   },
    //   error => console.log(error.message),
    //   {
    //     enableHighAccuracy: false,
    //     timeout: 200000,
    //     maximumAge: 1000
    //   }
    // );
  }

  render() {
    return (
      <LinearGradient
        testID="linearGradient"
        colors={['transparent', 'transparent', 'transparent']}
        style={styles.container}
        locations={[0, 0.5, 0.5]}
      >
        <View style={{ flex: 1 }}>
          <ExploreList testID="exploreList" />
          <ExploreScreenHeader
            testID="exploreHeader"
            currentLatitude={this.props.currentLocation&& this.props.currentLocation.latitude}
            currentLongitude={this.props.currentLocation&& this.props.currentLocation.longitude}
          />
          <ExploreSearch testID="exploreSearch"/>
        </View>
        <Modal
          transparent
          animationType="none"
          visible={this.props.isBusy}>
          <View style={styles.loaderContainer}>
            <ActivityIndicator testID="activityIndicator" size="large" color="white" />
            <Text testID="loadingText" style={styles.message}>
              Please wait, While fetching restaurants.
            </Text>
          </View>
        </Modal>
      </LinearGradient>
    );
  }
}
export default Explore;
