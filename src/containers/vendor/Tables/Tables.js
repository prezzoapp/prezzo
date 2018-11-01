// @flow
import React, { Component } from 'react';
import { View, FlatList, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
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
    title: null,
    header: null
  };

  static propTypes = {
    navigate: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {
      isOpenOrderFetching: false,
      isQueuedOrderFetching: false
    }
  }

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

  onRefresh(orderType) {
    if(orderType === 'open') {
      this.setState(() => {
        return {
          isOpenOrderFetching: true
        }
      }, () => {
        this.props.listOpenTable();
        this.setState(() => {
          return {
            isOpenOrderFetching: false
          }
        });
      });
    } else if(orderType === 'queue') {
        this.setState(() => {
          return {
            isQueuedOrderFetching: true
          }
        }, () => {
          this.props.listQueuedTable();
          this.setState(() => {
            return {
              isQueuedOrderFetching: false
            }
          });
        }
      );
    }
  }

  renderOpenTable() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatListStyle}
          onRefresh={() => this.onRefresh('open')}
          refreshing={this.state.isOpenOrderFetching}
          data={this.props.openTableList.length !== 0 ? this.props.openTableList.toJS() : []}
          renderItem={rowData => {
            if (this.props.layout === 'list') {
              return (
                <OpenTableItem
                  data={rowData}
                  navigate={this.props.navigate}
                  tabName="tables"
                />
              );
            }
            return (
              <TableGridItem tableType={this.props.section} data={rowData} />
            );
          }}
        />
      </View>
    );
  }

  renderQueueTable() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatListStyle}
          onRefresh={() => this.onRefresh('queue')}
          refreshing={this.state.isQueuedOrderFetching}
          data={this.props.queuedTableList.length !== 0 ? this.props.queuedTableList.toJS() : []}
          renderItem={rowData => {
            if (this.props.layout === 'list') {
              return (
                <QueuedTableItem
                  handleQueuedTableItem={this.handleQueuedTableItem}
                  user={rowData}
                  tabName="tables"
                  approveDenyOrder={(orderId, status) => this.props.approveDenyOrder(orderId, status)}
                  listQueuedTable={this.props.listQueuedTable}
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
      </View>
    );
  }

  renderClosedTable() {
    return (
      <View style={{ flex: 1 }}>
        <ClosedTableTabs
          currentTab={this.props.closedTableSection}
          tabNames={['24 Hours', '3 Days', '1 Week']}
          onListTypeSelection={index => this.props.changeClosedSection(index)}
        />
        <View style={{ flex: 1 }}>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.flatListStyle}
            data={
              this.props.closedTableList.constructor.name === 'Array'
                ? Array.from(this.props.closedTableList)
                : []
            }
            renderItem={rowData => {
              if (this.props.layout === 'list') {
                return <OpenTableItem data={rowData} tabName="tables"/>;
              }
              return (
                <TableGridItem tableType={this.props.section} data={rowData} />
              );
            }}
          />
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <TableScreenHeader
          vendorData={this.props.vendorData}
          tableSection={this.props.section}
          tabName="tables"
        />
        <View style={styles.innerContainer}>
          <TableListHeader
            currentTab={this.props.section}
            tabNames={['Open', 'Queue', 'Closed']}
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
