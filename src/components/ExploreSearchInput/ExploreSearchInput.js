// @flow
import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Animated,
  Easing
} from 'react-native';

import { LinearGradient } from 'expo';

import { EvilIcons } from '@expo/vector-icons';

import styles from './styles';

const windowWidth = Dimensions.get('window').width;

export default class ExploreSearchInput extends Component {
  constructor() {
    super();

    this.state = {
      showPlaceholder: true,
      searchInputValue: ''
   };

   this.animatedValue = new Animated.Value(0);
  }

  onFocus = () => {
    this.animatedValue.setValue(0);

    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear
    }).start();

    if (this.state.showPlaceholder && this.state.searchInputValue === '') {
      this.setState({ showPlaceholder: false });
    } else if (this.this.state.searchInputValue !== '') {
      this.setState({ showPlaceholder: true });
    }
  };

  onBlur = () => {
    this.animatedValue.setValue(1);

    Animated.timing(this.animatedValue, {
      toValue: 0,
      duration: 200,
      easing: Easing.linear
    }).start();

    if (!this.state.showPlaceholder) {
      this.setState({ showPlaceholder: true });
    }
  };

  cancelAction = () => {
    this.onBlur();
    this.searchInput.blur();
  }

  render() {
    const textInputWidthAnimation = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [windowWidth - 30, windowWidth - 90]
    });

    return (
      <View style={styles.searchInputHolder}>
        <Animated.View style={{ width: textInputWidthAnimation, zIndex: 999 }}>
          <LinearGradient
            colors={['rgb(44,44,44)', 'rgb(52,52,52)']}
            style={styles.LinearGradientStyle}
          >
            {this.state.showPlaceholder &&
              <View style={styles.placeholder}>
                <EvilIcons name="search" size={21} color="rgb(151, 151, 151)" />
                <Text style={styles.searchText}>Search</Text>
              </View>
            }

            <TextInput
              style={styles.searchTextInput}
              ref={input => {
                this.searchInput = input;
              }}
              underlineColorAndroid="transparent"
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              onChangeText={text => this.setState({ searchInputValue: text })}
            />
          </LinearGradient>
        </Animated.View>

        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.cancelBtn}
          onPress={this.cancelAction}
        >
          <Text style={styles.cancelBtnText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
