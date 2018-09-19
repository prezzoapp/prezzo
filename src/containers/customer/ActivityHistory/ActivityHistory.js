import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Tab, Tabs, ScrollableTab } from 'native-base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import ActivityHistoryTab from '../../../components/ActivityHistoryTab';
import Button from '../../../components/Button';
import styles from './styles';

import { FONT_FAMILY } from '../../../services/constants';

class ActivityHistory extends Component {
  constructor() {
    super();

    this.state = {
      historyData: [
      {
        day: 'Today',
          data: [
            {
              id: 1,
              status: 'Delivered',
              name: 'Buffalo Cauliflower x2',
              info: 'Extra buffalo sauce, hold the carrots'
            },
            {
              id: 2,
              status: 'Delivered',
              name: 'Mac n’ Cheese x1',
              info: 'Split in two bowls'
            },
            {
              id: 3,
              status: 'Delivered',
              name: 'BBQ Pinapple x2',
              info: ''
            },
            {
              id: 4,
              status: 'Delivered',
              name: 'Mole Bowl x1',
              info: ''
            }
          ],

          subTotal: 33,
          tax: 2.43
      },

      {
        day: 'FEB 4',
          data: [
            {
              id: 1,
              status: 'Delivered',
              name: 'Buffalo Cauliflower x2',
              info: 'Extra buffalo sauce, hold the carrots'
            },
            {
              id: 2,
              status: 'Delivered',
              name: 'Mac n’ Cheese x1',
              info: 'Split in two bowls'
            },
            {
              id: 3,
              status: 'Delivered',
              name: 'BBQ Pinapple x2',
              info: ''
            },
            {
              id: 4,
              status: 'Delivered',
              name: 'Mole Bowl x1',
              info: ''
            }
          ],

          subTotal: 33,
          tax: 2.43
        },

        {
          day: 'FEB 3',
          data: [{
              id: 1,
              status: 'Delivered',
              name: 'Buffalo Cauliflower x2',
              info: 'Extra buffalo sauce, hold the carrots'
            },
            {
              id: 2,
              status: 'Delivered',
              name: 'Mac n’ Cheese x1',
              info: 'Split in two bowls'
            },
            {
              id: 3,
              status: 'Delivered',
              name: 'BBQ Pinapple x2',
              info: ''
            },
            {
              id: 4,
              status: 'Delivered',
              name: 'Mole Bowl x1',
              info: ''
            }
          ],

          subTotal: 33,
          tax: 2.43
        },

        {
          day: 'FEB 2',
          data: [{
              id: 1,
              status: 'Delivered',
              name: 'Buffalo Cauliflower x2',
              info: 'Extra buffalo sauce, hold the carrots'
            },
            {
              id: 2,
              status: 'Delivered',
              name: 'Mac n’ Cheese x1',
              info: 'Split in two bowls'
            },
            {
              id: 3,
              status: 'Delivered',
              name: 'BBQ Pinapple x2',
              info: ''
            },
            {
              id: 4,
              status: 'Delivered',
              name: 'Mole Bowl x1',
              info: ''
            }
          ],

          subTotal: 33,
          tax: 2.43
        }
      ]
    }
  }

  render() {
    return (
      <Container style={styles.container}>
        <Tabs
          renderTabBar={() => (
            <ScrollableTab
              style={{ backgroundColor: 'transparent', borderWidth: 0 }}
            />
          )}
          tabBarUnderlineStyle={{ backgroundColor: 'transparent' }}
        >
          {(() => {
            return (
              this.state.historyData &&
              this.state.historyData.map(item => {
                return (
                  <Tab
                    key={item.day}
                    tabStyle={styles.tabStyle}
                    activeTabStyle={styles.tabStyle}
                    textStyle={styles.tabTextStyle}
                    activeTextStyle={styles.activeTabTextStyle}
                    style={styles.tabViewStyle}
                    heading={item.day}
                  >
                    <ActivityHistoryTab item={item}/>
                  </Tab>
                );
              }
            ));
          })()}
        </Tabs>

        <View>
          <Button
            style={buttonStyles.submitReviewBtnStyle}
            textStyle={buttonStyles.submitReviewBtnTextStyle}
            onPress={() => null}
          >
            Submit Review
          </Button>
        </View>
      </Container>
    );
  }
}

const buttonStyles = {
  submitReviewBtnStyle: {
    backgroundColor: '#2ED573',
    borderColor: '#0DD24A',
    width: '100%',
    height: hp('4.92%'),
    justifyContent: 'center',
    borderRadius: 0
  },

  submitReviewBtnTextStyle: {
    fontSize: wp('3.46%'),
    fontFamily: FONT_FAMILY,
    color: 'white',
    paddingTop: 0,
    paddingBottom: 0,
    justifyContent: 'center'
  }
};

export default ActivityHistory;
