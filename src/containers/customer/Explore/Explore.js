// @flow
import React, { PureComponent } from 'react';
import { View, ActivityIndicator, Text, Modal, Animated, FlatList, Platform, NetInfo } from 'react-native';
import { LinearGradient, BlurView, Location, Permissions } from 'expo';
import PropTypes from 'prop-types';
import { MaterialIcons } from '../../../components/VectorIcons';
import ExploreSearch from '../ExploreSearch';
import ExploreScreenHeader from '../ExploreScreenHeader';
import ExploreList from '../ExploreList';
import ExploreSearchInput from '../../../components/ExploreSearchInput';
import FilterItem from '../../../components/FilterItem';
import Slider from 'react-native-slider';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import styles from './styles';
import { get } from '../../../utils/api';
import LoadingComponent from '../../../components/LoadingComponent';
import Toast from 'react-native-custom-toast';
import {
  COLOR_GREEN,
  FONT_FAMILY_MEDIUM,
  SF_PRO_DISPLAY_REGULAR
} from '../../../services/constants';

import { showAlertWithMessage, manuallyLogout } from '../../../services/commonFunctions';

const price2Indicator = wp('85%') * 0.33 - wp('6.66%');

const price3Indicator = wp('85%') * 0.66 - wp('9.5%');

const price4Indicator = wp('85%') * 0.99 - wp('9.5%');

let disableBtn = false;

