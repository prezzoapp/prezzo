// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Image } from 'react-native';

class TutorialScreen extends React.Component {
  static propTypes = {
    image: PropTypes.number.isRequired
  }

  render() {
    return (
      <View
       testID={'tutorialScreen'}
       style={styles.container}>
        <Image
          style={styles.image}
          source={this.props.image}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff'
  }
});

export default TutorialScreen;
