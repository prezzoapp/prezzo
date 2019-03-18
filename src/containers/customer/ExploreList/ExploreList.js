// @flow
import React, { PureComponent } from 'react';
import { FlatList, View, Text, AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';
import ExploreListItem from '../../../components/ExploreListItem';
import styles from './styles';
import publicIP from 'react-native-public-ip';
import { showAlertWithMessage, manuallyLogout } from '../../../services/commonFunctions';

export default class ExploreList extends PureComponent {
  constructor() {
    super();

    this.state = {
      isFetching: false,
      customRegion: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.00922,
        longitudeDelta: 0.00422
      }
    }
  }

  onRefresh() {
    this.setState({ isFetching: true },
      () => {
        this.getData();
      }
    );
  }

  checkResponseMessage(){
    AsyncStorage.getItem('response_message').then((msg) => {
      console.log("response message is -----------------",msg);
    });
  }

  getData() {
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
      ).then(() => {
        this.setState({ isFetching: false });
      }).catch(err => {
          if(err.code === 401) {
            this.setState({ isFetching: false }, () => {
              manuallyLogout(err, () => this.props.userLogout());
            });
          } else {
            this.setState({ isFetching: false }, () => {
              showAlertWithMessage('Uh-oh!', err);
            });
          }
        })
    }).catch(err => {
      this.setState({ isFetching: false }, () => {
        showAlertWithMessage('Uh-oh!', err);
      });
    });
  }

  // PLEASE DON'T DELETE THE BELOW FUNCTIONS. MAY BE I'LL USE IT LATER.
  // getNetworkIP() {
  //   publicIP()
  //     .then(ip => {
  //       this.getIPLocation(ip);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }
  //
  // getIPLocation(ip) {
  //    console.log("location ip is ------ ",ip);
  //    let commonHtml = `http://api.ipstack.com/${ip}?access_key=21b99644b45d75826af90f114a9923ea&format=1`;
  //    console.log("location url is ------ ",commonHtml);
  //      fetch(commonHtml)
  //        .then((response) => response.json())
  //        .then((responseJson) => {
  //          console.log(responseJson);
  //          if(responseJson.latitude) {
  //           this.setState({
  //            // countryName: responseJson.country_name, // PLEASE DON'T DELETE IT. MAY BE I'LL REQUIRE THIS LATER.
  //            // regionName: responseJson.region_name, // PLEASE DON'T DELETE IT. MAY BE I'LL REQUIRE THIS LATER.
  //            customRegion: {
  //              latitude: responseJson.latitude,
  //              longitude: responseJson.longitude,
  //              latitudeDelta: 0.00922,
  //              longitudeDelta: 0.00422
  //            }
  //           });
  //           console.log('location ip  --- ',this.state.customRegion);
  //
  //           this.props.listVendors(
  //              responseJson.latitude,
  //              responseJson.longitude,
  //             this.props.distance,
  //             this.props.filters.map(item => {
  //               if(item.on) {
  //                 return item.filterType
  //               }
  //             }).join(','),
  //             this.props.pricing
  //           );
  //         }
  //         else{
  //           // show error message
  //         }
  //        })
  //        .catch((error) => {
  //        });
  // }

  listEmptyComponent() {
    return (
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.message}>Oops, No Restaurants found!</Text>
      </View>
    );
  }

  itemSeparator = () => {
    return (
      <View style={styles.seperator} />
    );
  }

  render(){
    const { restaurants } = this.props;
    return (
      <FlatList
        contentContainerStyle={[styles.flatListContentContainerStyle, { justifyContent: restaurants.length === 0 ? 'center' : null }]}
        style={styles.flatListStyle}
        ItemSeparatorComponent={this.itemSeparator}
        initialNumToRender={10}
        ListEmptyComponent={this.listEmptyComponent}
        onRefresh={() => this.onRefresh()}
        refreshing={this.state.isFetching}
        keyExtractor={(item, index) => index.toString()}
        data={restaurants}
        renderItem={({ item }) => (
          <ExploreListItem item={item} navigate={this.props.navigate} />
        )}
      />
    );
  }
}

ExploreList.propTypes = {
  filters: PropTypes.array.isRequired,
  getUserCurrentLocation: PropTypes.func.isRequired,
  listVendors: PropTypes.func.isRequired,
  distance: PropTypes.number.isRequired,
  pricing: PropTypes.number.isRequired,
  navigate: PropTypes.func.isRequired
}
