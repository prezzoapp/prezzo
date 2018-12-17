// @flow
import React, { Component } from 'react';
import { View, FlatList, Text, ActivityIndicator } from 'react-native';
import { BlurView } from 'expo';
import PropTypes from 'prop-types';
import SearchVendorListItem from '../../../components/SearchVendorListItem';
import ExploreSearchInput from '../../../components/ExploreSearchInput';
import styles from './styles';
import { get } from '../../../utils/api';

class VendorSearch extends Component {
  constructor() {
    super();
    this.state = { showList: false, filteredData: [], showLoader: false };
    this.timeOutVar = -1;
  }

  onTextChange(text) {
    if(this.state.showLoader === false) {
      this.setState(() => {
        return {
          showLoader: true
        }
      });
    }
    this.clearTimer();
    this.timeOutVar = setTimeout(() => {
      this.callWebService(text);
    }, 2000);
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
    } catch (e) {
      console.log(e.message);
    }
  }

  showList(value) {
    this.setState(() => {
      return {
        showList: value
      }
    });
  }

  renderSeparator = () => <View style={styles.listSeparator} />;

  render() {
    console.log('Vendor Search component.');
    return (
      <View
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          left: 0,
          bottom: this.state.showList ? 0 : null
        }}
      >
        {this.state.showList &&
          <View style={styles.container}>
            <BlurView style={styles.container} tint="dark" intensity={95} />
            <View style={styles.listHolder}>
              {(() => {
                if(this.state.showLoader) {
                  return (
                    <View style={styles.loaderView}>
                      <ActivityIndicator size="large" color="white" />
                    </View>
                  );
                } else if(this.state.filteredData.length !== 0) {
                  return (
                    <FlatList
                      keyExtractor={item => item._id}
                      data={this.state.filteredData}
                      ItemSeparatorComponent={() => this.renderSeparator()}
                      renderItem={({ item }) => (
                        <SearchVendorListItem
                          item={item}
                          navigate={this.props.navigate}
                        />
                      )}
                    />
                  );
                }
                return (
                  <View style={styles.loaderView}>
                    <Text style={styles.message}>No restaurant found.</Text>
                  </View>
                );
              })()}
            </View>
          </View>
        }
        <ExploreSearchInput
          showList={value => this.showList(value)}
          showListValue={this.state.showList}
          onTextChange={text => this.onTextChange(text)}
          clearTimer={() => this.clearTimer()}
        />
      </View>
    );
  }
}

VendorSearch.propTypes = {
  navigate: PropTypes.func.isRequired
};

export default VendorSearch;
