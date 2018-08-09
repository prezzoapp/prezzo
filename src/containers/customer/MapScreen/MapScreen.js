import React, { Component } from 'react';
import { View, FlatList, Text, TouchableOpacity, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';

export default class MapScreen extends Component {
  static navigationOptions = {
    title: 'Map',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#2B2C2C'
    }
  };

  renderSeparator = () => (
    <View
      style={{
        height: 1,
        width: '100%',
        backgroundColor: 'rgb(59,97,74)'
      }}
    />
  );

  render() {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['rgb(43,44,44)', 'transparent']}
          locations={[0, 0.5]}
          style={styles.map}
        />
        <View style={styles.filteredRestaurantsListHolder}>
          <FlatList
            contentContainerStyle={{
              paddingVertical: 5,
              paddingHorizontal: 15
            }}
            keyExtractor={(item) => item._id}
            data={this.props.data}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={this.renderSeparator}
            renderItem={({item}) =>
              <TouchableOpacity activeOpacity={0.6} style={styles.listItemBtn}>
                <View style={styles.titleHolder}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.distance}>{item.distance} miles</Text>
                </View>

                <View style={styles.statusHolder}>
                  <Image source={require('../../../../assets/images/open_restaurant_status.png')} style={styles.statusImage}/>
                  <Text style={styles.status}>{item.status}</Text>
                </View>
              </TouchableOpacity>
            }
          />
        </View>
      </View>
    );
  }
}
