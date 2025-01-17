// @flow
import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  AsyncStorage,
  ActivityIndicator
} from 'react-native';
import { BlurView, LinearGradient } from 'expo';
import PropTypes from 'prop-types';
import styles from './styles';
import TableScreenHeader from '../TableScreenHeader';
import { Feather } from '@expo/vector-icons';
import OpenTableItem from '../../../components/OpenTableItem';
import QueuedTableItem from '../../../components/QueuedTableItem';
import TableListHeader from '../../../components/TableListHeader';
import Loader from '../../../components/Loader';
import {
  ACCEPT_ORDER,
  DELETE_ORDER,
  FONT_FAMILY,
  COLOR_WHITE,
  SF_PRO_TEXT_BOLD
} from '../../../services/constants';

import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Button from '../../../components/Button';
import ReviewUserPhoto from '../../../components/ReviewUserPhoto';
import ExploreSearchInput from '../../../components/ExploreSearchInput';
import LoadingComponent from '../../../components/LoadingComponent';
import VendorSearch from '../VendorSearch';
import { get } from '../../../utils/api';
import { showAlertWithMessage, manuallyLogout } from '../../../services/commonFunctions';

const SECTION_WIDTH: number = 0.85 * Dimensions.get('window').width;
const { height } = Dimensions.get('screen');

let disableBtn = false;

const buttonStyles = {
  submitReviewBtn: {
    backgroundColor: '#2ED573',
    borderColor: '#0DD24A',
    width: wp('41.33%'),
    height: hp('4.92%'),
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: hp('3.69%'),
    marginBottom: hp('3.30%')
  },

  submitReviewBtnText: {
    fontSize: wp('3.46%'),
    fontFamily: SF_PRO_TEXT_BOLD,
    color: COLOR_WHITE,
    paddingTop: 0,
    paddingBottom: 0,
    justifyContent: 'center'
  },

  closeReviewBtn: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    width: wp('41.33%'),
    height: hp('4.92%'),
    justifyContent: 'center',
    borderRadius: 8,
    marginBottom: hp('5.66%')
  },

  closeReviewBtnText: {
    fontSize: wp('4.26%'),
    fontFamily: FONT_FAMILY,
    color: 'rgba(255,255,255,0.5)',
    paddingTop: 0,
    paddingBottom: 0,
    justifyContent: 'center'
  }
};

class Activity extends Component {
  static navigationOptions = {
    title: null,
    header: null
  };

  constructor() {
    super();
    this.showModalAnimatedValue = new Animated.Value(0);
    this.state = {
      selected: false,
      showList: false,
      filteredData: [],
      isFetching: false,
      data: [
        {
          _id: 0,
          name: 'Buffalo Caluiflower v2',
          price: '$24',
          images: [
            {
              key: 'http://via.placeholder.com/160x160',
              selected: false,
              _id: 0
            },
            {
              key: 'http://via.placeholder.com/160x160',
              selected: false,
              _id: 1
            }
          ]
        },
        {
          _id: 1,
          name: 'Mac n Cheese x1',
          price: '$15',
          images: [
            {
              key: 'http://via.placeholder.com/160x160',
              selected: true,
              _id: 0
            },
            {
              key: 'http://via.placeholder.com/160x160',
              selected: false,
              _id: 1
            },
            {
              key: 'http://via.placeholder.com/160x160',
              selected: false,
              _id: 2
            }
          ]
        }
      ]
    };

    this.timeOutVar = -1;
  }

  renderFooter = () => (
    <View style={styles.listFooter}>
      <Button
        style={buttonStyles.submitReviewBtn}
        textStyle={buttonStyles.submitReviewBtnText}
        onPress={() => null}
      >
        Save To Menu
      </Button>

      <Button
        style={buttonStyles.closeReviewBtn}
        textStyle={buttonStyles.closeReviewBtnText}
        onPress={() => this.hide()}
      >
        Close Review
      </Button>
    </View>
  );

  static displayName = 'Activity';

  static propTypes = {
    navigate: PropTypes.func.isRequired,
    changeSection: PropTypes.func.isRequired,
    vendorData: PropTypes.object.isRequired,
    changeLayout: PropTypes.func.isRequired,
    section: PropTypes.number.isRequired,
    userLogout: PropTypes.func.isRequired,
    listPhotoReviewTable: PropTypes.func.isRequired,
    addPhotoReviewItemDetails: PropTypes.func.isRequired,
    removePhotoReviewItemDetails: PropTypes.func.isRequired,
    waiterRequestedTableList: PropTypes.object.isRequired,
    photoReviewList: PropTypes.object.isRequired,
    photoReviewSelectedItem: PropTypes.object,
    layout: PropTypes.string.isRequired,
    isBusy: PropTypes.bool.isRequired
  };

