import React, { Component } from 'react';

import {
  View,
  Text,
  SectionList,
  ImageBackground,
  Image,
  TouchableOpacity,
  Animated
} from 'react-native';

import { Header } from 'react-navigation';

import Icon from 'react-native-vector-icons/dist/Feather';

import LinearGradient from 'react-native-linear-gradient';

import { BlurView } from 'react-native-blur';

import styles from './styles';

import RestaurantItem from '../../../components/RestaurantItem';

import Button from '../../../components/Button';

import { FONT_FAMILY, COLOR_WHITE } from '../../../services/constants';

const AnimatedSectionList = Animated.createAnimatedComponent(SectionList)

export default class RestaurantDetails extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.item.name,
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
  });

  constructor(props) {
    super(props);

    console.log(props.navigation.state.params);

    this.state = {
      items: [],
      sections: [],
      showText: false
    }

    this.changeQuantity = this.changeQuantity.bind(this);
    this.toggleViewFun = this.toggleViewFun.bind(this);

    this.scrollAnimatedValue = new Animated.Value(0);
  }

  componentWillMount() {
    for (let i = 0; i < 5; i++) {
      this.state.items.push({
        id: i,
        name: 'Cucumber Salad',
        price: 15,
        quantity: 1,
        ingradients: 'tuna, yellowtail, salmon, spring mix, avocado',
        images: [
          {
            imagePath: require('../../../../assets/images/exploreRestaurantItem.png')
          },
          {
            imagePath: require('../../../../assets/images/exploreRestaurantItem.png')
          },
          {
            imagePath: require('../../../../assets/images/exploreRestaurantItem.png')
          }
        ]
      });
    }

    this.setState(() => {
        return {
          items: this.state.items
        };
      },
      () => {
        this.state.sections.push({
          title: 'Chef Plates',
          data: [...this.state.items]
        });

      this.state.sections.push({
        title: 'Poke',
          data: [...this.state.items]
        });

      this.setState(() => {
          return {
            sections: this.state.sections
          };
        });
      }
    );
  }

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

  toggleViewFun() {
    this.setState(() => {
      return {
        showText: !this.state.showText
      }
    });
  }

  renderSectionHeader = section => (
    <View
      style={{
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        backgroundColor: 'black',
        bottom: 0
      }}
    >
      <Text style={[styles.transparent, styles.listHeaderText]}>
        {section.title}
      </Text>
    </View>
  )

  render() {
    const animatedHeader = this.scrollAnimatedValue.interpolate({
      inputRange: [0, 170],
      outputRange: [170, 0],
      extrapolate: 'clamp'
    });

    const animatedOpacity = this.scrollAnimatedValue.interpolate({
      inputRange: [0, 170],
      outputRange: [1, 0]
    });

    return (
      <View style={[styles.container, { paddingTop: Header.HEIGHT + 5 }]}>
        <ImageBackground
          source={require('../../../../assets/images/photo_back.png')}
          style={styles.photo_back}>
          <LinearGradient
            colors={['transparent', 'black']}
            style={styles.LinearGradientStyle}
          />
        </ImageBackground>

        <Animated.View
          style={{
            height: animatedHeader,
            overflow: 'hidden',
            opacity: animatedOpacity
          }}
        >
          <View style={styles.contentContainer}>
            <Image
              source={{ uri: this.props.navigation.state.params.item.avatarURL }}
              style={styles.logo}
            />
            <View style={[styles.headerTextContainer, styles.transparent]}>
              <Text style={styles.headerTitleText}>
                {this.props.navigation.state.params.item.location.address},{' '}
                {this.props.navigation.state.params.item.location.regionShort},{' '}
                {this.props.navigation.state.params.item.location.postalCode}
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

          <View style={styles.toggleBtnsSection}>
            <View style={styles.buttonHolder}>
              <TouchableOpacity
                activeOpacity={1}
                style={styles.headerBtns}
                onPress={this.toggleViewFun}
              >
                <Text style={styles.headerBtnText}>Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                style={styles.headerBtns}
                onPress={this.toggleViewFun}
              >
                <Text style={styles.headerBtnText}>Text</Text>
              </TouchableOpacity>
              <View
                style={[
                  styles.toggleView,
                  { left: this.state.showText ? 80 : 0 }
                ]}
              >
                <LinearGradient
                  colors={['#707070', '#1E1E1E']}
                  style={[styles.headerBtns, styles.linearGradientBtn]}
                >
                  <Text style={styles.selectedBtnText}>{this.state.showText ? 'Text' : 'Photo'}</Text>
                </LinearGradient>
              </View>
            </View>
          </View>
        </Animated.View>

        <AnimatedSectionList
          keyExtractor={item => item.id}
          onScroll={Animated.event([
            {
              nativeEvent: { contentOffset: { y: this.scrollAnimatedValue } }
            }]
          )}
          contentContainerStyle={{ paddingBottom: 85 }}
          sections={this.state.sections}
          renderSectionHeader={({ section }) =>
            this.renderSectionHeader(section)
          }
          renderItem={({ item }) =>
            <RestaurantItem
              item={item}
              showText={this.state.showText}
              changeQuantity={(id, op) => this.changeQuantity(id, op)}
            />
          }
        />

        <View style={styles.bottomViewHolder}>
          <BlurView
            style={{position: 'absolute', top: 0, right: 0, bottom: 0, left: 0}}
            blurType="dark"
            blurAmount={10}
          />
          <Button
            style={buttonStyles.placeOrderBtn}
            textStyle={buttonStyles.btnText}
            onPress={() => alert()}
          >
            Place Order
          </Button>

          <Text style={styles.totalPrice}>Total $35.42</Text>
        </View>
      </View>
    );
  }
}

const buttonStyles = {
  placeOrderBtn: {
    backgroundColor: '#2ED573',
    borderColor: '#0DD24A',
    width: 100,
    height: 37,
    justifyContent: 'center',
    borderRadius: 8
  },
  btnText: {
    fontSize: 14,
    fontFamily: FONT_FAMILY,
    color: COLOR_WHITE,
    paddingTop: 0,
    paddingBottom: 0,
    justifyContent: 'center'
  }
};
