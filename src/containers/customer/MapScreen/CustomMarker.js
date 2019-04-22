import React, { Component } from 'react';
import { MapView } from 'expo';
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
        image={require('../../../../assets/images/map-pin.png')}
      />
    );
  }
}
