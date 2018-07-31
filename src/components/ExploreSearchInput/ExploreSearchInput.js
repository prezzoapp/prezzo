// @flow
import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';

// import LinearGradient from 'react-native-linear-gradient';

import Icon from 'react-native-vector-icons/EvilIcons';

import styles from './styles';

export default class ExploreSearchInput extends Component {
  constructor() {
    super();

    this.state = { showPlaceholder: true, searchInputValue: '' };
  }

  onFocus = () => {
    if (this.state.showPlaceholder && this.state.searchInputValue === '') {
      this.setState({ showPlaceholder: false });
    } else if (this.this.state.searchInputValue !== '') {
      this.setState({ showPlaceholder: true });
    }
  };

  onBlur = () => {
    if (!this.state.showPlaceholder) {
      this.setState({ showPlaceholder: true });
    }
  };

  render() {
    return (
      <View style={styles.searchInputHolder}>
        <TextInput
          style={styles.searchTextInput}
          underlineColorAndroid="transparent"
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChangeText={text => this.setState({ searchInputValue: text })}
        />
      </View>
    );
  }
}
