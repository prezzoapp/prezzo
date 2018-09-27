import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  ActivityIndicator
} from 'react-native';
import { CreditCardInput } from 'react-native-credit-card-input';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import BTClient from 'react-native-braintree-xplat';
import styles from './styles';
import Button from '../Button';
import { get, post } from '../../utils/api';

import { FONT_FAMILY_MEDIUM } from '../../services/constants';

class PaymentDetails extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.title,
      headerStyle: {
        backgroundColor: '#2B2C2C',
        shadowColor: 'transparent',
        borderBottomWidth: 0
      },
      headerTintColor: '#fff',
      headerBackTitle: 'Hello'
    }
  };

  static displayName = 'Payment Methods';

  constructor() {
    super();

    this.state = {
      selectCheckBox: false,
      dataValid: false,
      isTokenizing: false
    };

    this.formData = null;
  }

  onChange(data) {
    console.log(data);
    if(data.valid === true && this.state.dataValid === false) {
      this.setState(() => {
          return {
            dataValid: true
          };
        },
        () => {
          this.formData = data;
        }
      );
    } else if(data.valid === false && this.state.dataValid === true) {
      this.setState(() => {
        return {
          dataValid: false
        }
      });
    }
  }

  getCheckboxImage() {
    return this.state.selectCheckBox
      ? require('../../../assets/images/icons/checkbox-checked.png')
      : require('../../../assets/images/icons/checkbox-unchecked.png');
  }

  togglePreferredPayment() {
    this.setState(() => {
      return {
        selectCheckBox: !this.state.selectCheckBox
      }
    })
  }

  cardTokenize() {
    const card = {
      number: this.formData.values.number,
      expirationDate: this.formData.values.expiry,
      cvv: this.formData.values.cvc,
      postalCode: this.formData.values.postalCode
    }
    this.setState(() => {
        return {
          isTokenizing: true
        }
      },
      () => {
        try {
          get(`/v1/self/payment-token`).then(response => {
            console.log(`Token: ${response.token}`);
            BTClient.setup(response.token);

            BTClient.getCardNonce(card).then(nonce => {
              console.log(`Nonce: ${nonce}`);
              post(`/v1/payment-methods`, {
                nonce
              }).then(res => {
                console.log(res);
                this.setState(() => {
                  return {
                    isTokenizing: false
                  }
                })
              });
            });
          });
        } catch (e) {
          console.log(e.message);
          this.setState(() => {
            return {
              isTokenizing: false
            }
          })
        }
      }
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <CreditCardInput
          inputStyle={styles.textStyle}
          labelStyle={styles.textStyle}
          placeholderColor="rgba(255, 255, 255, 0.5)"
          allowScroll
          requiresPostalCode
          inputContainerStyle={styles.containerStyle}
          onChange={data => this.onChange(data)}
        />

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.promotionsContainer}
          onPress={() => this.togglePreferredPayment()}
        >
          <Image style={styles.checkbox} source={this.getCheckboxImage()} />
          <Text style={styles.promotionalText}>Preferred Payment</Text>
        </TouchableOpacity>

        <View style={styles.btnHolder}>
          <Button
            style={buttonStyles.submitBtn}
            disabled={!this.state.dataValid}
            textStyle={[
              buttonStyles.submitBtnText,
              {
                color: this.state.dataValid
                  ? 'green'
                  : 'rgba(255, 255, 255, 0.5)'
              }
            ]}
            onPress={() => this.cardTokenize()}
          >
            Submit
          </Button>
        </View>
        {(() => {
          if(this.state.isTokenizing) {
            return (
              <View style={styles.loaderView}>
                <ActivityIndicator size="large" color="white" />
              </View>
            )
          }
        })()}
      </View>
    );
  }
}

const buttonStyles = {
  submitBtn: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    width: wp('37.33%'),
    height: hp('4.92%'),
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: hp('1%')
  },

  submitBtnText: {
    fontSize: wp('5.33%'),
    fontFamily: FONT_FAMILY_MEDIUM,
    paddingTop: 0,
    paddingBottom: 0,
    justifyContent: 'center'
  }
};

export default PaymentDetails;
