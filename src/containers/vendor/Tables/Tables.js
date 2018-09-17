// @flow
import React, { Component } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';
import TableScreenHeader from '../TableScreenHeader';
import { MaterialIcons } from '../../../components/VectorIcons';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import OpenTableItem from '../../../components/OpenTableItem';
import QueuedTableItem from '../../../components/QueuedTableItem';
import TableListHeader from '../../../components/TableListHeader';
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
  componentDidMount() {
    this.props.listOpenTable();

  }
  changeTabHandler = (index) => {
    if (index == 1) {
      this.props.listQueuedTable();
    }
  }
  handleQueuedTableItem = (tableId, index, actionType) => {

    Alert.alert(
      actionType === ACCEPT_ORDER ? 'Accept' : 'Delete',
      `${this.props.queuedTableList[index].userName} \n Table ${this.props.queuedTableList[index].tableId}`,
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'OK', onPress: () => this.handleConfirm(tableId, actionType) },
      ],
      { cancelable: false }
    );

  }
  handleConfirm = (tableId, actioType) => {
    if (actioType === ACCEPT_ORDER) {
      this.props.acceptQueuedRequest(this.props.queuedTableList, tableId);
    }
    else if (actioType === DELETE_ORDER) {
      this.props.deleteQueuedRequest(this.props.queuedTableList, tableId);
    }
  }

  renderSection = () => {
    console.log(JSON.stringify(this.props));
    
    if (this.props.section === 0) {
      return (
        <FlatList
          data={this.props.openTableList}
          renderItem={(rowData) => {
            return (
              <OpenTableItem
                user={rowData}
              />
            );
          }}
        />
      );
    } else if (this.props.section === 1) {
      return (
        <FlatList
              data={this.props.queuedTableList}
              renderItem={(rowData) => {
                return (
                  <QueuedTableItem
                    handleQueuedTableItem={this.handleQueuedTableItem}
                    user={rowData}
                  />
                );
              }}
            />
      );
    }else{
      return null
    }
  }

  onSectionChange = (index) => {
    if(index === 1) {
      this.props.listQueuedTable()
    }

    this.props.changeSection(index);
  }

  render() {
    return (
      <View style={styles.container}>
        <TableScreenHeader />
        <View style={{ marginTop: 145, marginHorizontal: 16 }}>
        <TableListHeader onListTypeSelection={(index) => this.onSectionChange(index)} />
        {this.renderSection()}
        </View>
      </View>
    );
  }
}

export default Tables;