  static defaultProps = {
    photoReviewSelectedItem: null
  }

  componentDidMount() {
    if(this.props.vendorData) {
      this.getData();
    }
  }

  onSectionChange = index => {
    this.props.changeSection(index).then(() => {
      this.getData(index);
    });
  };

  onRefresh = () => {
    this.setState({ isFetching: true }, () => {
      this.getData();
    });
  };

  getData(sectionIndex = null) {
    if(disableBtn === false) {
      disableBtn = true;

      if ((sectionIndex ? sectionIndex : this.props.section) === 0) {
        this.props.listWaiterRequestTable(this.props.vendorData.get('_id')).then(() => {
          this.checkResponseMessage();
          disableBtn = false;
        })
        .catch(err => {
          if(err.code === 401) {
            disableBtn = false;
            manuallyLogout(err, () => this.props.userLogout());
          } else {
            showAlertWithMessage('Uh-oh!', err, () => {
              disableBtn = false;
            });
          }
        });
      } else {
        this.props.listPhotoReviewTable(this.props.vendorData.get('_id')).then(() => {
          this.checkResponseMessage();
          disableBtn = false;
        })
        .catch(err => {
          if(err.code === 401) {
            disableBtn = false;
            manuallyLogout(err, () => this.props.userLogout());
          } else {
            showAlertWithMessage('Uh-oh!', err, () => {
              disableBtn = false;
            });
          }
        });
      }

      if(this.state.isFetching) {
        this.setState({ isFetching: false });
      }
    }
  }

  async checkResponseMessage(){
    await AsyncStorage.getItem('response_message').then((msg) => {
      console.log("response message is -----------------",msg);
    });
  }

  myCallback(itemIndex, imageIndex) {
    const item = this.state.data.findIndex(x => x._id === itemIndex);
    const image = this.state.data[item].images.findIndex(
      x => x._id === imageIndex
    );
    this.state.data[item].images[image].selected = !this.state.data[item]
      .images[image].selected;

    this.setState(
      () => ({
        data: [...this.state.data]
      }),
      () => {}
    );
  }

