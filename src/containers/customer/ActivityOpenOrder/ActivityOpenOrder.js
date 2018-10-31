import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import PropTypes from 'prop-types';

import styles from './styles';
import ActivityListItem from '../../../components/ActivityListItem';
import Button from '../../../components/Button';

import {
  FONT_FAMILY,
  FONT_FAMILY_MEDIUM,
  COLOR_WHITE
} from '../../../services/constants';

class ActivityOpenOrder extends Component {
  constructor() {
    super();

    this.state = { isFetching: false }
  }

  componentDidMount() {
    this.hitAPI();
  }

  onRefresh() {
    this.setState(() => {
        return {
          isFetching: true
        }
      },
      () => {
        this.hitAPI();
        this.setState(() => {
          return {
            isFetching: false
          }
        });
      }
    );
  }

  hitAPI() {
    this.props.listOpenOrders('5bd2c0661392eb0a5c23c08b');
  }

  renderHeader() {
    return <Text style={styles.tableCode}>Table 9192</Text>;
  }

  render() {
    const pendingItem =
      this.props.data &&
      this.props.data.filter(item => {
        if (
          item.status === 'preparing' ||
          item.status === 'active' ||
          item.status === 'pending'
      ) {
        return item.items.filter(innerItem => {
            innerItem.status = 'delivered';
            innerItem.editable = false;
          }
        )
      }
    });

    console.log(pendingItem);

    return (
      <View style={styles.container}>
        {(() => {
          if (pendingItem.length === 0) {
            return (
              <View style={styles.notFoundHolder}>
                <Text style={styles.message}>
                  No pending order. You can create new one.
                </Text>
              </View>
            )
          }
          return (
            <View style={{ flex: 1 }}>
              <FlatList
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                data={pendingItem.length !== 0 ? pendingItem[0].items : []}
                renderItem={({ item }) => <ActivityListItem item={item} />}
                onRefresh={() => this.onRefresh()}
                refreshing={this.state.isFetching}
                ListHeaderComponent={this.renderHeader}
                stickyHeaderIndices={[0]}
              />
              <View style={styles.footerContainer}>
                <Button
                  style={buttonStyles.callWaiterBtn}
                  textStyle={buttonStyles.callWaiterBtnText}
                  onPress={() => null}
                >
                  Call Waiter
                </Button>

                <Button
                  style={buttonStyles.closeTableBtn}
                  textStyle={buttonStyles.closeTableBtnText}
                  onPress={() => null}
                >
                  Close Table
                </Button>
              </View>
            </View>
          );
        })()}
      </View>
    );
  }
}

const buttonStyles = {
  callWaiterBtn: {
    backgroundColor: '#2ED573',
    borderColor: '#0DD24A',
    width: wp('37.33%'),
    height: hp('4.92%'),
    justifyContent: 'center',
    borderRadius: 8
  },

  callWaiterBtnText: {
    fontSize: wp('3.46%'),
    fontFamily: FONT_FAMILY,
    color: COLOR_WHITE,
    paddingTop: 0,
    paddingBottom: 0,
    justifyContent: 'center'
  },

  closeTableBtn: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    width: wp('37.33%'),
    height: hp('4.92%'),
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: hp('1%')
  },

  closeTableBtnText: {
    fontSize: wp('5.33%'),
    fontFamily: FONT_FAMILY_MEDIUM,
    color: 'rgba(255,255,255,0.5)',
    paddingTop: 0,
    paddingBottom: 0,
    justifyContent: 'center'
  }
};

ActivityOpenOrder.propTypes = {
  data: PropTypes.object.isRequired,
  listOpenOrders: PropTypes.func.isRequired
};

export default ActivityOpenOrder;
