// @flow
import React, { PureComponent } from 'react';
import { View, ActivityIndicator, Text, Modal } from 'react-native';
import { MaterialIcons } from '../../../components/VectorIcons';
import { LinearGradient } from 'expo';
import ExploreSearch from '../ExploreSearch';
import ExploreScreenHeader from '../ExploreScreenHeader';
import ExploreList from '../ExploreList';
import styles from './styles';
import publicIP from 'react-native-public-ip';


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

    this.state = {
      customRegion: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.00922,
        longitudeDelta: 0.00422
      }
    };
  }

  componentDidMount() {
    console.log("Component Did Mount Called!");
    let activeFilters = [];
    this.props.filters.map(item => {
        if(item.on) {
          activeFilters.push(item.filterType);
        }
    });

    this.watchID = navigator.geolocation.getCurrentPosition(
      position => {
        this.setState(() => {
          return {
              customRegion: {
                ...this.state.customRegion,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
              }
            };
          }, () => {
            this.props.listVendors(
              this.state.customRegion.latitude,
              this.state.customRegion.longitude,
              this.props.distance,
              activeFilters.join(','),
              this.props.pricing
            );
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
  getNetworkIP()
  {
    publicIP()
      .then(ip => {
        this.getIPLocation(ip);
      })
      .catch(error => {
        console.log(error);
      });
  }

  getIPLocation(ip)
  {

     console.log("location ip is ------ ",ip);
     var commonHtml = `http://api.ipstack.com/${ip}?access_key=21b99644b45d75826af90f114a9923ea&format=1`;
     console.log("location url is ------ ",commonHtml);
       fetch(commonHtml)
         .then((response) => response.json())
         .then((responseJson) => {
           console.log(responseJson);
           if(responseJson.latitude){



           this.setState({
             countryName: responseJson.country_name,
             regionName: responseJson.region_name,
             customRegion: {
               latitude: responseJson.latitude,
               longitude: responseJson.longitude,
               latitudeDelta: 0.00922,
               longitudeDelta: 0.00422
             }
           });
           console.log('location ip  --- ',this.state.customRegion);

            this.props.listVendors(
               responseJson.latitude,
               responseJson.longitude,
            //  this.state.customRegion.latitude,
            //  this.state.customRegion.longitude,
              this.props.distance,
              this.props.filters.map(item => {
                if(item.on) {
                  return item.filterType
                }
              }).join(','),
              this.props.pricing
            );
          }
          else{
            // show error message
          }


         })
         .catch((error) => {
          console.error("getting error is --- ",error);




         });



  }



  render() {
    // console.log("Coordinates: ");
    // console.log(this.state.customRegion);
    return (
      <LinearGradient
        testID="linearGradient"
        colors={['rgb(0,0,0)', 'transparent', 'transparent']}
        style={styles.container}
        locations={[0, 0.5, 0.5]}
      >
        <View style={{ flex: 1 }}>
          <ExploreList testID="exploreList" />
          <ExploreScreenHeader
            testID="exploreHeader"
            currentLatitude={this.state.customRegion.latitude}
            currentLongitude={this.state.customRegion.longitude}
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
