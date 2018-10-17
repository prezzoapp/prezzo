import React from 'react';
import { Dimensions, View, Text, FlatList } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { COLOR_GREEN } from '../../services/constants';

import styles from './styles';

const SECTION_WIDTH: number = 0.85 * Dimensions.get('window').width;
// const data = [
//   { name: 'Buffalo Caluiflower v2', price: '$24' },
//   { name: 'Mac n Cheese x1', price: '$15' },
//   { name: 'BBQ Pineapple x2', price: '$30' },
//   { name: 'Mole Bawl x1', price: '$16' }
// ];

const OpenOrdersList = props => {
  return (
    <View style={styles.container}>
      <View
        style={{
          // height: hp('29.55%'),
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
            data={props.data}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
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
                <Text style={styles.text}>{item.name}</Text>
                <Text style={[styles.text, { textAlign: 'right' }]}>
                  {item.price}
                </Text>
              </View>
            )}
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
          <Text style={[styles.text, { textAlign: 'right' }]}>$85</Text>
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
          <Text style={[styles.text, { textAlign: 'right' }]}>+ $5.95</Text>
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
      {props.footer}
    </View>
  );
}

export default OpenOrdersList;
