// @flow
import React, { Component } from 'react';
import { View, FlatList, Alert, Modal } from 'react-native';
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
import { get } from '../../../utils/api';

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
  }

  componentDidMount() {
    if (this.props.section === 0) {
      this.props.listOpenTable(this.props.vendorData.get('_id'));
    } else if (this.props.section === 1) {
      this.props.listQueuedTable(this.props.vendorData.get('_id'));
    } else {
      this.props.listClosedTable(this.props.vendorData.get('_id'));
    }
  }

  async checkAndChangeQueueOrderStatus(orderId, status) {
    this.props.checkQueueOrderStatus(orderId, status);
    // try {
    //   const response = await get(`v1/order/${orderId}`);
    //   if(response.order[0].status === 'active') {
    //     Alert.alert('', 'This item has been already activated!');
    //   } else if(response.order[0].status === 'denied') {
    //     Alert.alert('', 'This item has been already denied!');
    //   } else if(response.order[0].status === 'complete') {
    //     Alert.alert('', 'This item has been already completed!');
    //   } else {
    //     this.props.changeOrderStatus(orderId, status);
    //   }
    // } catch(e) {
    //   console.log(e);
    // }
  }

  onSectionChange = index => {
    if (index === 0) {
      this.props.listOpenTable(this.props.vendorData.get('_id'));
    } else if (index === 1) {
      this.props.listQueuedTable(this.props.vendorData.get('_id'));
    } else {
      this.props.listClosedTable(this.props.vendorData.get('_id'));
    }

    this.props.changeSection(index);
  };

  changeTabHandler = index => {
    if (index === 1) {
      this.props.listQueuedTable();
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
      <View style={{ flex: 1 }}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatListStyle}
          data={this.props.openTableList.length !== 0 ? this.props.openTableList.toJS() : []}
          renderItem={rowData => {
            if (this.props.layout === 'list') {
              return (
                <OpenTableItem
                  data={rowData}
                  navigate={this.props.navigate}
                  tabName="tables"
                  makePaymentAndCompleteOrder={(orderId, token, amount, paymentType, status) => this.props.makePaymentAndCompleteOrder(orderId, token, amount, paymentType, status, 'queued')}
                  changeOrderStatus={(orderId, status) => this.props.changeOrderStatus(orderId, status)}
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
          data={this.props.queuedTableList.length !== 0 ? this.props.queuedTableList.toJS() : []}
          renderItem={rowData => {
            if (this.props.layout === 'list') {
              return (
                <QueuedTableItem
                  handleQueuedTableItem={this.handleQueuedTableItem}
                  user={rowData}
                  tabName="tables"
                  checkAndChangeQueueOrderStatus={(orderId, status) => this.checkAndChangeQueueOrderStatus(orderId, status)}
                  // changeOrderStatus={(orderId, status) => this.props.changeOrderStatus(orderId, status, 'queued')}
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
        {/*<ClosedTableTabs
          currentTab={this.props.closedTableSection}
          tabNames={['24 Hours', '3 Days', '1 Week']}
          onListTypeSelection={index => this.props.changeClosedSection(index)}
        />*/}
        <View style={{ flex: 1 }}>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.flatListStyle}
            data={this.props.closedTableList.length !== 0 ? this.props.closedTableList.toJS() : []}
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

        {/*<Modal
          animationType="none"
          transparent
          visible={this.props.isBusy}
        >
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.8)' }} />
        </Modal>*/}
      </View>
    );
  }
}

export default Tables;
