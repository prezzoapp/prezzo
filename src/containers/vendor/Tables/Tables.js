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

class Tables extends Component {
  static displayName = 'Tables';

  static navigationOptions = {
    title: 'Tables',
    tabBarIcon: props => (
      <Image
        style={{ height: 24, width: 24, tintColor: props.tintColor }}
        source={require('../../../../assets/images/icons/TableIcon.png')}
      />
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
    if (this.props.section === 0) {
      this.props.listOpenTable();
    } else if (this.props.section === 1) {
      this.props.listQueuedTable();
    } else {
      this.props.listClosedTable();
    }
  }

  onSectionChange = index => {
    if (index === 0) {
      this.props.listOpenTable();
    } else if (index === 1) {
      this.props.listQueuedTable();
    } else {
      this.props.listClosedTable();
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
      return this.renderOpenTable();
    } else if (this.props.section === 1) {
      return this.renderQueueTable();
    }
    return this.renderClosedTable();
  };

  renderOpenTable() {
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        data={
          this.props.openTableList.constructor.name === 'Array'
            ? Array.from(this.props.openTableList)
            : []
        }
        renderItem={rowData => {
          if (this.props.layout === 'list') {
            return <OpenTableItem data={rowData} />;
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
          currentTab={this.props.closedTableSection}
          onListTypeSelection={index => this.props.changeClosedSection(index)}
        />
        <FlatList
          showsVerticalScrollIndicator={false}
          data={
            this.props.openTableList.constructor.name === 'Array'
              ? Array.from(this.props.closedTableList)
              : []
          }
          renderItem={rowData => {
            if (this.props.layout === 'list') {
              return <OpenTableItem data={rowData} />;
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
        />
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
