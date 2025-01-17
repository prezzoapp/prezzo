// @flow

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Container, Tab, Tabs, ScrollableTab } from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import ActivityOpenOrder from '../ActivityOpenOrder';
import LoadingComponent from '../../../components/LoadingComponent';
// import ActivityHistory from '../ActivityHistory';

import styles from './styles';

class Activity extends Component {
  static navigationOptions = {
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#1f1f1f',
      borderBottomColor: 'transparent',
      elevation: 0
    },
    headerLeft: (
      <Text style={styles.headerText}>Activity</Text>
    )
  };

  static displayName = 'Activity';

  render() {
    return (
      <Container style={styles.container}>
        <View style={styles.absoluteView} />
        <Tabs
          locked
          scrollWithoutAnimation
          tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
          renderTabBar={() => (
            <ScrollableTab
              style={styles.scrollableTabStyle}
              tabsContainerStyle={styles.tabsContainerStyle}
            />
          )}
        >
          <Tab
            heading="Open Order"
            tabStyle={styles.openOrderTabStyle}
            activeTabStyle={styles.openOrderTabStyle}
            textStyle={styles.openOrderTabTextStyle}
            activeTextStyle={styles.openOrderTabTextStyle}
            style={styles.tabStyle}
          >
            <ActivityOpenOrder />
          </Tab>
          {/*<Tab
            heading="History"
            tabStyle={styles.historyTabStyle}
            activeTabStyle={styles.historyTabStyle}
            textStyle={styles.historyTabTextStyle}
            activeTextStyle={styles.historyTabTextStyle}
            style={styles.tabStyle}
          >
            <ActivityHistory />
          </Tab>*/}
        </Tabs>
        <LoadingComponent visible={this.props.isBusy} />
      </Container>
    );
  }
}

export default Activity;
