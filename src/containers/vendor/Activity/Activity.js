// @flow
import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import TableScreenHeader from '../TableScreenHeader';
import OpenTableItem from '../../../components/OpenTableItem';
import QueuedTableItem from '../../../components/QueuedTableItem';
import TableListHeader from '../../../components/TableListHeader';
import { ACCEPT_ORDER, DELETE_ORDER } from '../../../services/constants';

class Activity extends Component {
  static navigationOptions = {
    title: null,
    header: null
  };

  static displayName = 'Activity';

  static propTypes = {
    navigate: PropTypes.func.isRequired,
    changeSection: PropTypes.func.isRequired
  };

  componentDidMount() {
    if (this.props.section === 0) {
      this.props.listWaiterRequestTable();
    } else {
      this.props.listPhotoReviewTable();
    }
  }

  onSectionChange = index => {
    if (index === 0) {
      this.props.listWaiterRequestTable();
    } else {
      this.props.listPhotoReviewTable();
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
      this.props.listPhotoReviewTable();
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
      return this.renderWaiterRequestTable();
    }
    return this.renderPhotoReviewTable();
  };

  renderWaiterRequestTable() {
    return (
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListStyle}
        data={
          this.props.openTableList.constructor.name === 'Array'
            ? Array.from(this.props.openTableList)
            : []
        }
        renderItem={rowData =>
          <OpenTableItem
            data={rowData}
            navigate={this.props.navigate}
            tabName="activity"
          />
        }
      />
    );
  }

  renderPhotoReviewTable() {
    return (
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListStyle}
        data={
          this.props.queuedTableList.constructor.name === 'Array'
            ? Array.from(this.props.queuedTableList)
            : []
        }
        renderItem={rowData =>
          <OpenTableItem
            data={rowData}
            tabName="activity"
            innerTabName="photoReview"
          />
        }
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <TableScreenHeader
          vendorData={this.props.vendorData}
          tableSection={this.props.section}
          tabName="activity"
        />
        <View style={styles.innerContainer}>
          <TableListHeader
            currentTab={this.props.section}
            screenName="activity"
            currentLayout={this.props.layout}
            tabNames={['Waiter Request', 'Photo Review']}
            onChangeLayout={layout => this.props.changeLayout(layout)}
            onListTypeSelection={index => this.onSectionChange(index)}
          />
          {this.renderSection()}
        </View>
      </View>
    );
  }
}

export default Activity;
