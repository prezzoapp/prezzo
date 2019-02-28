// @flow
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, NetInfo } from 'react-native';
import PropTypes from 'prop-types';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Slider from 'react-native-slider';
import { LinearGradient } from 'expo';
import { EvilIcons } from '../../../components/VectorIcons';
import styles from './styles';
import showGenericAlert from '../../../components/GenericAlert';

class ExploreScreenHeader extends Component {
  static propTypes = {
    navigate: PropTypes.func.isRequired
  };

  constructor() {
    super();

    NetInfo.isConnected.fetch().then(this.handleConnectionChange);

    this.connected;
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.connectionChange);
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.connectionChange);
  }

  showAlert(title, message, duration) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      showGenericAlert(title, message);
    }, duration);
  }

  moveToMap() {
    // if(this.connected) {
    //   this.props.navigate({ routeName: 'MapScreen' });
    // }
    // else {
    //   this.showAlert('Uh-oh!', INTERNET_NOT_CONNECTED, 0);
    // }
    this.props.navigate({ routeName: 'MapScreen' });
  };

  connectionChange = isConnected => this.connected = isConnected;

  render() {
    return (
      <View style={styles.header}
        onLayout={(event) =>
          this.props.setFilterPanelPosition(
            event.nativeEvent.layout.y,
            event.nativeEvent.layout.height
          )
        }
      >
        <LinearGradient
          colors={['rgb(0,0,0)', 'transparent']}
        >
          <View style={styles.filterPanel}>
            <Text style={styles.nearMeText}>Near Me</Text>
            <View style={styles.mainTitleFilterAndMapIconHolder}>
              <Text style={styles.restaurantTitle}>Restaurants</Text>
              <View style={styles.filterButtonAndMapIconHolder}>
                <TouchableOpacity activeOpacity={0.6}
                  style={styles.filterBtn}
                  onPress={() =>
                    this.props.showFilters()
                  }
                >
                  <Text style={styles.filter}> Filter</Text>
                  <EvilIcons name="chevron-down" size={wp('6.66%')} color="#fafafa" style={styles.dropArrowIcon} />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.6}
                  style={{ marginLeft: 10 }}
                  onPress={() => this.moveToMap()}
                >
                  <Image
                    source={require('../../../../assets/images/location_icon.png')}
                    style={styles.locationPin} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  }
}

export default ExploreScreenHeader;
