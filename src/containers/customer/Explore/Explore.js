// @flow
import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ExploreScreenHeader from '../ExploreScreenHeader';
import ExploreSectionList from '../ExploreSectionList';

class Explore extends PureComponent {
  static displayName = 'Explore';

  static navigationOptions = {
    title: 'Explore',
    tabBarIcon: props => (
      <Icon name="explore" size={24} color={props.tintColor} />
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

  render() {
    return (
      <View style={styles.container}>
        <ExploreScreenHeader />

        <ExploreSectionList />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B2C2C'
  }
});

export default Explore;
