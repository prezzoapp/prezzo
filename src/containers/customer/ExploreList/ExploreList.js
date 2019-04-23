// @flow
import React, { PureComponent } from 'react';
import { FlatList, View, Text, Alert } from 'react-native';
import PropTypes from 'prop-types';
import ExploreListItem from '../../../components/ExploreListItem';
import styles from './styles';
import { NetInfo } from 'react-native';
import publicIP from 'react-native-public-ip';
import {AsyncStorage} from 'react-native';
import showGenericAlert from '../../../components/GenericAlert';

export default class ExploreList extends PureComponent {
  static propTypes = {
    restaurants: PropTypes.object.isRequired,
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

  onRefresh = () => {
    this.setState(() => {
        return {
          isFetching: true
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

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      this.handleConnectionChange
    );
  }

  showAlert(title, message, duration) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      showGenericAlert(title, message);
    }, duration);
  }

  checkResponseMessage(){
    AsyncStorage.getItem('response_message').then((msg) => {
      console.log("response message is -----------------",msg);
    });
  }

  hitAPI(){
    NetInfo.isConnected.fetch().done(
      (isConnected) => { console.log("isConnected: ", isConnected);
       if(isConnected) {
          this.getData();
       }
       else {
         this.setState(() => {
           return {
             isFetching: false
           }
         }, ()=> {
           setTimeout(() => {
             Alert.alert(
              'Prezzo',
               'Please check your internet connection and try again.',
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
  }

  getData() {
    console.log("pull to refresh Called!");
    let activeFilters = [];
    this.props.filters.map(item => {
      if(item.get('on')) {
        activeFilters.push(item.get('filterType'));
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
          this.checkResponseMessage();
        })
        .catch(e => {
          this.showAlert('Uh-oh!', e.message, 300);
        });
    }).catch(err => {
      this.showAlert('Uh-oh!', err.message, 300);
    });
  }

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
  };

  renderItem = data => <ExploreListItem item={data.item} navigate={this.props.navigate} />;

  render(){
    const restaurants = this.props.restaurants;
    return (
      <FlatList
        contentContainerStyle={[
          styles.flatListContentContainerStyle,
          {
            justifyContent: restaurants.size === 0 ? 'center' : null
          }
        ]}
        style={styles.flatListStyle}
        ItemSeparatorComponent={this.itemSeparator}
        initialNumToRender={10}
        ListEmptyComponent={this.listEmptyComponent}
        onRefresh={this.onRefresh}
        refreshing={this.state.isFetching}
        keyExtractor={item => item.get('_id').toString()}
        data={restaurants.toArray()}
        renderItem={this.renderItem}
      />
    );
  }
}
