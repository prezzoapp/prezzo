import React, { Component } from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import styles from './styles';

class FilteredVendorBottomCardItem extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.item.disable !== this.props.item.disable) {
      return true;
    }
    return false;
  }

  render() {
    // console.log('Item render called!');
    return (
      <TouchableOpacity
        disabled={this.props.item.disable}
        activeOpacity={0.6}
        style={styles.listItemBtn}
        onPress={() => !this.props.item.disable && this.props.moveToPosition()}
      >
        <View style={styles.titleHolder}>
          <Text style={styles.name}>{this.props.item.name}</Text>
          <Text style={styles.distance}>{this.props.item.distance} miles</Text>
        </View>

        <View style={styles.statusHolder}>
          <Image
            source={require("../../../assets/images/open_restaurant_status.png")}
            style={styles.statusImage}
          />
          <Text style={styles.status}>{this.props.item.status}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default FilteredVendorBottomCardItem;
