// @flow
import React, { Component } from 'react';
import { View, FlatList, Alert } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import TableScreenHeader from '../TableScreenHeader';
import { MaterialIcons } from '../../../components/VectorIcons';
import OpenTableItem from '../../../components/OpenTableItem';
import QueuedTableItem from '../../../components/QueuedTableItem';
import TableListHeader from '../../../components/TableListHeader';
import OpenTableGridItem from '../../../components/OpenTableGridItem';
import { ACCEPT_ORDER, DELETE_ORDER } from '../../../services/constants';

class Tables extends Component {
  static displayName = 'Tables';

  static navigationOptions = {
    title: 'Tables',
    tabBarIcon: props => (
      <MaterialIcons name="book" size={24} color={props.tintColor} />
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

  componentDidMount() {
    if (this.props.section === 0){
      this.props.listOpenTable();
    } else if (this.props.section === 1) {
      this.props.listQueuedTable();
    }
  }

  onSectionChange = index => {
    if (index === 1) {
      this.props.listQueuedTable();
    }

    this.props.changeSection(index);
  };

  handleQueuedTableItem = (tableId, index, actionType) => {
    Alert.alert(
      actionType === ACCEPT_ORDER ? 'Accept' : 'Delete',
      `${this.props.queuedTableList[index].userName} \n Table ${
      this.props.queuedTableList[index].tableId
      }`,
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
      this.props.listQueuedTable();
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
      if (this.props.layout === 'list') {
        return (
          <FlatList
            data={
              this.props.openTableList.constructor.name === 'Array'
                ? Array.from(this.props.openTableList)
                : []
            }
            renderItem={rowData => <OpenTableItem user={rowData} />}
          />
        );
      }
      return (
        <FlatList
          data={
            this.props.openTableList.constructor.name === 'Array' ? Array.from(this.props.openTableList) : []
          }
          renderItem={rowData => <OpenTableGridItem data={rowData} />}
        />
      );
    } else if (this.props.section === 1) {
      return (
        <FlatList
          data={this.props.queuedTableList.constructor.name === 'Array' ? this.props.queuedTableList : []}
          renderItem={rowData => (
            <QueuedTableItem
              handleQueuedTableItem={this.handleQueuedTableItem}
              user={rowData}
            />
          )}
        />
      );
    }
    return <View style={{ flex: 1 }} />;
  };

  render() {
    return (
      <View style={styles.container}>
        <TableScreenHeader />
        <View style={{ marginTop: 145, marginHorizontal: 16 }}>
          <TableListHeader
            currentTab={this.props.section}
            currentLayout={this.props.layout}
            onChangeLayout={layout => this.props.changeLayout(layout)}
            onListTypeSelection={index => this.onSectionChange(index)}
          />
          {this.renderSection()}
        </View>
      </View>
    );
  }
}

export default Tables;
