import React from 'react';
import { View, Text, FlatList } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { LinearGradient } from 'expo';
import {
  COLOR_GREEN,
  FONT_FAMILY_MEDIUM,
  COLOR_WHITE
} from '../../services/constants';

import styles from './styles';
import Button from '../Button';

const TAX = 5.95;

const OpenTablePayment = props => {
  const data = props.data;
  const subTotal =
    data &&
    data.get('items')
    .map(item => {
        if (item.get('status') !== 'denied') {
          return item.get('price');
        }
        return parseFloat(0);
      })
    .reduce((previous, next) => {
        return parseFloat(previous + next);
  });

  renderItem = data => {
    if(data.item.get('status') === 'denied') return null;
    return (
      <View style={styles.listItem}>
        <Text style={styles.name}>{data.item.get('title')}</Text>
        <Text style={styles.price}>${data.item.get('price')}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <FlatList
          keyExtractor={item => item.get('_id').toString()}
          data={data !== null ? data.get('items').toArray() : []}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={this.renderSeparator}
          contentContainerStyle={styles.flatListContentContainerStyle}
          style={styles.flatListStyle}
          renderItem={this.renderItem}
        />
      </View>

      <View style={styles.middleContainer}>
        <View style={styles.middleTextContainer}>
          <Text style={styles.subTotalTaxLabel}>SUBTOTAL</Text>
          <Text style={styles.subTotalTaxValue}>${subTotal}</Text>
        </View>

        <View
          style={[
            styles.middleTextContainer,
            styles.extraStyleForMiddleTextContainer
          ]}
        >
          <Text style={styles.subTotalTaxLabel}>TAX</Text>
          <Text style={styles.subTotalTaxValue}>+ ${TAX}</Text>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.bottomTextContainer}>
          <Text style={[styles.cardTitle, { width: wp('30.93%') }]}>
            Card Number
          </Text>
          <Text style={[styles.cardValue, { textAlign: 'right' }]}>
            •••• •••• •••• 1234
          </Text>
        </View>

        <View style={styles.bottomTextContainer}>
          <Text style={[styles.cardTitle, { width: wp('30.93%') }]}>
            Exp Date
          </Text>
          <Text style={[styles.cardValue, { textAlign: 'right' }]}>
            09 / 18
          </Text>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'flex-end',
              paddingVertical: hp('3.20%')
            }}
          >
            <Text style={styles.cardTitle}>CVV</Text>
            <Text style={[styles.cardValue, { width: 60, textAlign: 'right' }]}>
              •••
            </Text>
          </View>
        </View>

        <View style={styles.bottomTextContainer}>
          <Text style={[styles.cardTitle, { width: wp('30.93%') }]}>
            Cardholder
          </Text>
          <Text style={[styles.cardValue, { textAlign: 'right' }]}>
            Ofir Dotan
          </Text>
        </View>
      </View>
      {(() => {
        return (
          <View
            style={{
              width: wp('100%'),
              alignItems: 'center',
              height: hp('10.16%'),
              borderTopColor: COLOR_GREEN,
              borderTopWidth: 2,
              backgroundColor: 'black'
            }}
          >
            <LinearGradient
              colors={['transparent', '#2B2C2C']}
              start={[0.3, 0]}
              style={{
                flexDirection: 'row',
                position: 'absolute',
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
                alignItems: 'center',
                justifyContent: props.innerTab !== 'closed' ? 'flex-start' : 'center'
              }}
            >
              {props.innerTab !== 'closed' && (
                <Button
                  style={buttonStyles.requestBtn}
                  textStyle={buttonStyles.requestBtnText}
                  onPress={() => props.completeOrder()}
                >
                  Request
                </Button>
              )}

              <Text
                style={[
                  styles.total,
                  {
                    paddingLeft: props.innerTab !== 'closed' ? wp('11.46%') : 0
                  }
                ]}
              >
                Total ${((subTotal * TAX) / 100 + subTotal).toFixed(2)}
              </Text>
            </LinearGradient>
          </View>
        );
      })()}
    </View>
  );
};

const buttonStyles = {
  requestBtn: {
    backgroundColor: '#2ED573',
    borderColor: '#0DD24A',
    width: wp('37.33%'),
    height: hp('4.92%'),
    justifyContent: 'center',
    borderRadius: 8,
    marginLeft: wp('5.33%')
  },

  requestBtnText: {
    fontSize: wp('3.46%'),
    fontFamily: FONT_FAMILY_MEDIUM,
    color: COLOR_WHITE,
    paddingTop: 0,
    paddingBottom: 0,
    justifyContent: 'center'
  }
};

export default OpenTablePayment;
