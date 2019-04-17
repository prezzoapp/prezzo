import React, { Component } from 'react';
import ReactNative, { View, FlatList, Text, Image, TouchableOpacity, PanResponder, Animated, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import { Feather } from '../VectorIcons';
import Button from '../Button';
import FilteredVendorBottomCardItem from './FilteredVendorBottomCardItem';

import styles from './styles';

import { SF_PRO_TEXT_SEMI_BOLD } from '../../services/constants';

const { width, height } = Dimensions.get('screen');

const parentRef = React.createRef();
const childRef = React.createRef();

class FilteredVendorBottomCard extends Component {
  constructor() {
    super();

    this.state = { showVendorInfo: false, item: null };

    this.callMethod = this.callMethod.bind(this);

    this.panResponder = null;

    this.showModalAnimatedValue = new Animated.Value(hp('30.54%'));

    this.layout = { x: 0, y: 0, width: 0, height: 0 };

    this.animationRunning = false;
  }

  componentWillMount() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => false,

      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,

      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return true;
        // console.log(evt.nativeEvent.pageY);
        // if (evt.nativeEvent.locationY <= this.layout.height) {
        //   // console.log(evt.nativeEvent.locationY, this.layout.height);
        //   return true;
        // }
        //
        // return false;
      },

      onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,

      onPanResponderMove: (evt, gestureState) => {
        // console.log(gestureState.dy);
        if (gestureState.dy > 0) {
          this.showModalAnimatedValue.setValue(gestureState.dy);
        }
      },

      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy <= parseInt(hp('30.54%') / 2)) {
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

  renderSeparator = () => <View style={styles.separator} />;

  backToList = () => {
    Animated.timing(this.showModalAnimatedValue, {
      toValue: hp('30.54%'),
      duration: 300,
      useNativeDriver: true
    }).start(() => {
      this.showModalAnimatedValue.setValue(hp('30.54%'));
      this.setState({
        item: null,
        showVendorInfo: false
      })
    });
  };

  calculateLayout = () => {
    childRef.current.measureLayout(
      ReactNative.findNodeHandle(parentRef.current),
      (xPos, yPos, Width, Height) => {
        this.layout.x = xPos;
        this.layout.y = yPos;
        this.layout.width = Width;
        this.layout.height = Height;
      }
    );
  };

  render() {
    return (
      <View style={styles.filteredRestaurantsBottomCardHolder}>
        <FlatList
          contentContainerStyle={styles.contentContainerStyle}
          keyExtractor={item => item._id}
          data={this.props.data}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={this.renderSeparator}
          renderItem={({ item }) =>
            <FilteredVendorBottomCardItem
              item={item}
              customRegion={this.props.customRegion}
              moveToPosition={() =>
                this.props.moveToPosition(item._id, item.location.coordinates)
              }
              getDistanceFromCurrentLocation={
                this.props.getDistanceFromCurrentLocation
              }
            />
          }
        />
        {this.state.showVendorInfo && (
          <Animated.View
            ref={parentRef}
            style={[
              styles.vendorInfoHolder,
              {
                transform: [{ translateY: this.showModalAnimatedValue }]
              }
            ]}
          >
            <View
              style={styles.buttonHolder}
              ref={childRef}
              onLayout={this.calculateLayout}
              {...this.panResponder.panHandlers}
            >
              <TouchableOpacity
                onPress={this.backToList}
                activeOpacity={0.8}
              >
                <Image
                  source={require('../../../assets/images/icons/bottom_arrow.png')}
                  style={styles.bottom_arrow}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.contentHolder}>
              <View style={styles.vendorIconHolder}>
                <CacheImage
                  source={this.state.item.avatarURL}
                  type='image'
                  style={styles.vendorIcon}
                />
              </View>
              <View style={styles.vendorContentHolder}>
                <Text numberOfLines={1} style={styles.vendorName}>
                  {this.state.item.name}
                </Text>
                <Text style={styles.vendorAddress} numberOfLines={1}>
                  {this.state.item.location.city}, {this.state.item.location.region}
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
                onPress={() => this.callMethod(this.state.item)}
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
  data: PropTypes.array.isRequired
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
