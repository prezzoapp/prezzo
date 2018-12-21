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

import PropTypes from 'prop-types';

import { EvilIcons } from '../VectorIcons';

import styles from './styles';

const windowWidth = Dimensions.get('window').width;

export default class ExploreSearchInput extends Component {
  constructor() {
    super();

    this.state = {
      searchInputValue: ''
    };

    this.animatedValue = new Animated.Value(0);

    this.showPlaceholder = true;
  }

  onFocus = () => {
    if(this.state.searchInputValue === '') {
      this.animatedValue.setValue(0);

      Animated.timing(this.animatedValue, {
        toValue: 1,
        duration: 200,
        easing: Easing.linear
      }).start();
    }
  };

  onChangeText(text) {
    this.setState(() => {
      return {
        searchInputValue: text
      }
    }, () => {
        this.props.onTextChange(text);
        if (
          this.state.searchInputValue !== '' &&
          this.props.showListValue === false
        ) {
        this.props.showList(true);
        } else if (
          this.state.searchInputValue === '' &&
          this.props.showListValue === true
        ) {
        this.props.showList(false);
      }
    });
  }

  onBlur = () => {
    if(this.state.searchInputValue === '') {
      this.animatedValue.setValue(1);

      Animated.timing(this.animatedValue, {
        toValue: 0,
        duration: 200,
        easing: Easing.linear
      }).start();
    }
  };

  cancelAction() {
    this.searchInput.blur();
    this.setState(() => {
        return {
          searchInputValue: '',
          hidePlaceholder: false
        };
      }, () => {
        this.props.clearTimer();
        this.props.showList(false);
      }
    );
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
            {!this.props.showListValue &&
              <View style={styles.placeholder}>
                <EvilIcons name="search" size={21} color="rgb(151, 151, 151)" />
                <Text style={styles.searchText}>Search</Text>
              </View>
            }

            <TextInput
              returnKeyType="search"
              style={styles.searchTextInput}
              ref={input => {
                this.searchInput = input;
              }}
              underlineColorAndroid="transparent"
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              onChangeText={text => this.onChangeText(text)}
              value={this.state.searchInputValue}
            />
          </LinearGradient>
        </Animated.View>

        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.cancelBtn}
          onPress={() => this.cancelAction()}
        >
          <Text style={styles.cancelBtnText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

ExploreSearchInput.propTypes = {
  clearTimer: PropTypes.func.isRequired,
  onTextChange: PropTypes.func.isRequired,
  showList: PropTypes.func.isRequired,
  showListValue: PropTypes.bool.isRequired
};
