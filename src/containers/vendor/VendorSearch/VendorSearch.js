// @flow
import React, { Component } from 'react';
import { View, FlatList, Text, ActivityIndicator } from 'react-native';
import { BlurView } from 'expo';
import PropTypes from 'prop-types';
import SearchVendorListItem from '../../../components/SearchVendorListItem';
import styles from './styles';

const VendorSearch = props => {
  renderSeparator = () => <View style={styles.listSeparator} />;

  return (
    <View style={styles.container}>
      <BlurView style={styles.blurView} tint="dark" intensity={95} />
      <View style={styles.listHolder}>
        {(() => {
          if(props.showLoader) {
            return (
              <View style={styles.loaderView}>
                <ActivityIndicator size="large" color="white" />
              </View>
            );
          } else if(props.filteredData.length !== 0) {
            return (
              <FlatList
                keyExtractor={item => item._id}
                data={props.filteredData}
                ItemSeparatorComponent={() => this.renderSeparator()}
                renderItem={({ item }) => (
                  <SearchVendorListItem
                    item={item}
                    navigate={props.navigate}
                  />
                )}
              />
            );
          }
          return (
            <View style={styles.loaderView}>
              <Text style={styles.message}>No orders found.</Text>
            </View>
          );
        })()}
      </View>
    </View>
  );
}

VendorSearch.propTypes = {
  navigate: PropTypes.func.isRequired,
  showLoader: PropTypes.bool.isRequired,
  filteredData: PropTypes.array.isRequired
};

export default VendorSearch;
