import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Tab, Tabs, ScrollableTab } from 'native-base';
import OpenOrdersList from '../OpenOrdersList';
import OpenTablePayment from '../OpenTablePayment';
import styles from './styles';

export default class OpenTableDetails extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.userName,
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#1F1F1F',
        borderBottomColor: 'transparent'
      }
    }
  };

  static displayName = 'OpenTableDetails';

  constructor() {
    super();
  }

  render() {
    return (
      <Container style={styles.container}>
        <Tabs
          tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
          renderTabBar={() => (
            <ScrollableTab
              style={styles.scrollableTabStyle}
              tabsContainerStyle={styles.tabsContainerStyle}
            />
          )}
        >
          <Tab
            heading="Order"
            tabStyle={styles.orderTabStyle}
            activeTabStyle={styles.orderTabStyle}
            textStyle={styles.orderTabTextStyle}
            activeTextStyle={styles.orderTabTextStyle}
            style={styles.tabStyle}
          >
            <OpenOrdersList />
          </Tab>
          <Tab
            heading="Payment"
            tabStyle={styles.paymentTabStyle}
            activeTabStyle={styles.paymentTabStyle}
            textStyle={styles.paymentTabTextStyle}
            activeTextStyle={styles.paymentTabTextStyle}
            style={styles.tabStyle}
          >
            <OpenTablePayment />
          </Tab>
        </Tabs>
      </Container>
    )
  }
}
