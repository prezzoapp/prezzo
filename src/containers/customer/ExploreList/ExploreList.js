// @flow
import React, { PureComponent } from 'react';
import { FlatList, View, Text, AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';
import ExploreListItem from '../../../components/ExploreListItem';
import styles from './styles';
import { showAlertWithMessage, manuallyLogout } from '../../../services/commonFunctions';
import { COLOR_GREEN } from '../../../services/constants';

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

ExploreList.propTypes = {
  filters: PropTypes.array.isRequired,
  getUserCurrentLocation: PropTypes.func.isRequired,
  listVendors: PropTypes.func.isRequired,
  distance: PropTypes.number.isRequired,
  pricing: PropTypes.number.isRequired,
  navigate: PropTypes.func.isRequired
}
