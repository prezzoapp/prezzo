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

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { LinearGradient } from 'expo';

import PropTypes from 'prop-types';

import { EvilIcons } from '@expo/vector-icons'

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
    this.animationCompleted = false;
  }

  onFocus = () => {
    if(this.state.searchInputValue === '') {
      if(this.animationCompleted === false) {
        this.animationCompleted = true;

        this.animatedValue.setValue(0);

        Animated.timing(this.animatedValue, {
          toValue: 1,
          duration: 200,
          easing: Easing.linear
        }).start(() => {
          this.animationCompleted = false;
        });
      }
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
      if(this.animationCompleted === false) {
        this.animationCompleted = true;

        this.animatedValue.setValue(1);

        Animated.timing(this.animatedValue, {
          toValue: 0,
          duration: 200,
          easing: Easing.linear
        }).start(() => {
          this.animationCompleted = false;
        });
      }
    }
  };

  cancelAction() {
    if(this.animationCompleted === false) {
      this.animationCompleted = true;

      this.searchInput.blur();

      this.animatedValue.setValue(1);

      this.setState(() => {
          return {
            searchInputValue: '',
            hidePlaceholder: false
          };
        }, () => {
          this.props.clearTimer();
          this.props.showList(false);
          Animated.timing(this.animatedValue, {
            toValue: 0,
            duration: 200,
            easing: Easing.linear
          }).start(() => {
            this.animationCompleted = false;
          });
        }
      );
    }
  }

  render() {
    const textInputWidthAnimation = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [windowWidth - wp('8%'), windowWidth - wp('24%')]
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
                <EvilIcons name="search" size={wp('5.26%')} color="rgb(151, 151, 151)" />
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
