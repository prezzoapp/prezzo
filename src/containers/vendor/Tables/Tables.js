// @flow
import React, { Component } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';
import TableScreenHeader from '../TableScreenHeader';
import { MaterialIcons } from '@expo/vector-icons';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import OpenTableItem from '../../../components/OpenTableItem';
import QueuedTableItem from '../../../components/QueuedTableItem';
import { ACCEPT_ORDER, DELETE_ORDER } from '../../../services/constants';

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
  handleQueuedTableItem = (tableId,index,actioType)=>{
    
    Alert.alert(
      actioType ===  ACCEPT_ORDER ? 'Accept' : 'Delete',
      `${this.props.queuedTableList[index].userName} \n ${this.props.queuedTableList[index].tableId}`,
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => this.handleConfirm(tableId,actioType)},
      ],
      { cancelable: false }
    );

  }
  handleConfirm = (tableId,actioType)=>{
    if(actioType === ACCEPT_ORDER)
    { 
      this.props.acceptQueuedRequest(this.props.queuedTableList,tableId);
    }
    else if(actioType === DELETE_ORDER){
      this.props.deleteQueuedRequest(this.props.queuedTableList,tableId);
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
              renderItem={(rowData) => {
                return (
                  <OpenTableItem 
                   user = {rowData}
                  />
                );
              }}
            />
          </View>
          <View tabLabel="Queue">
            <FlatList
              data={this.props.queuedTableList}
              renderItem={(rowData) => {
               
                return (
                  <QueuedTableItem 
                    handleQueuedTableItem={this.handleQueuedTableItem}
                    user = {rowData}
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