  show(rowData) {
    rowData.item.get('items').map(ele => {
      if(ele.get('imageURLs').size !== 0) {
        Animated.timing(this.showModalAnimatedValue, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true
        }).start(() => {
          this.props.addPhotoReviewItemDetails(rowData.item);
        });
      }
    });
  }

  hide() {
    Animated.timing(this.showModalAnimatedValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true
    }).start(() => {
      this.props.removePhotoReviewItemDetails();
    });
  }

  changeTabHandler = index => {
    if (index === 1) {
      this.props.listPhotoReviewTable();
    }
  };

  renderHeader = () => (
    <View style={styles.listHeaderContainer}>
      <Text style={styles.listHeaderTitle}>Review User Photos</Text>
      <Text style={styles.listHeaderMessage}>
        Tap to select the user submitted{"\n"}photos you approve and then hit{"\n"}Save To Menu
      </Text>
      <Text style={styles.listHeaderSubtitle}>Tap and hold to view full screen.</Text>
    </View>
  );

  renderSection = () => {
    if (this.props.section === 0) {
      return this.renderWaiterRequestTable();
    }
    return this.renderPhotoReviewTable();
  }

  listEmptyComponent() {
    return (
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.message}>No items found!</Text>
      </View>
    );
  }

  renderWaiterRequestTableData = data => (
    <OpenTableItem
      data={data.item}
      navigate={this.props.navigate}
      tabName="activity"
    />
  );

  renderPhotoReviewTableData = data => (
    <OpenTableItem
      data={data.item}
      tabName="activity"
      innerTabName="photoReview"
      onPress={() => this.show(data)}
    />
  );

  renderSeparator = () => <View style={styles.separator}/>;

  renderWaiterRequestTable() {
    return (
      <FlatList
        keyExtractor={item => item.get('_id').toString()}
        showsVerticalScrollIndicator={false}
        onRefresh={this.onRefresh}
        refreshing={this.state.isFetching}
        ItemSeparatorComponent={this.renderSeparator}
        contentContainerStyle={[styles.flatListContentContainerStyle, { justifyContent: this.props.waiterRequestedTableList.size === 0 ? 'center' : null }]}
        ListEmptyComponent={this.listEmptyComponent}
        data={this.props.waiterRequestedTableList.size !== 0 ? this.props.waiterRequestedTableList.toArray() : []}
        renderItem={this.renderWaiterRequestTableData}
      />
    );
  }

  renderPhotoReviewTable() {
    return (
      <FlatList
        keyExtractor={item => item.get('_id').toString()}
        showsVerticalScrollIndicator={false}
        onRefresh={this.onRefresh}
        refreshing={this.state.isFetching}
        ItemSeparatorComponent={this.renderSeparator}
        contentContainerStyle={[styles.flatListContentContainerStyle, { justifyContent: this.props.photoReviewList.size === 0 ? 'center' : null }]}
        ListEmptyComponent={this.listEmptyComponent}
        data={this.props.photoReviewList.size !== 0 ? this.props.photoReviewList.toArray() : []}
        renderItem={this.renderPhotoReviewTableData}
      />
    );
  }

  onTextChange(text) {
    if(this.state.showLoader === false) {
      this.setState(() => {
        return {
          showLoader: true
        }
      });
    }
    this.clearTimer();
    this.timeOutVar = setTimeout(() => {
      this.callWebService(text);
    }, 2000);
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
        manuallyLogout(err, () => this.props.userLogout());
      } else {
        showAlertWithMessage('Uh-oh!', err);
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

  renderPhotoReviewItem = data => (
    <ReviewUserPhoto
      item={data.item}
      callbackFromParent={(itemIndex, imageIndex) =>
        this.myCallback(itemIndex, imageIndex)
      }
    />
  );

  render() {
    const animatedValue = this.showModalAnimatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [height, 0]
    });

    return (
      <View style={styles.container}>
        {(() => {
          if(this.props.vendorData) {
            return (
              <LinearGradient
                testID="linearGradient"
                colors={['rgb(0,0,0)', 'transparent', 'transparent', 'transparent', 'transparent']}
                locations={[0.1, 0.4, 0.4, 0.4, 0.4]}
                style={{ flex: 1 }}
              >
                <View style={{ flex: 1 }}>
                  <Animated.View
                    style={[
                      styles.box1,
                      {
                        transform: [{ translateY: animatedValue }]
                      }
                    ]}
                  >
                    <View style={styles.box2}>
                      <BlurView style={styles.blurView} tint="default" intensity={95} />
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          position: 'relative',
                          paddingBottom: hp('1%')
                        }}
                      >
                        <View style={styles.backBtn}>
                          <TouchableOpacity onPress={() => this.hide()}>
                            <Feather
                              title="Add More"
                              name="chevron-left"
                              color="white"
                              size={wp('8%')}
                              style={{ marginLeft: 0 }}
                            />
                          </TouchableOpacity>
                        </View>
                        <Text style={styles.title}>Victor Franco</Text>
                        <Text style={styles.subTitle}>Table 5932 - 3 Photos</Text>
                      </View>
                      { this.props.photoReviewSelectedItem ? (
                          <FlatList
                            keyExtractor={(item, index) => index.toString()}
                            showsVerticalScrollIndicator={false}
                            data={this.props.photoReviewSelectedItem.get('items').size !== 0 ? this.props.photoReviewSelectedItem.get('items').toArray() : []}
                            ListHeaderComponent={this.renderHeader}
                            ListFooterComponent={this.renderFooter}
                            renderItem={this.renderPhotoReviewItem}
                          />
                        ) : (
                          <Loader />
                        )
                      }
                    </View>
                  </Animated.View>

                  <ExploreSearchInput
                    showList={value => this.showList(value)}
                    showListValue={this.state.showList}
                    onTextChange={text => this.onTextChange(text)}
                    clearTimer={() => this.clearTimer()}
                  />

                  <TableScreenHeader
                    vendorData={this.props.vendorData}
                    tableSection={this.props.section}
                    tabName="activity"
                  />
                  <View style={styles.innerContainer}>
                    <TableListHeader
                      currentTab={this.props.section}
                      screenName="activity"
                      currentLayout={this.props.layout}
                      tabNames={['Waiter Request', 'Photo Review']}
                      onChangeLayout={layout => this.props.changeLayout(layout)}
                      onListTypeSelection={index => this.onSectionChange(index)}
                    />
                    {this.renderSection()}
                  </View>
                  {this.state.showList &&
                    <VendorSearch
                      showLoader={this.state.showLoader}
                      filteredData={this.state.filteredData}
                    />
                  }
                </View>
              </LinearGradient>
            )
          }
          return (
            <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.message}>Vendor Account not Found!</Text>
            </View>
          );
        })()}
        <LoadingComponent visible={this.props.isBusy} />
      </View>
    );
  }
}

export default Activity;
