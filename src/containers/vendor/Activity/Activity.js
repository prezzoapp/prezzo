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
  AsyncStorage
} from 'react-native';
import { BlurView } from 'expo';
import PropTypes from 'prop-types';
import styles from './styles';
import TableScreenHeader from '../TableScreenHeader';
import { Feather } from '../../../components/VectorIcons';
import OpenTableItem from '../../../components/OpenTableItem';
import QueuedTableItem from '../../../components/QueuedTableItem';
import TableListHeader from '../../../components/TableListHeader';
import { ACCEPT_ORDER, DELETE_ORDER } from '../../../services/constants';

import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FONT_FAMILY, COLOR_WHITE, SF_PRO_TEXT_BOLD } from '../../../services/constants';
import Button from '../../../components/Button';
import ReviewUserPhoto from '../../../components/ReviewUserPhoto';
import VendorSearch from '../VendorSearch';

const SECTION_WIDTH: number = 0.85 * Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const buttonStyles = {
  submitReviewBtn: {
    backgroundColor: '#2ED573',
    borderColor: '#0DD24A',
    width: wp('41.33%'),
    height: hp('4.92%'),
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: hp('5.78%'),
    marginBottom: hp('3.81%')
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
    fontSize: wp('5.33%'),
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
      viewMarginTop: hp('100%'),
      selected: false,
      data: [
        {
          index: 0,
          name: 'Buffalo Caluiflower v2',
          price: '$24',
          images: [
            {
              key: 'http://via.placeholder.com/160x160',
              selected: false,
              index: 0
            },
            {
              key: 'http://via.placeholder.com/160x160',
              selected: false,
              index: 1
            }
          ]
        },
        {
          index: 1,
          name: 'Mac n Cheese x1',
          price: '$15',
          images: [
            {
              key: 'http://via.placeholder.com/160x160',
              selected: true,
              index: 0
            },
            {
              key: 'http://via.placeholder.com/160x160',
              selected: false,
              index: 1
            },
            {
              key: 'http://via.placeholder.com/160x160',
              selected: false,
              index: 2
            }
          ]
        }
      ]
    };
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
    changeSection: PropTypes.func.isRequired
  };

  componentDidMount() {
    if (this.props.section === 0) {
      this.props.listWaiterRequestTable(this.props.vendorData.get('_id'));
    } else {
      this.props.listPhotoReviewTable();
    }
  }

  onSectionChange = index => {
    if (index === 0) {
      this.props.listWaiterRequestTable(this.props.vendorData.get('_id')).then(() => {
        this.checkResponseMessage();
      })
      .catch(e => {
        this.showAlert(e.message, 300);
      });
    } else {
      this.props.listPhotoReviewTable();
    }

    this.props.changeSection(index);
  };

  showAlert(message, duration) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      alert(message);
    }, duration);
  }

  async checkResponseMessage(){
    await AsyncStorage.getItem('response_message').then((msg) => {
      console.log("response message is -----------------",msg);
    });
  }

  myCallback(itemIndex, imageIndex) {
    const item = this.state.data.findIndex(x => x.index === itemIndex);
    const image = this.state.data[item].images.findIndex(
      x => x.index === imageIndex
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

  show() {
    Animated.timing(this.showModalAnimatedValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true
    }).start();
  }

  hide() {
    Animated.timing(this.showModalAnimatedValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true
    }).start();
  }

  changeTabHandler = index => {
    if (index === 1) {
      this.props.listPhotoReviewTable();
    }
  };

  renderHeader = () => (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Text style={styles.title}>Review User Photos</Text>
      <Text style={styles.message}>Tap to select the user submitted</Text>
      <Text style={styles.message}>photos you approve and then hit</Text>
      <Text style={styles.message}>Save To Menu</Text>
      <Text style={styles.subTitle}>Tap and hold to view full screen.</Text>
    </View>
  );

  renderSection = () => {
    if (this.props.section === 0) {
      return this.renderWaiterRequestTable();
    }
    return this.renderPhotoReviewTable();
  };

  renderWaiterRequestTable() {
    return (
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListStyle}
        data={this.props.openTableList.size !== 0 ? this.props.openTableList.toJS() : []}
        renderItem={rowData => (
          <OpenTableItem
            data={rowData}
            navigate={this.props.navigate}
            tabName="activity"
          />
        )}
      />
    );
  }

  renderPhotoReviewTable() {
    return (
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListStyle}
        data={this.props.openTableList.size !== 0 ? this.props.openTableList.toJS() : []}
        renderItem={rowData => (
          <OpenTableItem
            data={rowData}
            tabName="activity"
            innerTabName="photoReview"
            onPress={() => this.show()}
          />
        )}
      />
    );
  }

  render() {
    const animatedValue = this.showModalAnimatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [height, 0]
    });

    return (
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.box1,
            {
              transform: [{ translateY: animatedValue }]
            }
          ]}
        >
          <View style={styles.box2}>
            <BlurView style={styles.blurView} tint="dark" intensity={95} />
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                paddingBottom: 5
              }}
            >
              <View style={{ position: 'absolute', left: 10 }}>
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
              <Text style={styles.Title}>Victor Franco</Text>
              <Text style={styles.subTitle}>Table 5932 - 3 Photos</Text>
            </View>
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1
              }}
            >
              <FlatList
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                data={this.state.data}
                ListHeaderComponent={() => this.renderHeader()}
                ListFooterComponent={() => this.renderFooter()}
                renderItem={({ item }) => (
                  <ReviewUserPhoto
                    item={item}
                    callbackFromParent={(itemIndex, imageIndex) =>
                      this.myCallback(itemIndex, imageIndex)
                    }
                  />
                )}
              />
            </View>
          </View>
        </Animated.View>

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
        <VendorSearch />
      </View>
    );
  }
}

export default Activity;
