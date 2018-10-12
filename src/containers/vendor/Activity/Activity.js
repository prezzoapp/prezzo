// @flow
import React, { Component } from 'react';
import {
  Dimensions,
  View,
  Image,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { BlurView } from 'expo';
import PropTypes from 'prop-types';
import styles from './styles';
import TableScreenHeader from '../TableScreenHeader';
import OpenTableItem from '../../../components/OpenTableItem';
import QueuedTableItem from '../../../components/QueuedTableItem';
import TableListHeader from '../../../components/TableListHeader';
import { ACCEPT_ORDER, DELETE_ORDER } from '../../../services/constants';

import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {
  FONT_FAMILY,
  FONT_FAMILY_MEDIUM,
  COLOR_WHITE
} from '../../../services/constants';
import Button from '../../../components/Button';
import ReviewUserPhoto from '../../../components/ReviewUserPhoto';

const SECTION_WIDTH: number = 0.85 * Dimensions.get('window').width;

const buttonStyles = {
  callWaiterBtn: {
    backgroundColor: '#2ED573',
    borderColor: '#0DD24A',
    width: wp('37.33%'),
    height: hp('4.92%'),
    justifyContent: 'center',
    borderRadius: 8,
    marginLeft: wp('5.33%')
  },

  callWaiterBtnText: {
    fontSize: wp('3.46%'),
    fontFamily: FONT_FAMILY,
    color: COLOR_WHITE,
    paddingTop: 0,
    paddingBottom: 0,
    justifyContent: 'center'
  },
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
    fontFamily: FONT_FAMILY,
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

const stylesNew = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'blue'
  },
  box1: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flex: 1,
    height: '100%',
    backgroundColor: 'black',
    zIndex: 9999,
    opacity: 0.99

    // backgroundColor: '#2B2C2C'
  },
  box2: {
    position: 'absolute',
    top: 40,
    width: SECTION_WIDTH,
    flex: 1,
    height: '100%',
    zIndex: 9999,
    backgroundColor: 'grey',
    opacity: 0.9,
    borderRadius: 10
    // backgroundColor: '#2B2C2C'
  },

  text: {
    color: '#ffffff',
    fontSize: 80
  }
});

class Activity extends Component {
  static navigationOptions = {
    title: null,
    header: null
  };

  constructor() {
    super();

    this.state = {
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

  show() {
    this.setState(
      () => ({
        selected: true
      }),
      () => {
        console.log(this.state.selected);
      }
    );
  }

  hide() {
    this.setState(
      () => ({
        selected: false
      }),
      () => {
        // console.log(this.state.data)
      }
    );
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
      () => {
        // console.log(this.state.data)
      }
    );
  }

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
      <Text style={styles.message} />
      <Text style={styles.subTitle}>Tap and hold to view full screen.</Text>
    </View>
  );

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
      this.props.listWaiterRequestTable();
    } else {
      this.props.listPhotoReviewTable();
    }
  }

  onSectionChange = index => {
    if (index === 0) {
      this.props.listWaiterRequestTable();
    } else {
      this.props.listPhotoReviewTable();
    }

    this.props.changeSection(index);
  };

  handleQueuedTableItem = (tableId, index, actionType) => {
    Alert.alert(
      actionType === ACCEPT_ORDER ? 'Accept' : 'Remove',
      `${this.props.queuedTableList[index].userName} \n Delivery Order`,
      [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel'
        },
        { text: 'OK', onPress: () => this.handleConfirm(tableId, actionType) }
      ],
      { cancelable: false }
    );
  };

  changeTabHandler = index => {
    if (index === 1) {
      this.props.listPhotoReviewTable();
    }
  };

  handleConfirm = (tableId, actioType) => {
    if (actioType === ACCEPT_ORDER) {
      this.props.acceptQueuedRequest(this.props.queuedTableList, tableId);
    } else if (actioType === DELETE_ORDER) {
      this.props.deleteQueuedRequest(this.props.queuedTableList, tableId);
    }
  };

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
        data={
          this.props.openTableList.constructor.name === 'Array'
            ? Array.from(this.props.openTableList)
            : []
        }
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
        data={
          this.props.queuedTableList.constructor.name === 'Array'
            ? Array.from(this.props.queuedTableList)
            : []
        }
        renderItem={rowData => (
          <TouchableOpacity onPress={() => this.show()}>
            <View
              style={{ backgroundColor: 'transparent', position: 'relative' }}
            >
              <OpenTableItem
                data={rowData}
                tabName="activity"
                innerTabName="photoReview"
              />
              <View
                style={{
                  backgroundColor: 'transparent',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%'
                }}
              />
            </View>
          </TouchableOpacity>
        )}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {(() => {
          if (this.state.selected) {
            return (
              <View style={stylesNew.box1}>
                <View style={stylesNew.box2}>
                  <BlurView
                    style={styles.blurView}
                    tint="light"
                    intensity={30}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: SECTION_WIDTH,
                      height: hp('6.15%')
                    }}
                  >
                    <Text style={styles.Title}>Victor Franco</Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: SECTION_WIDTH
                    }}
                  >
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
                      keyExtractor={item => item.index}
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

                      // renderItem={({ item }) => <AddReviewListItem item={item} />}
                    />
                  </View>
                </View>
              </View>
            );
          }
          return null;
        })()}

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
      </View>
    );
  }
}

export default Activity;
