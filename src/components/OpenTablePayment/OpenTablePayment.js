import React, { Component } from 'react';
import {Dimensions, View, Text, FlatList } from 'react-native';
import styles from './styles';
import { COLOR_GREEN } from '../../services/constants';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {
  FONT_FAMILY,
  FONT_FAMILY_MEDIUM,
  COLOR_WHITE
} from '../../services/constants';

import Button from '../../components/Button';

const SECTION_WIDTH: number = 0.85 * Dimensions.get('window').width;
const data= [
  { name: 'Buffalo Caluiflower v2', price: '$24' },
  { name: 'Mac n Cheese x1', price: '$15' },
  { name: 'BBQ Pineapple x2', price: '$30' },
  { name: 'Mole Bawl x1', price: '$16' }
];
const buttonStyles = {
  callWaiterBtn: {
    backgroundColor: '#2ED573',
    borderColor: '#0DD24A',
    width: wp('37.33%'),
    height: hp('4.92%'),
    justifyContent: 'center',
    borderRadius: 8,
    marginLeft: wp('5.33%')
  },

  callWaiterBtnText: {
    fontSize: wp('3.46%'),
    fontFamily: FONT_FAMILY,
    color: COLOR_WHITE,
    paddingTop: 0,
    paddingBottom: 0,
    justifyContent: 'center'
  }
};

class OpenOrdersList extends Component {
  render() {
    return (
     <View style={styles.container}>
     <View
    style= {{height: hp('29.55%'), marginTop: 0,   borderBottomColor: COLOR_GREEN,
      borderBottomWidth: 1}}>

      <View style= {{marginTop: 20, marginBottom:20,
        }}>
      <FlatList
      data={data}
      renderItem={({item}) =>
      <View style= {{flex: 1, flexDirection: 'row',
       width: SECTION_WIDTH,
      justifyContent: 'space-between',
      alignItems: 'center',
      height: hp('6.15%')

      }} >
      <Text style= {styles.text}>{item.name}</Text>
                  <Text style={[styles.text, { textAlign: 'right' }]}>
                    {item.price}
                  </Text>
      </View>

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
          <View style= {{flexDirection: 'row',
              width: SECTION_WIDTH,
              justifyContent: 'space-between',
              alignItems: 'center',
              height: 30
            }}
          >
            <Text style={styles.text}>Subtotal</Text>
            <Text style={[ styles.text, {textAlign: 'right' }]}>$85</Text>
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




           <View style= {{
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
            <Text style= {[styles.cardValue, {textAlign: 'right'}]}>•••• •••• •••• 1234</Text>
          </View>


          <View style= {{flexDirection: 'row',
            width: SECTION_WIDTH,
            alignItems: 'center',
            height: 40
            }}
          >
            <Text style={[styles.cardTitle, { width: wp('30.93%') }]}>
              Exp Date
            </Text>
            <Text style= {[styles.cardValue, {textAlign: 'right'}]}>09 / 18</Text>
            <View style= {{flexDirection: 'row',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-end',
            height: 40
           }}
          >
              <Text style={styles.cardTitle}>CVV</Text>
              <Text
                style={[styles.cardValue, { width: 60, textAlign: 'right' }]}
              >
                •••
              </Text>

    </View>

    </View>




        <View style= {{flexDirection: 'row',
         width: SECTION_WIDTH,
        alignItems: 'center',
        height: 40
        }} >
            <Text style={[styles.cardTitle, { width: wp('30.93%') }]}>
              Cardholder
            </Text>
        <Text style= {[styles.cardValue, {textAlign: 'right'}]}>Ofir Dotan</Text>
        </View>
        </View>

<View style= {{flexDirection: 'row',
 width: wp('100%'),
justifyContent: 'space-between',
alignItems: 'center',
height: hp('10.16%'),
borderTopColor: COLOR_GREEN,
borderTopWidth: 2,
backgroundColor: 'black'
}} >
<Button
  style={buttonStyles.callWaiterBtn}
  textStyle={buttonStyles.callWaiterBtnText}
  onPress={() => null}
>
  Request
</Button>

<Text style= {[styles.text, {textAlign: 'right'}]}>Total $90.95</Text>

</View>



      </View>
    )
  }
}

export default OpenOrdersList;
