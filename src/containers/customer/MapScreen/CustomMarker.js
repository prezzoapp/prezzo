import React, { Component } from 'react';
import { MapView } from 'expo';
import { Image, Platform } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
export default class CustomMarker extends Component {
  constructor() {
    super();
    this.state = {
      tracksViewChanges: true
    }
  }

  componentWillReceiveProps(nextProps) {
    if(
      nextProps.coordinates.get('coordinates').first() !== this.props.coordinates.get('coordinates').first() ||
      nextProps.coordinates.get('coordinates').last() !== this.props.coordinates.get('coordinates').last()
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
    // console.log(this.props.coordinates.get('coordinates').toJS());
    return (
      <MapView.Marker
        tracksViewChanges={this.state.tracksViewChanges}
        coordinate={{
          latitude: this.props.coordinates.get('coordinates').last(),
          longitude: this.props.coordinates.get('coordinates').first()
        }}
        onPress={() => this.props.onPress()}
        image={Platform.OS === 'android' ? require('../../../../assets/images/map-pin.png') : null}
      >
        {Platform.OS === 'ios' &&
          <Image
            style={{ width: wp('23.73%'), flex: 1, resizeMode: 'contain' }}
            source={require('../../../../assets/images/map-pin.png')}
          />
        }
      </MapView.Marker>
    );
  }
}
