import React, { Component } from 'react';

import { View, Text, FlatList, ImageBackground, Image } from 'react-native';

import { Header } from 'react-navigation';

import Icon from 'react-native-vector-icons/dist/Feather';

import LinearGradient from 'react-native-linear-gradient';

import styles from './styles';

import RestaurantItem from '../../../components/RestaurantItem';

// import Button from '../../../components/Button';

export default class RestaurantDetails extends Component {
  static navigationOptions = {
    title: 'Restaurant',
    headerStyle: {
      position: 'absolute',
      backgroundColor: 'transparent',
      zIndex: 100,
      top: 0,
      left: 0,
      right: 0,
      shadowColor: 'transparent',
      borderBottomWidth: 0
    },
    headerTintColor: '#fff'
  };

  constructor(props) {
    super(props);

    this.state = {
      items: []
    }

    this.changeQuantity = this.changeQuantity.bind(this);
  }

  componentWillMount() {
    for (let i = 0; i < 10; i++) {
      this.state.items.push({
        id: i,
        name: 'Cucumber Salad',
        price: 15,
        quantity: 1,
        ingradients: 'tuna, yellowtail, salmon, spring mix, avocado'
      });
    }

    this.setState(() => {
      return {
        items: this.state.items
      };
    });
  }

  listHeader = () => (
    <View style={{ borderBottomWidth: 1, borderBottomColor: 'white' }}>
      <Text style={[styles.transparent, styles.listHeaderText]}>
        Chef Plates
      </Text>
    </View>
  )

  changeQuantity(id, op) {
    const newItems = [...this.state.items];
    if(op === 'add') {
      newItems[newItems.findIndex(x => x.id === id)].quantity++;
    } else {
      if(!newItems[newItems.findIndex(x => x.id === id)].quantity <= 0 ) {
        newItems[newItems.findIndex(x => x.id === id)].quantity--;
      }
    }

    this.setState(() => {
      return {
        items: newItems
      }
    });
  }

  render() {
    return (
      <View style={[styles.container, { paddingTop: Header.HEIGHT + 13 }]}>
        <ImageBackground
          source={require('../../../../assets/images/photo_back.png')}
          style={styles.photo_back}>
          <LinearGradient
            colors={['transparent', 'black']}
            style={styles.LinearGradientStyle}
          />
        </ImageBackground>

        <View style={styles.contentContainer}>
          <Image
            source={require('../../../../assets/images/Logo.png')}
            style={styles.logo}
          />
          <View style={[styles.headerTextContainer, styles.transparent]}>
            <Text style={styles.headerTitleText}>
              1412 Abbot Kinney Venice, CA, 90292
            </Text>
            <View style={styles.headerContentTextContainer}>
              <Icon name="package" size={22} color="white" />
              <Text style={[styles.transparent, styles.headerContentText]}>
                Delivery
              </Text>
            </View>
            <View style={styles.headerContentTextContainer}>
              <Icon name="clock" size={22} color="white" />
              <Text style={[styles.transparent, styles.headerContentText]}>
                8 Mins Wait Time
              </Text>
            </View>
          </View>
        </View>

        <FlatList
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingBottom: 10 }}
          data={this.state.items}
          ListHeaderComponent={this.listHeader}
          renderItem={({ item }) =>
            <RestaurantItem
              item={item}
              changeQuantity={(id, op) => this.changeQuantity(id, op)}
            />
          }
        />

        {/*<View style={{ paddingHorizontal: 15, paddingVertical: 15, position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: 'red' }}>

        </View>*/}
      </View>
    );
  }
}
