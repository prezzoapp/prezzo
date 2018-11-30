
// @flow
import React, { PureComponent } from 'react';
import { FlatList, View, Text, Alert } from 'react-native';
import PropTypes from 'prop-types';
import ExploreListItem from '../../../components/ExploreListItem';
import styles from './styles';
import {NetInfo} from 'react-native';
import publicIP from 'react-native-public-ip';



export default class ExploreList extends PureComponent {
  static propTypes = {
    restaurants: PropTypes.array.isRequired,
    navigate: PropTypes.func.isRequired
  };
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
    this.setState(() => {
        return {
          isFetching: false
        }
      },
      () => {
        this.hitAPI();
        this.setState(() => {
          return {
            isFetching: false
          }
        });
      }
    );
  }

  componentDidMount(){
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);

  }
  hitAPI(){

    NetInfo.isConnected.fetch().done(
      (isConnected) => { console.log(isConnected);
       if(isConnected)
       {
          this.getData();
       }
       else{
         this.setState(() => {
           return {
             isFetching: false
           }
         }, ()=> {
           setTimeout(() => {
             Alert.alert(
              'Prezzo',
               'Please check your internet connection and try again later.',
               [
                 {text: 'OK', onPress: () => console.log('OK Pressed')},
               ],
               { cancelable: false }
             )
           }, 500);
         });




       }

      }
    );

  }
  handleConnectionChange = (isConnected) => {
        this.setState({ status: isConnected });
        console.log(`is connected: ${this.state.status}`);
  }

  getData()
  {
    console.log("pull to refresh Called!");
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
            //  activeFilters.join(','),
              this.props.pricing
            );
          }
        );
      },
      error =>  this.getNetworkIP(),
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
             // countryName: responseJson.country_name,
             // regionName: responseJson.region_name,
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
         });



  }

  render() {
    const { restaurants } = this.props;
    console.log("Restaurants: ");
    console.log(restaurants);
    // if(restaurants.length === 0 && this.props.isBusy === false) {
    //   return (
    //     <View style={styles.notFoundHolder}>
    //       {this.props.isBusy ? null : (
    //         <Text style={styles.message}>
    //           Oops, No Restaurants found.
    //         </Text>
    //       )}
    //     </View>
    //   );
    // }
    if(this.props.isBusy === false && restaurants.length !== 0) {
      return (
        <FlatList
          contentContainerStyle={{ marginHorizontal: 15, paddingTop: 10 }}
          style={{ marginTop: 140 }}
          initialNumToRender={10}
          onRefresh={() => this.onRefresh()}
          refreshing={false}
          keyExtractor={(item, index) => index.toString()}
          data={restaurants}
          renderItem={({ item }) => (
            <ExploreListItem item={item} navigate={this.props.navigate} />
          )}
        />
      );
    } else {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <View style={[styles.notFoundHolder, {position: 'absolute', backgroundColor: 'transparent', right: 0, left: 0}]}>
            {this.props.isBusy ? null : (
              <Text style={styles.message}>
                Oops, No Restaurants found.
              </Text>
            )}
          </View>

          <FlatList
            contentContainerStyle={{ marginHorizontal: 15, paddingTop: 10 }}
            style={{ marginTop: 140, backgroundColor: 'transparent' }}
            onRefresh={() => this.onRefresh()}
            refreshing={this.state.isFetching}
            initialNumToRender={10}
            keyExtractor={(item, index) => index.toString()}
            data={[]}
            renderItem={({ item }) => null}
          />
        </View>
      );
    }
  }
}
