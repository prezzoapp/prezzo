// @flow
import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';
import TableScreenHeader from '../TableScreenHeader';
import { MaterialIcons } from '@expo/vector-icons';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import OpenTableItem from '../../../components/OpenTableItem';
import QueuedTableItem from '../../../components/QueuedTableItem';

class Tables extends Component {
  static displayName = 'Tables';

  static navigationOptions = {
    title: 'Tables',
    tabBarIcon: props => (
      <MaterialIcons name='book' size={24} color={props.tintColor} />
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

  static propTypes = {
    navigate: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {
      data: {

      }
    }
  }
  componentDidMount(){
      this.props.listOpenTable();
      
  }
  changeTabHandler = (index)=>{
    if(index==1)
    {
      this.props.listQueuedTable();
    }
  }
  

  render() {
    return (
      <View style={styles.container}>
        <TableScreenHeader />
        <ScrollableTabView
          style={{ marginTop: 145, marginHorizontal: 16 }}
          initialPage={0}
          tabBarUnderlineStyle={styles.tabBarUnderLineStyle}
          tabBarActiveTextColor={'#fff'}
          tabBarInactiveTextColor={'#D8D8D8'}
          tabBarTextStyle={styles.tabBarTextStyle}
          renderTabBar={() => <DefaultTabBar />}
          onChangeTab={({ i, ref }) =>this.changeTabHandler(i)}
        >
          <View tabLabel="Open">
            <FlatList
              data={this.props.openTableList}
              renderItem={() => {
                return (
                  <OpenTableItem />
                );
              }}
            />
          </View>
          <View tabLabel="Queue">
            <FlatList
              data={this.props.queuedTableList}
              renderItem={() => {
                return (
                  <QueuedTableItem 
                  acceptQueuedRequest={this.props.acceptQueuedRequest('1')}
                  />
                );
              }}
            />
          </View>
          <View tabLabel="Delivered"></View>
        </ScrollableTabView>
      </View>
    );
  }
}

export default Tables;
