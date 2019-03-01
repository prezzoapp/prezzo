// @flow
import React, { Component } from 'react';
import { View, FlatList, Alert, Modal, ActivityIndicator, AsyncStorage, Text, NetInfo } from 'react-native';
import PropTypes from 'prop-types';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo';
import styles from './styles';
import TableScreenHeader from '../TableScreenHeader';
import ExploreSearchInput from '../../../components/ExploreSearchInput';
import VendorSearch from '../VendorSearch';
import OpenTableItem from '../../../components/OpenTableItem';
import QueuedTableItem from '../../../components/QueuedTableItem';
import TableListHeader from '../../../components/TableListHeader';
import TableGridItem from '../../../components/TableGridItem';
import ClosedTableTabs from '../../../components/ClosedTableTabs';
import {
  ACCEPT_ORDER,
  DELETE_ORDER,
  TIME_OUT
} from '../../../services/constants';
import { get } from '../../../utils/api';
import { showAlertWithMessage } from '../../../services/commonFunctions';
import LoadingComponent from '../../../components/LoadingComponent';

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
     isFetching: false,
     showList: false,
     filteredData: [],
     showLoader: false
    }

    this.timeOutVar = -1;
  }

  componentDidMount() {
    if(this.props.vendorData) {
      this.getData(this.props.section);
    }
  }

  checkResponseMessage(){
    AsyncStorage.getItem('response_code').then((code) => {
    if(code !== '200') {
      AsyncStorage.getItem('response_message').then((msg) => {
        //console.log("response message is -----------------",msg);
        // Alert.alert(
        //  'Prezzo',
        //   msg,
        //   [
        //     {text: 'OK', onPress: () => console.log('OK Pressed')},
        //   ],
        //   { cancelable: false }
        // )
      });
    }
    });
  }

  checkAndChangeQueueOrderStatus(orderId, status) {
    this.props.checkQueueOrderStatus(orderId).then(() => {
      if(this.props.openOrderFinalStatus === 'active') {
        showAlertWithMessage('Info', {
          message: 'Order has been already activated.'
        });
      } else if(this.props.openOrderFinalStatus === 'denied') {
        showAlertWithMessage('Info', {
          message: 'Order has been already denied.'
        });
      } else if(this.props.openOrderFinalStatus === 'complete') {
        showAlertWithMessage('Info', {
          message: 'Order has been already completed.'
        });
      } else {
        this.props.changeOrderStatus(orderId, status)
        .then(() => {
          if(this.props.openOrderFinalStatus === 'active') {
            showAlertWithMessage('Success', {
              message: 'Order has been activated.'
            });
          } else if(this.props.openOrderFinalStatus === 'denied') {
            showAlertWithMessage('Info', {
              message: 'Order has been denied.'
            });
          }
        }).catch(err => {
          showAlertWithMessage('Uh-oh!', err);
        });
      }
    }).catch(err => {
      showAlertWithMessage('Uh-oh!', err);
    });
  }

  onSectionChange = index => {
    this.props.changeSection(index).then(() => {
      this.getData(index);
    });
  };

  renderSection = () => {
    if (this.props.section === 0) {
      return this.renderOpenTable();
    } else if (this.props.section === 1) {
      return this.renderQueueTable();
    }
    return this.renderClosedTable();
  };

  listEmptyComponent() {
    return (
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.message}>No items found!</Text>
      </View>
    );
  }

  renderOpenTable() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={this.listEmptyComponent}
          ItemSeparatorComponent={() => {
            if(this.props.layout !== 'list') {
              return (
                <View style={styles.gridSeparator}/>
              );
            }
            return (
              <View style={styles.separator}/>
            );
          }}
          onRefresh={() => this.onRefresh()}
          refreshing={this.state.isFetching}
          contentContainerStyle={[styles.flatListStyle, { justifyContent: (this.props.openTableList.size === 0) ? 'center' : null }]}
          data={this.props.openTableList.length !== 0 ? this.props.openTableList.toJS() : []}
          renderItem={rowData => {
            if (this.props.layout === 'list') {
              return (
                <OpenTableItem
                  data={rowData}
                  navigate={this.props.navigate}
                  tabName="tables"
                  innerTab="open"
                  makePaymentAndCompleteOrder={(orderId, token, amount, paymentType, status) => this.props.makePaymentAndCompleteOrder(orderId, token, amount, paymentType, status, 'queued')}
                  changeOrderStatus={(orderId, status) => this.props.changeOrderStatus(orderId, status)}
                />
              );
            }
            return (
              <TableGridItem
                tableType={this.props.section}
                navigate={this.props.navigate}
                data={rowData}
                tabName="tables"
                innerTab="open"
              />
            );
          }}
        />
      </View>
    );
  }

  renderQueueTable() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={this.listEmptyComponent}
          ItemSeparatorComponent={() => {
            if(this.props.layout !== 'list') {
              return (
                <View style={styles.gridSeparator}/>
              );
            }
            return (
              <View style={styles.separator}/>
            );
          }}
          onRefresh={() => this.onRefresh()}
          refreshing={this.state.isFetching}
          contentContainerStyle={[styles.flatListStyle, { justifyContent: (this.props.queuedTableList.size === 0) ? 'center' : null }]}
          data={this.props.queuedTableList.size !== 0 ? this.props.queuedTableList.toJS() : []}
          renderItem={rowData => {
            if (this.props.layout === 'list') {
              return (
                <QueuedTableItem
                  handleQueuedTableItem={this.handleQueuedTableItem}
                  navigate={this.props.navigate}
                  data={rowData}
                  tabName="tables"
                  innerTab="queue"
                  checkAndChangeQueueOrderStatus={(orderId, status) => this.checkAndChangeQueueOrderStatus(orderId, status)}
                  listQueuedTable={this.props.listQueuedTable}
                />
              );
            }
            return (
              <TableGridItem
                tableType={this.props.section}
                navigate={this.props.navigate}
                handleQueuedTableItem={this.handleQueuedTableItem}
                data={rowData}
                checkAndChangeQueueOrderStatus={(orderId, status) => this.checkAndChangeQueueOrderStatus(orderId, status)}
                listQueuedTable={this.props.listQueuedTable}
                innerTab="closed"
                tabName="tables"
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
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={this.listEmptyComponent}
          ItemSeparatorComponent={() => {
            if(this.props.layout !== 'list') {
              return (
                <View style={styles.gridSeparator}/>
              );
            }
            return (
              <View style={styles.separator}/>
            );
          }}
          onRefresh={() => this.onRefresh()}
          refreshing={this.state.isFetching}
          contentContainerStyle={[styles.flatListStyle, { justifyContent: (this.props.closedTableList.size === 0) ? 'center' : null }]}
          data={this.props.closedTableList.length !== 0 ? this.props.closedTableList.toJS() : []}
          renderItem={rowData => {
            if (this.props.layout === 'list') {
              return (
                <OpenTableItem
                  data={rowData}
                  navigate={this.props.navigate}
                  tabName="tables"
                  innerTab="closed"
                />
              );
            }
            return (
              <TableGridItem
                tableType={this.props.section}
                navigate={this.props.navigate}
                data={rowData}
                innerTab="closed"
                tabName="tables"
              />
            );
          }}
        />
      </View>
    );
  }

  onRefresh() {
    this.getData();
  }

  getData(sectionIndex = null) {
    if ((sectionIndex ? sectionIndex : this.props.section) === 0) {
      this.props.listOpenTable(this.props.vendorData.get('_id')).then(() => {
          this.checkResponseMessage();
        })
        .catch(e => {
          showAlertWithMessage('Uh-oh!', e);
        });
    } else if ((sectionIndex ? sectionIndex : this.props.section) === 1) {
      this.props.listQueuedTable(this.props.vendorData.get('_id')).then(() => {
          this.checkResponseMessage();
        })
        .catch(e => {
          showAlertWithMessage('Uh-oh!', e);
        });
    } else {
      this.props.listClosedTable(this.props.vendorData.get('_id')).then(() => {
          this.checkResponseMessage();
        })
        .catch(e => {
          showAlertWithMessage('Uh-oh!', e);
        });
    }

    if(this.state.isFetching) {
      this.setState({ isFetching: false });
    }
  }

  onTextChange(text) {
    if(this.state.showLoader === false) {
      this.setState(() => {
        return {
          showLoader: true
        }
      });
    }
    if(text !== '') {
      this.clearTimer();
      this.timeOutVar = setTimeout(() => {
        this.callWebService(text);
      }, 2000);
    }
  }

  clearTimer() {
    clearTimeout(this.timeOutVar);
    this.timeOutVar = -1;
  }

  async callWebService(text) {
    try {
      await get(`/v1/vendors?name=${text}`).then(response => {
        this.setState(() => {
          return {
            filteredData: response,
            showLoader: false
          }
        });
      });
    } catch (err) {
      if(err.message === NETWORK_REQUEST_FAILED) {
        showAlertWithMessage('Uh-oh!', INTERNET_NOT_CONNECTED, TIME_OUT);
      } else {
        showAlertWithMessage('Uh-oh!', err.message, TIME_OUT);
      }
    }
  }

  showList(value) {
    console.log("Show List function Called!");
    this.setState(() => {
      return {
        showList: value
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {(() => {
          if(this.props.vendorData) {
            return (
              <LinearGradient
                testID="linearGradient"
                colors={['rgb(0,0,0)', 'transparent', 'transparent', 'transparent', 'transparent']}
                locations={[0.1, 0.4, 0.4, 0.4, 0.4]}
                style={{ flex: 1 }}
              >
                <View style={{ flex: 1 }}>
                  <ExploreSearchInput
                    showList={value => this.showList(value)}
                    showListValue={this.state.showList}
                    onTextChange={text => this.onTextChange(text)}
                    clearTimer={() => this.clearTimer()}
                  />
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

                  {this.state.showList &&
                    <VendorSearch
                      showLoader={this.state.showLoader}
                      filteredData={this.state.filteredData}
                    />
                  }
                </View>
              </LinearGradient>
            )
          }
          return (
            <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.message}>Vendor Account not Found!</Text>
            </View>
          );
        })()}
        <LoadingComponent visible={this.props.isBusy} />
      </View>
    );
  }
}

export default Tables;
