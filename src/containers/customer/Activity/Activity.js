// import React, { Component } from 'react';
// import { View } from 'react-native';
// import ActivityOpenOrder from '../ActivityOpenOrder';
// import ActivityHistory from '../ActivityHistory';
//
// import styles from './styles';
//
// class Activity extends Component {
//   static navigationOptions = {
//     title: 'Activity',
//     headerTintColor: 'white',
//     headerStyle: {
//       position: 'absolute',
//       backgroundColor: 'transparent',
//       zIndex: 100,
//       top: 0,
//       left: 0,
//       right: 0
//     }
//   };
//
//   static displayName = 'Activity';
//
//   constructor() {
//     super();
//   }
//
//   render() {
//     return (
//       <View style={styles.container}>
//         {/*<ActivityOpenOrder />*/}
//         <ActivityHistory />
//       </View>
//     );
//   }
// }
//
// export default Activity;

import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Tab, Tabs, ScrollableTab } from 'native-base';
import ActivityOpenOrder from '../ActivityOpenOrder';
import ActivityHistory from '../ActivityHistory';
import { COLOR_GREEN } from '../../../services/constants';

import styles from './styles';

class Activity extends Component {
  static navigationOptions = {
    title: 'Activity',
    headerTintColor: 'white',
    headerStyle: {
      position: 'absolute',
      backgroundColor: 'transparent',
      zIndex: 100,
      top: 0,
      left: 0,
      right: 0,
      borderBottomColor: 'transparent'
    }
  };

  static displayName = 'Activity';

  render() {
    return (
      <Container style={styles.container}>
        <View style={styles.absoluteView} />
        <Tabs
          tabBarUnderlineStyle={{ backgroundColor: COLOR_GREEN }}
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
          <Tab
            heading="History"
            tabStyle={styles.historyTabStyle}
            activeTabStyle={styles.historyTabStyle}
            textStyle={styles.historyTabTextStyle}
            activeTextStyle={styles.historyTabTextStyle}
            style={styles.tabStyle}
          >
            <ActivityHistory />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default Activity;
