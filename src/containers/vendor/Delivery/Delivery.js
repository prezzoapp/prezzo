// @flow
import React, { Component } from 'react';
import { View, FlatList, Alert, Image } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import TableScreenHeader from '../TableScreenHeader';
import OpenTableItem from '../../../components/OpenTableItem';
import QueuedTableItem from '../../../components/QueuedTableItem';
import TableListHeader from '../../../components/TableListHeader';
import TableGridItem from '../../../components/TableGridItem';
import ClosedTableTabs from '../../../components/ClosedTableTabs';
import { ACCEPT_ORDER, DELETE_ORDER } from '../../../services/constants';

class Delivery extends Component {
  static navigationOptions = {
    title: null,
    header: null
  };

  static displayName = 'Delivery';

  static propTypes = {
    navigate: PropTypes.func.isRequired,
    changeSection: PropTypes.func.isRequired
  };

  componentDidMount() {
    if (this.props.section === 0) {
      this.props.listOpenTable();
    } else if (this.props.section === 1) {
      this.props.listQueuedTable();
    } else {
      this.props.listDeliveredTable();
    }
  }

  onSectionChange = index => {
    if (index === 0) {
      this.props.listOpenTable();
    } else if (index === 1) {
      this.props.listQueuedTable();
    } else {
      this.props.listDeliveredTable();
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
      return this.renderOpenTable();
    } else if (this.props.section === 1) {
      return this.renderQueueTable();
    }
    return this.renderClosedTable();
  };

  renderOpenTable() {
    return (
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        data={
          this.props.openTableList.constructor.name === 'Array'
            ? Array.from(this.props.openTableList)
            : []
        }
        renderItem={rowData => {
          if (this.props.layout === 'list') {
            return (
              <OpenTableItem
                data={rowData}
                navigate={this.props.navigate}
                tabName="delivery"
              />
            );
          }
          return (
            <TableGridItem tableType={this.props.section} data={rowData} />
          );
        }}
      />
    );
  }

  renderQueueTable() {
    return (
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        data={
          this.props.queuedTableList.constructor.name === 'Array'
            ? Array.from(this.props.queuedTableList)
            : []
        }
        renderItem={rowData => {
          if (this.props.layout === 'list') {
            return (
              <QueuedTableItem
                handleQueuedTableItem={this.handleQueuedTableItem}
                user={rowData}
                tabName="delivery"
              />
            );
          }
          return (
            <TableGridItem
              tableType={this.props.section}
              handleQueuedTableItem={this.handleQueuedTableItem}
              data={rowData}
            />
          );
        }}
      />
    );
  }

  renderClosedTable() {
    return (
      <View style={{ flex: 1 }}>
        <ClosedTableTabs
          currentTab={this.props.deliveredTableSection}
          tabNames={['24 Hours', '3 Days', '1 Week']}
          onListTypeSelection={index => this.props.changeClosedSection(index)}
        />
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          data={
            this.props.openTableList.constructor.name === 'Array'
              ? Array.from(this.props.deliveredTableList)
              : []
          }
          renderItem={rowData => {
            if (this.props.layout === 'list') {
              return <OpenTableItem data={rowData} tabName="delivery"/>;
            }
            return (
              <TableGridItem tableType={this.props.section} data={rowData} />
            );
          }}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <TableScreenHeader
          vendorData={this.props.vendorData}
          tableSection={this.props.section}
          tabName="delivery"
        />
        <View style={styles.innerContainer}>
          <TableListHeader
            currentTab={this.props.section}
            currentLayout={this.props.layout}
            tabNames={['Open', 'Queue', 'Delivered']}
            onChangeLayout={layout => this.props.changeLayout(layout)}
            onListTypeSelection={index => this.onSectionChange(index)}
          />
          {this.renderSection()}
        </View>
      </View>
    );
  }
}

export default Delivery;
