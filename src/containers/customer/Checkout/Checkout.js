import React, { Component } from 'react';
import { Modal, View, Text, FlatList, TouchableOpacity, ScrollView, Image } from 'react-native';

import Swiper from 'react-native-swiper';

import { BlurView } from 'react-native-blur';

import Icon from 'react-native-vector-icons/dist/Feather';

import Button from '../../../components/Button';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import {
  FONT_FAMILY,
  COLOR_WHITE,
  FONT_FAMILY_MEDIUM
} from '../../../services/constants';

import styles from './styles';

export default class Checkout extends Component {
  constructor() {
    super();

    this.state = {data: [{
      id: 1,
      name: 'Cucumber Salad',
      quantity: 1
    },{
      id: 2,
      name: 'Sushi Sampler',
      quantity: 1
    },{
      id: 3,
      name: 'Original Poke',
      quantity: 1
    },{
      id: 4,
      name: 'Cucumber Salad',
      quantity: 1
    },{
      id: 5,
      name: 'Sushi Sampler',
      quantity: 1
    },{
      id: 6,
      name: 'Original Poke',
      quantity: 1
    },{
      id: 7,
      name: 'Cucumber Salad',
      quantity: 1
    },{
      id: 8,
      name: 'Sushi Sampler',
      quantity: 1
    },{
      id: 9,
      name: 'Original Poke',
      quantity: 1
    }]}

    this.value = 0;

    this.scrollToPosition = this.scrollToPosition.bind(this);
  }

  scrollToPosition(op) {
    if (this.value < 2 && op === 'next') {
      this.value = this.value + 1;
      this.scrollView.scrollTo({
        x: this.value * wp('33.33%'),
        y: 0,
        animated: true
      });
    } else if(this.value !== 0 && op === 'back') {
      this.value = this.value - 1;
      this.scrollView.scrollTo({
        x: this.value * wp('33.33%'),
        y: 0,
        animated: true
      });
    }
  }

  render() {
    return (
      <Modal
        style={{marginBottom: 50}}
        animationType="slide"
        transparent={true}
        visible={this.props.modalVisible}
        onRequestClose={() => {
          alert('Modal has been closed.');
        }}>
        <View style={styles.container}>
          <View style={styles.modalView}>
            <BlurView
              style={styles.blurView}
              blurType="dark"
              blurAmount={5}
            />
            <View style={{ flex: 1 }}>
              <View style={styles.bottomArrowIconContainer}>
                <Image
                  source={require('../../../../assets/images/icons/bottom_arrow.png')}
                  style={styles.bottom_arrow}
                />
              </View>

              <View>
                <ScrollView
                  horizontal
                  ref={scrollView => {
                    this.scrollView = scrollView;
                  }}
                  bounces={false}
                >
                  <View style={styles.tabBarIconsHolder} />

                  <TouchableOpacity style={styles.tabBarIconsHolder}>
                    <Image
                      source={require('../../../../assets/images/checkout_icons/review_icon.png')}
                      style={{ height: 30, width: 30, resizeMode: 'contain' }}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.tabBarIconsHolder}>
                    <Image
                      source={require('../../../../assets/images/checkout_icons/payment_icon.png')}
                      style={{ height: 30, width: 30, resizeMode: 'contain' }}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.tabBarIconsHolder}>
                    <Image
                      source={require('../../../../assets/images/filters/dinner_filter.png')}
                      style={{ height: 30, width: 30, resizeMode: 'contain' }}
                    />
                  </TouchableOpacity>

                  <View style={styles.tabBarIconsHolder} />
                </ScrollView>
              </View>

              <Swiper loop={false} showsPagination={false}>
                <View style={styles.slide}>
                  <View>
                    <View style={styles.orderDetails}>
                      <Text style={styles.restaurantName}>
                        SUGARFISH
                      </Text>

                      <Text style={styles.reviewOrderText}>
                        Review Order
                      </Text>

                      <FlatList
                        data={this.state.data}
                        style={styles.flatList}
                        keyExtractor={item => item.id}
                        renderItem={({item}) =>
                          <View style={styles.item}>
                            <Text style={styles.itemName}>{item.name}</Text>
                            <View style={styles.actionBtnsHolder}>
                              <TouchableOpacity
                                activeOpacity={0.6}
                                style={styles.quantityBtn}
                              >
                                <Icon
                                  name="minus"
                                  size={wp('4.9%')}
                                  color="#2ED573"
                                />
                              </TouchableOpacity>

                              <Text style={styles.quantity}>{item.quantity}</Text>

                              <TouchableOpacity
                                activeOpacity={0.6}
                                style={styles.quantityBtn}
                              >
                                <Icon
                                  name="plus"
                                  size={wp('4.9%')}
                                  color="#2ED573"
                                />
                              </TouchableOpacity>
                            </View>
                          </View>
                        }
                      />
                    </View>

                    <View style={styles.reviewOrderFooter}>
                      <View style={styles.reviewOrderFooterContainer}>
                        <Text style={styles.reviewOrderFooterText}>
                          SUBTOTAL
                        </Text>
                        <Text style={[styles.reviewOrderFooterText, {textAlign: 'right'}]}>$33</Text>
                      </View>

                      <View style={styles.reviewOrderFooterContainer}>
                        <Text style={styles.reviewOrderFooterText}>
                          TAX
                        </Text>
                        <Text style={[styles.reviewOrderFooterText, {textAlign: 'right'}]}>+ $2.43</Text>
                      </View>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                      <TouchableOpacity onPress={() => this.scrollToPosition('next')}>
                        <Text style={{color: 'white'}}>Next</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => this.scrollToPosition('back')}>
                        <Text style={{color: 'white'}}>Prev</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                <View style={styles.slide}>
                  <View>
                    <View style={styles.orderDetails}>
                      <Text style={styles.restaurantName}>
                        WHERE TO?
                      </Text>
                    </View>

                    <View style={styles.whereToScreenContainer}>
                      <View style={styles.whereToScreenBtnsHolder}>
                        <Button
                          style={buttonStyles.commonBtn}
                          textStyle={buttonStyles.commonBtnText}
                          onPress={() => alert()}
                        >
                          Dine In
                        </Button>

                        <Button
                          style={buttonStyles.commonBtn}
                          textStyle={buttonStyles.commonBtnText}
                          onPress={() => alert()}
                        >
                          Delivery
                        </Button>
                      </View>
                      <Text style={styles.whereToScreenText}>
                        Please show this code to your server, or give it to your
                        friend to join a table.
                      </Text>
                      <Text style={styles.tableCode}>
                        9192
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={[styles.slide]}>

                </View>
              </Swiper>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const buttonStyles = {
  commonBtn: {
    backgroundColor: 'transparent',
    borderColor: '#0DD24A',
    borderWidth: 2,
    width: wp('33%'),
    justifyContent: 'center',
    borderRadius: 8,
    padding: 0,
    paddingVertical: hp('1.23%'),
    paddingHorizontal: 8,
    marginHorizontal: wp('4%')
  },
  commonBtnText: {
    fontSize: wp('4.8%'),
    fontFamily: FONT_FAMILY,
    color: COLOR_WHITE,
    paddingTop: 0,
    paddingBottom: 0,
    justifyContent: 'center'
  }
};
