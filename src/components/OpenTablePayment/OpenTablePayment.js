import React from 'react';
import { Dimensions, View, Text, FlatList } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import {
  COLOR_GREEN,
  FONT_FAMILY,
  COLOR_WHITE
} from '../../services/constants';

import styles from './styles';
import Button from '../Button';

const SECTION_WIDTH: number = 0.85 * Dimensions.get('window').width;
const TAX = 5.95;

const OpenTablePayment = props => {
  const subTotal =
    props.data &&
    props.data.items
    .map(item => {
        if (item.status !== 'denied') {
          return item.price;
        }
        return null;
      })
    .reduce((previous, next) => {
        return parseFloat(previous + next);
  });

  // completeOrder = (subtotal) => {
  //   if(props.data[0].paymentType === 'card') {
  //     props.makePaymentAndCompleteOrder(
  //       props.data._id,
  //       props.data.paymentMethod.token,
  //       parseFloat(((subTotal * TAX) / 100 + subTotal).toFixed(2)),
  //       'card',
  //       'complete'
  //     )
  //   } else {
  //     props.makePaymentAndCompleteOrder(
  //       props.data._id,
  //       '',
  //       parseFloat(((subTotal * TAX) / 100 + subTotal).toFixed(2)),
  //       'cash',
  //       'complete'
  //     )
  //   }
  // }

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          marginTop: 0,
          borderBottomColor: COLOR_GREEN,
          borderBottomWidth: 1
        }}
      >
        <View
          style={{
            marginTop: 20,
            marginBottom: 20
          }}
        >
          <FlatList
            keyExtractor={item => item._id.toString()}
            data={props.data !== null ? props.data.items : []}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) =>
              item.status !== 'denied' && (
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    width: SECTION_WIDTH,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: hp('6.15%')
                }}
              >
                <Text style={styles.text}>{item.title}</Text>
                  <Text style={[styles.text, { textAlign: 'right' }]}>
                  ${item.price}
                </Text>
              </View>
              )
            }
          />
        </View>
      </View>

      <View
        style={{
          flexDirection: 'column',
          width: SECTION_WIDTH,
          justifyContent: 'center',
          alignItems: 'center',
          height: hp('16.37%'),
          borderBottomColor: COLOR_GREEN,
          borderBottomWidth: 1
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            width: SECTION_WIDTH,
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 30
          }}
        >
          <Text style={styles.text}>Subtotal</Text>
          <Text style={[styles.text, { textAlign: 'right' }]}>{subTotal}</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            width: SECTION_WIDTH,
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 30
          }}
        >
          <Text style={styles.text}>TAX</Text>
          <Text style={[styles.text, { textAlign: 'right' }]}>+ ${TAX}</Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'column',
          width: SECTION_WIDTH,
          justifyContent: 'center',
          alignItems: 'center',
          height: hp('23.52%')
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            width: SECTION_WIDTH,
            alignItems: 'center',
            height: 40
          }}
        >
          <Text style={[styles.cardTitle, { width: wp('30.93%') }]}>
            Card Number
          </Text>
          <Text style={[styles.cardValue, { textAlign: 'right' }]}>
            •••• •••• •••• 1234
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            width: SECTION_WIDTH,
            alignItems: 'center',
            height: 40
          }}
        >
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
              height: 40
            }}
          >
            <Text style={styles.cardTitle}>CVV</Text>
            <Text style={[styles.cardValue, { width: 60, textAlign: 'right' }]}>
              •••
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            width: SECTION_WIDTH,
            alignItems: 'center',
            height: 40
          }}
        >
          <Text style={[styles.cardTitle, { width: wp('30.93%') }]}>
            Cardholder
          </Text>
          <Text style={[styles.cardValue, { textAlign: 'right' }]}>
            Ofir Dotan
          </Text>
        </View>
      </View>
      {(() => {
        if(props.tabName === 'payment') {
          return (
            <View
              style={{
                flexDirection: 'row',
                width: wp('100%'),
                justifyContent: 'space-between',
                alignItems: 'center',
                height: hp('10.16%'),
                borderTopColor: COLOR_GREEN,
                borderTopWidth: 2,
                backgroundColor: 'black'
              }}
            >
              <Button
                style={buttonStyles.requestBtn}
                textStyle={buttonStyles.requestBtnText}
                onPress={() => null}
                // onPress={() => props.changeOrderStatus(props.data._id, 'complete')}
              >
                Request
              </Button>

              <Text
                style={[
                  styles.price,
                  { textAlign: 'right', marginRight: wp('5.33%') }
                ]}
              >
                Total ${((subTotal * TAX) / 100 + subTotal).toFixed(2)}
              </Text>
            </View>
          );
        }
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
    fontFamily: FONT_FAMILY,
    color: COLOR_WHITE,
    paddingTop: 0,
    paddingBottom: 0,
    justifyContent: 'center'
  }
};

export default OpenTablePayment;
