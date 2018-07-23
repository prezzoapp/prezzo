// @flow
import React, {PureComponent} from 'react';
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

import HeaderSection from './headerSection';

import MainList from './listComponent';

export default class Explore extends PureComponent {
  static displayName = 'Explore';

  static navigationOptions = {
    header: null
  };

  static propTypes = {
    navigate: PropTypes.func.isRequired,
    sectionListReducer: PropTypes.object
  };

  constructor()
  {
    super();
  }

  render() {
    //console.log('Root Render Called!');
    return (
      <View style={styles.container}>
        <HeaderSection />

        <MainList />
      </View>
    );
  }
}

const styles = StyleSheet.create(
  {
    container:
    {
      flex: 1,
      backgroundColor: '#2B2C2C',
      paddingTop: 15
    }
  });
