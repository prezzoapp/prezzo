import React, { Component } from 'react';
import { View, FlatList, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Feather } from '../VectorIcons';
import Button from '../Button';

import styles from './styles';

class FilteredVendorBottomCard extends Component {
  constructor() {
    super();

    this.state = { showVendorInfo: false, item: {} };

    this.callMethod = this.callMethod.bind(this);
  }

  callMethod(item) {
    if(!this.state.showVendorInfo) {
      this.setState(() => {
        return {
          item,
          showVendorInfo: true
        }
      });
    }
  }

  renderSeparator = () => <View style={styles.separator} />;

  render() {
    return (
      <View style={styles.filteredRestaurantsBottomCardHolder}>
        {!this.state.showVendorInfo ? (
          <FlatList
            contentContainerStyle={{
              paddingVertical: 5,
              paddingHorizontal: 15
            }}
            keyExtractor={item => item._id}
            data={this.props.data}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={this.renderSeparator}
            renderItem={({ item }) =>
              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.listItemBtn}
                onPress={() =>
                  this.props.moveToPosition([...item.location.coordinates])
                }
              >
                <View style={styles.titleHolder}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.distance}>{item.distance} miles</Text>
                </View>

                <View style={styles.statusHolder}>
                  <Image
                    source={require("../../../assets/images/open_restaurant_status.png")}
                    style={styles.statusImage}
                  />
                  <Text style={styles.status}>{item.status}</Text>
                </View>
              </TouchableOpacity>
            }
          />
        ) : (
          <View style={styles.vendorInfoHolder}>
            <View style={styles.contentHolder}>
              <View style={styles.vendorIconHolder}>
                <Image
                  source={{ uri: this.state.item.avatarURL }}
                  style={styles.vendorIcon}
                />
              </View>
              <View style={styles.vendorContentHolder}>
                <Text numberOfLines={1} style={styles.vendorName}>
                  {this.state.item.name}
                </Text>
                <Text style={styles.vendorAddress}>
                  {this.state.item.location.city}, {this.state.item.location.region}
                </Text>
              </View>
            </View>

            <View style={styles.vendorInfoSectionSeparator} />

            <View
              style={[
                styles.contentHolder,
                { justifyContent: 'space-between' }
              ]}>
              <View style={styles.iconTextHolder}>
                <Feather name="corner-up-right" size={20} color="white" />
                <Text style={styles.milesText}>0.32 miles away</Text>
              </View>

              <Button
                style={buttonStyles.goBtn}
                textStyle={buttonStyles.goBtnText}
                onPress={() => this.callMethod(this.state.item)}
              >
                Go
              </Button>
            </View>
          </View>
        )}
      </View>
    );
  }
}

FilteredVendorBottomCard.propTypes = {
  data: PropTypes.array.isRequired
};

const buttonStyles = {
  goBtn: {
    backgroundColor: '#0DD24A',
    borderColor: '#0DD24A',
    width: 100,
    borderRadius: 8
  },
  goBtnText: {
    fontSize: 15
  }
};

export default FilteredVendorBottomCard;
