// @flow
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert, NetInfo } from 'react-native';
import PropTypes from 'prop-types';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Slider from 'react-native-slider';
import { LinearGradient } from 'expo';
import { EvilIcons } from '../../../components/VectorIcons';
import CacheImage from '../../../components/CacheImage';
import styles from './styles';
import showGenericAlert from '../../../components/GenericAlert';

class ExploreScreenHeader extends Component {
  static propTypes = {
    navigate: PropTypes.func.isRequired
  };

  constructor() {
    super();
  }

  moveToMap() {
    this.props.navigate({ routeName: 'MapScreen' });
  };

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
                  <CacheImage
                    source={require('../../../../assets/images/location_icon.png')}
                    type='image'
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
