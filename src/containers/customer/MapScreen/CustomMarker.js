import React, { Component } from 'react';
import { MapView } from 'expo';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import CacheImage from '../../../components/CacheImage';
export default class CustomMarker extends Component {
  constructor() {
    super();
    this.state = {
      tracksViewChanges: true
    }
  }

  componentWillReceiveProps(nextProps) {
    if(
      nextProps.coordinates.coordinates[0] !== this.props.coordinates[0] ||
      nextProps.coordinates.coordinates[1] !== this.props.coordinates[1]
    ) {
      this.setState(() => ({
        tracksViewChanges: true
      }))
    }
  }

  componentDidUpdate() {
    console.log('Component Did Update called!');
    if (this.state.tracksViewChanges) {
      this.setState(() => ({
        tracksViewChanges: false
      }));
    }
  }

  render() {
    return (
      <MapView.Marker
        tracksViewChanges={this.state.tracksViewChanges}
        coordinate={{
          latitude: this.props.coordinates.coordinates[1],
          longitude: this.props.coordinates.coordinates[0]
        }}
        onPress={() => this.props.onPress()}
      >
        <CacheImage
          style={{ width: wp('8.26%'), aspectRatio: 1, resizeMode: 'contain' }}
          type='image'
          source={require('../../../../assets/images/map-pin.png')}
        />
      </MapView.Marker>
    );
  }
}
