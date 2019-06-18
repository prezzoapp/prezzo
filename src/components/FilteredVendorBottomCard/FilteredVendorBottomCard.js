import React, { Component } from 'react';
import ReactNative, { View, FlatList, Text, Image, TouchableOpacity, PanResponder, Animated, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import { Feather } from '@expo/vector-icons'
import Button from '../Button';
import FilteredVendorBottomCardItem from './FilteredVendorBottomCardItem';

import styles from './styles';

import { SF_PRO_TEXT_SEMI_BOLD } from '../../services/constants';
import CacheImage from '../CacheImage';
const panelHeight = hp('30.54%');

class FilteredVendorBottomCard extends Component {
  constructor() {
    super();

    this.state = { showVendorInfo: false, item: null };

    this.callMethod = this.callMethod.bind(this);

    this.panResponder = null;

    this.showModalAnimatedValue = new Animated.Value(panelHeight);

    this.layout = { x: 0, y: 0, width: 0, height: 0 };

    this.animationRunning = false;
  }

  componentWillMount() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => false,

      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,

      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return true;
      },

      onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,

      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dy > 0) {
          this.showModalAnimatedValue.setValue(gestureState.dy);
        }
      },

      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy <= parseInt(panelHeight / 2)) {
          Animated.timing(this.showModalAnimatedValue, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true
          }).start();
        } else {
          this.backToList();
        }
      }
    });
  }

  callMethod(item) {
    console.log(item);
    this.setState({
      item
    }, () => {
      if(this.state.showVendorInfo === false) {
        this.setState({
          showVendorInfo: true
        }, () => {
          if (this.animationRunning === false) {
            this.animationRunning = true;
            Animated.timing(this.showModalAnimatedValue, {
              toValue: 0,
              duration: 400,
              useNativeDriver: true
            }).start(() => {
              this.animationRunning = false;
            });
          }
        });
      }
    });
  }

  renderItem = data => (
    <FilteredVendorBottomCardItem
      item={data.item}
      customRegion={this.props.customRegion}
      moveToPosition={() =>
        this.props.moveToPosition(data.item.get('_id'), data.item.getIn(['location', 'coordinates']))
      }
      getDistanceFromCurrentLocation={
        this.props.getDistanceFromCurrentLocation
      }
    />
  );

  renderSeparator = () => <View style={styles.separator} />;

  backToList = () => {
    Animated.timing(this.showModalAnimatedValue, {
      toValue: panelHeight,
      duration: 300,
      useNativeDriver: true
    }).start(() => {
      this.showModalAnimatedValue.setValue(panelHeight);
      this.setState({
        item: null,
        showVendorInfo: false
      })
    });
  };

  render() {
    return (
      <View style={styles.filteredRestaurantsBottomCardHolder}>
        <FlatList
          contentContainerStyle={styles.contentContainerStyle}
          keyExtractor={item => item.get('_id').toString()}
          data={this.props.data.toArray()}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={this.renderSeparator}
          renderItem={this.renderItem}
        />
        {this.state.showVendorInfo && (
          <Animated.View
            style={[
              styles.vendorInfoHolder,
              {
                transform: [{ translateY: this.showModalAnimatedValue }]
              }
            ]}
          >
            <View
              style={styles.buttonHolder}
              {...this.panResponder.panHandlers}
            >
              <TouchableOpacity
                onPress={this.backToList}
                activeOpacity={0.8}
              >
                <CacheImage
                  source={require('../../../assets/images/icons/bottom_arrow.png')}
                  type='image'
                  style={styles.bottom_arrow}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.contentHolder}>
              <View style={styles.vendorIconHolder}>
                <CacheImage
                  source={this.state.item && this.state.item.get('avatarURL')}
                  type='image'
                  style={styles.vendorIcon}
                />
              </View>
              <View style={styles.vendorContentHolder}>
                <Text numberOfLines={1} style={styles.vendorName}>
                  {this.state.item.get('name')}
                </Text>
                <Text style={styles.vendorAddress} numberOfLines={1}>
                  {this.state.item.getIn(['location', 'city'])}, {this.state.item.getIn(['location', 'region'])}
                </Text>
                <View style={[styles.statusHolder, styles.extraStatusHolderStyle]}>
                  <CacheImage
                    source={require("../../../assets/images/open_restaurant_status.png")}
                    type='image'
                    style={styles.statusImage}
                  />
                  <Text style={[styles.status, styles.extraStatusStyle]}>Open Now</Text>
                </View>
              </View>
            </View>

            <View style={styles.vendorInfoSectionSeparator} />

            <View style={[styles.contentHolder, styles.extraContentHolderStyle]}>
              <View style={styles.iconTextHolder}>
                <Feather name="corner-up-right" size={wp('6.4%')} color="white" />
                <Text style={styles.milesText} numberOfLines={1}>0.32 miles away</Text>
              </View>

              <Button
                style={buttonStyles.goBtn}
                textStyle={buttonStyles.goBtnText}
                onPress={() => null}
              >
                Go
              </Button>
            </View>
          </Animated.View>
        )}
      </View>
    );
  }
}

FilteredVendorBottomCard.propTypes = {
  data: PropTypes.object.isRequired
};

const buttonStyles = {
  goBtn: {
    backgroundColor: '#0DD24A',
    borderColor: '#0DD24A',
    width: wp('29.86%'),
    height: wp('11.73%'),
    borderRadius: 8,
    justifyContent: 'center'
  },
  goBtnText: {
    fontSize: wp('4%'),
    fontFamily: SF_PRO_TEXT_SEMI_BOLD,
    paddingTop: 0,
    paddingBottom: 0
  }
};

export default FilteredVendorBottomCard;
