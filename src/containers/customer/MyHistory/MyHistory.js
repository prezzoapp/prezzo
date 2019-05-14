import React, { Component } from 'react';
import { FlatList, View, TouchableOpacity, Text } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { MaterialIcons, Feather } from '../../../components/VectorIcons';
import { FONT_FAMILY_MEDIUM, COLOR_WHITE, COLOR_BLACK } from '../../../services/constants';
import MyHistoryItem from '../../../components/MyHistoryItem';
import styles from './styles';

class MyHistory extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: (
      <Text
        style={{
          width: wp('70%'),
          fontSize: wp('6.4%'),
          fontFamily: FONT_FAMILY_MEDIUM,
          color: COLOR_WHITE,
          textAlign: 'center'
        }}
        numberOfLines={1}
      >
        My History
      </Text>
    ),
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: COLOR_BLACK,
      shadowColor: 'transparent',
      borderBottomWidth: 0,
      elevation: 0
    },
    headerLeft: (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.goBack()}
        style={styles.headerLeftBtn}>
        <Feather
          title="Back"
          name="chevron-left"
          color="white"
          size={wp('8%')}
        />
      </TouchableOpacity>
    )
  });

  static displayName = 'MyHistory';

  constructor() {
    super();
    this.data = [{
      id: 1,
      date: '03-15-18',
      restaurantName: 'Erewhon Market',
      type: 'Dine in - $43.90',
      status: 'complete'
    }, {
      id: 2,
      date: '04-15-18',
      restaurantName: 'Erewhon Market',
      type: 'Dine in - $43.90',
      status: 'complete'
    }, {
      id: 3,
      date: '05-15-18',
      restaurantName: 'Erewhon Market',
      type: 'Dine in - $43.90',
      status: 'complete'
    }, {
      id: 4,
      date: '06-15-18',
      restaurantName: 'Erewhon Market',
      type: 'Dine in - $43.90',
      status: 'complete'
    }, {
      id: 5,
      date: '07-15-18',
      restaurantName: 'Erewhon Market',
      type: 'Dine in - $43.90',
      status: 'complete'
    }]
  }

  renderItem = data => <MyHistoryItem item={data.item} />;

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.contentContainerStyle}
          keyExtractor={item => item.id.toString()}
          data={this.data}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

export default MyHistory;