class Explore extends PureComponent<Props> {
  static navigationOptions = {
    title: 'Explore',
    tabBarIcon: props => (
      <MaterialIcons name="explore" size={24} color={props.tintColor} />
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

  static displayName = 'Explore';

  constructor(props) {
    super(props);

    this.state = {
      showList: false,
      filteredData: [],
      showLoader: false,
      showFilters: false
    };

    this.animatedValue = new Animated.Value(0);

    this.timeOutVar = -1;

    this.activeFilters = [];
  }

  componentDidMount() {
    this.props.filters.map(item => {
      if(item.on) {
        this.activeFilters.push(item.filterType);
      }
    });

    this.hitAPI();
  }

  showToast() {
    this.toast.showToast('Location services off, got location through IP.');
  }

  hitAPI() {
    this.props.getUserCurrentLocation().then(coords => {
      this.props.listVendors(
        coords.latitude,
        coords.longitude,
        this.props.distance,
        this.activeFilters.join(','),
        this.props.pricing
      ).then(() => {
          if(coords.gotThrough && coords.gotThrough === 'IP') {
            this.showToast();
          }
          disableBtn = false;
        })
        .catch(err => {
          if(err.code === 401) {
            manuallyLogout(err, () => this.props.userLogout());
          } else {
            showAlertWithMessage('Uh-oh!', err, () => {
              disableBtn = false;
            })
          }
        });
    }).catch(err => showAlertWithMessage('Uh-oh!', err, () => {
        disableBtn = false;
    }));
  }

  onTextChange(text) {
    if(this.state.showLoader === false) {
      this.setState(() => {
        return {
          showLoader: true
        }
      });
    }
    if(text !== '') {
      this.clearTimer();
      this.timeOutVar = setTimeout(() => {
        this.callWebService(text);
      }, 2000);
    }
  }

  clearTimer() {
    clearTimeout(this.timeOutVar);
    this.timeOutVar = -1;
  }

  async callWebService(text) {
    try {
      await get(`/v1/vendors?name=${text}`).then(response => {
        this.setState(() => {
          return {
            filteredData: response,
            showLoader: false
          }
        });
      });
    } catch (err) {
        if(err.code === 401) {
          this.setState({ showLoader: false }, () => {
            manuallyLogout(err, () => this.props.userLogout());
          });
        } else {
          this.setState({ showLoader: false }, () => {
            showAlertWithMessage('Uh-oh!', err);
          });
        }
      }
  }

  showList(value) {
    this.setState(() => {
      return {
        showList: value
      }
    });
  }

  setFilterPanelPosition = (y, height) => {
    this.animatedValue.setValue(y + height);
    console.log(y, height);
  }

  showFilters = () => {
    this.setState({ showFilters: !this.state.showFilters });
  }

  updateDistance(distance) {
    const newDistance = parseFloat(distance.toFixed(1));
    this.props.updateDistance(newDistance).then(() => {
      this.hitAPI();
    });
  }

  updatePrice(price) {
    this.props.updatePrice(price).then(() => {
      this.hitAPI();
    });
  }

  toggleFilter = (id) => {
    if(disableBtn === false) {
      disableBtn = true;
      this.activeFilters = [];
      this.props.toggleFilter(id).then(() => {
        this.props.filters.map(item => {
          if(item.on) {
            this.activeFilters.push(item.filterType);
          }
        });
        this.hitAPI();
      });
    }
  }

  render() {
    const { filters } = this.props;
    return (
      <LinearGradient
        testID="linearGradient"
        colors={['rgb(0,0,0)', 'transparent', 'transparent', 'transparent', 'transparent']}
        locations={[0.1, 0.4, 0.4, 0.4, 0.4]}
        style={styles.container}
      >
        <View style={{ flex: 1 }}>
          <ExploreSearchInput
            showList={value => this.showList(value)}
            showListValue={this.state.showList}
            onTextChange={text => this.onTextChange(text)}
            clearTimer={this.clearTimer}
          />
          <ExploreScreenHeader
            testID="exploreHeader"
            setFilterPanelPosition={this.setFilterPanelPosition}
            showFilters={this.showFilters}
          />

          {/* FILTERS PANEL UI MOVED FROM EXPLORE SCREEN HEADER COMPONENT. */}
          {this.state.showFilters &&
            <Animated.View
              style={[
                  styles.filtersHolder, {
                    transform: [{ translateY: this.animatedValue }]
            }]}>
              <BlurView style={styles.blurView} tint="dark" intensity={90} />
              <FlatList
                horizontal
                contentContainerStyle={styles.filtersList}
                keyExtractor={item => item._id.toString()}
                showsHorizontalScrollIndicator={false}
                data={filters}
                renderItem={({ item }) =>
                  <FilterItem
                    image={item.image}
                    name={item.name}
                    on={item.on}
                    toggleFilter={() => this.toggleFilter(item._id)}
                  />
                }
              />

              <View>
                <View style={styles.slidersHolder}>
                  <View style={styles.sliderTitleHolder}>
                    <Text style={styles.sliderTitleText}>Distance</Text>
                    <Text style={styles.sliderTitleText}>
                      {this.props.maxDistance}mi
                    </Text>
                  </View>
                  <Slider
                    minimumValue={this.props.minDistance}
                    maximumValue={this.props.maxDistance}
                    minimumTrackTintColor="rgb(47,212,117)"
                    maximumTrackTintColor="rgb(230,230,230)"
                    thumbTintColor="rgb(255,254,255)"
                    thumbStyle={{ height: 18, width: 18 }}
                    value={this.props.distance}
                    trackStyle={{ height: 3 }}
                    thumbStyle={{ height: 13, width: 13 }}
                    onSlidingComplete={value => this.updateDistance(value)}
                  />
                </View>
                {filters.map(item => {
                  if (item.filterType === 'price' && item.on === true) {
                    return (
                      <View
                        key={item._id}
                        style={styles.priceSliderContainer}
                      >
                        <View
                          style={styles.priceSliderHolder}
                        >
                          <Slider
                            minimumValue={0}
                            maximumValue={3}
                            step={1}
                            minimumTrackTintColor="rgb(47,212,117)"
                            maximumTrackTintColor="rgb(230,230,230)"
                            thumbTintColor="rgb(255,254,255)"
                            thumbStyle={{ height: 18, width: 18 }}
                            style={{height: 31}}
                            value={this.props.pricing - 1}
                            onSlidingComplete={value => this.updatePrice(value)}
                            trackStyle={{ height: 3 }}
                            thumbStyle={{ height: 13, width: 13 }}
                          />
                        </View>

                        <View
                          pointerEvents="none"
                          style={{
                            width: wp('13.33%'),
                            height: 31,
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            zIndex: 1
                          }}
                        >
                          <Text
                            style={{
                              color: COLOR_GREEN,
                              fontSize: wp('2.66%'),
                              width: wp('13.33%'),
                              height: 20,
                              fontFamily: SF_PRO_DISPLAY_REGULAR
                            }}
                          >
                            $
                          </Text>

                          <View
                            style={[
                              styles.priceBarIndicator,
                              {
                                backgroundColor:
                                  this.props.pricing - 1 > 0.0
                                    ? 'rgba(255,255,255,1.0)'
                                    : null
                              }
                            ]}
                          />
                        </View>

                        <View
                          pointerEvents="none"
                          style={{
                            width: wp('13.33%'),
                            left: price2Indicator,
                            position: 'absolute',
                            height: 31,
                            flexDirection: 'column',
                            zIndex: 1,
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}
                        >
                          <Text
                            style={[
                              {
                                fontSize: wp('2.66%'),
                                height: 20,
                                textAlign: 'center',
                                width: wp('13.33%'),
                                fontFamily: SF_PRO_DISPLAY_REGULAR
                              },
                              {
                                color:
                                  this.props.pricing - 1 >= 1
                                    ? COLOR_GREEN
                                    : 'rgba(255,255,255,1.0)'
                              }
                            ]}
                          >
                            $$
                          </Text>

                          <View
                            style={[
                              styles.priceBarIndicator,
                              {
                                backgroundColor:
                                  this.props.pricing - 1 === 1
                                    ? null
                                    : 'rgba(255,255,255,1.0)'
                              }
                            ]}
                          />
                        </View>

                        <View
                          pointerEvents="none"
                          style={{
                            width: wp('13.33%'),
                            position: 'absolute',
                            left: price3Indicator,
                            height: 31,
                            flexDirection: 'column',
                            zIndex: 1,
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}
                        >
                          <Text
                            style={[
                              {
                                fontSize: wp('2.66%'),
                                height: 20,
                                marginLeft: 2,
                                textAlign: 'center',
                                width: wp('13.33%'),
                                fontFamily: SF_PRO_DISPLAY_REGULAR
                              },
                              {
                                color:
                                  this.props.pricing - 1 >= 2
                                    ? COLOR_GREEN
                                    : 'rgba(255,255,255,1.0)'
                              }
                            ]}
                          >
                            $$$
                          </Text>

                          <View
                            style={[
                              styles.priceBarIndicator,
                              {
                                backgroundColor:
                                  this.props.pricing - 1 === 2
                                    ? null
                                    : 'rgba(255,255,255,1.0)'
                              }
                            ]}
                          />
                        </View>

                        <View
                          pointerEvents="none"
                          style={{
                            width: wp('13.33%'),
                            height: 31,
                            position: 'absolute',
                            left: price4Indicator,
                            flexDirection: 'column',
                            zIndex: 1,
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}
                        >
                          <Text
                            style={[
                              {
                                fontSize: wp('2.66%'),
                                height: 20,
                                textAlign: 'center',
                                width: wp('13.33%'),
                                fontFamily: SF_PRO_DISPLAY_REGULAR
                              },
                              {
                                color:
                                  this.props.pricing - 1 >= 3
                                    ? COLOR_GREEN
                                    : 'rgba(255,255,255,1.0)'
                              }
                            ]}
                          >
                            $$$$
                          </Text>

                          <View
                            style={[
                              styles.priceBarIndicator,
                              {
                                backgroundColor:
                                  this.props.pricing - 1 >= 3
                                    ? null
                                    : 'rgba(255,255,255,1.0)'
                              }
                            ]}
                          />
                        </View>
                      </View>
                    );
                  }
                })}
              </View>
            </Animated.View>
          }

          <ExploreList
            testID="exploreList"
            showToast={() => this.showToast()}
          />
          {this.state.showList &&
            <ExploreSearch
              testID="exploreSearch"
              showLoader={this.state.showLoader}
              filteredData={this.state.filteredData}
            />
          }
        </View>
        <LoadingComponent visible={this.props.isBusy} />
        <Toast
          ref={toast => this.toast = toast}
          position='bottom'
          orientation='yAxis'
          backgroundColor={COLOR_GREEN}
        />
      </LinearGradient>
    );
  }
}

Explore.propTypes = {
  filters: PropTypes.array.isRequired,
  getUserCurrentLocation: PropTypes.func.isRequired,
  updateDistance: PropTypes.func.isRequired,
  updatePrice: PropTypes.func.isRequired,
  toggleFilter: PropTypes.func.isRequired,
  listVendors: PropTypes.func.isRequired,
  userLogout: PropTypes.func.isRequired,
  distance: PropTypes.number.isRequired,
  pricing: PropTypes.number.isRequired,
  minDistance: PropTypes.number.isRequired,
  maxDistance: PropTypes.number.isRequired
};

export default Explore;
