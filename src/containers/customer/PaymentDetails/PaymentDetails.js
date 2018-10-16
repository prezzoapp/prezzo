import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  ActivityIndicator,
  Modal
} from 'react-native';
import { CreditCardInput } from 'react-native-credit-card-input';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import { WebView } from 'react-native-webview-messaging/WebView';
import styles from './styles';
import Button from '../../../components/Button';
import { get, post } from '../../../utils/api';

import { FONT_FAMILY_MEDIUM } from '../../../services/constants';

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
      isLoading: true,
      error: ''
    };

    this.formData = null;
    this.getToken = '';
  }

  componentDidMount() {
    try {
      get(`/v1/self/payment-token`).then(response => {
        console.log(`Token: ${response.token}`);
        this.setState(() => {
            return {
              isLoading: false
            };
          },
          () => {
            this.getToken = response.token;
            this.webview.messagesChannel.on('isTokenizationComplete', nonce =>
              this.isTokenizationComplete(nonce)
            );

            this.webview.messagesChannel.on('isError', error =>
              this.isError(error)
            );
          }
        );
      });
    } catch (e) {
      console.log(e.message);
    }
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
      ? require('../../../../assets/images/icons/checkbox-checked.png')
      : require('../../../../assets/images/icons/checkbox-unchecked.png');
  }

  isError(error) {
    this.setState(() => {
      return {
        error: error.payload,
        isLoading: false
      }
    })
  }

  isTokenizationComplete(response) {
    const nonce = response.payload;
    // console.log('Nonce: ');
    // console.log(nonce);

    post(`/v1/payment-methods`, {
      nonce
    }).then(paymentMethod => {
      console.log('Response After Sending Nonce: ');
      console.log(paymentMethod);

      if(this.state.selectCheckBox) {
        console.log("Calling makeDefault API!");

        post(`/v1/payment-methods/${paymentMethod._id}/default`).then(defaultPaymentMethod => {
            console.log("makeDefault API Successfully Called!");
            console.log('Default Payment Method: ');
            console.log(defaultPaymentMethod);

            this.props
              .addCreditCardInfo(defaultPaymentMethod, true)
              .then(() => {
                console.log('Default Payment Method Added Succesfully!');
                this.setState(() => {
                    return {
                      isLoading: false
                    };
                  },
                  () => {
                    this.props.navigate({ routeName: 'PaymentMenu' });
                  }
                );
            });
          }
        )
      } else {
        this.props.addCreditCardInfo(paymentMethod, false).then(() => {
          // console.log('Payment Method Added Succesfully!');
          // console.log(paymentMethod);

          this.setState(() => {
              return {
                isLoading: false
              };
            },
            () => {
              this.props.navigate({ routeName: 'PaymentMenu' });
            }
          );
        });
      }
    });
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
      token: this.getToken,
      number: this.formData.values.number,
      expirationDate: this.formData.values.expiry,
      cvv: this.formData.values.cvc,
      postalCode: this.formData.values.postalCode
    }
    this.setState(() => {
      return {
          isLoading: true
        };
      },
      () => {
        this.webview.sendJSON({
          payload: card
        });
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
        <Modal animationType="none" transparent visible={this.state.isLoading}>
          <View style={styles.loaderView}>
            <ActivityIndicator size="large" color="white" />
          </View>
        </Modal>

        {(() => {
          if(this.state.error) {
            return <Text style={{ color: 'white' }}>{this.state.error}</Text>;
          }
          return null;
        })()}

        <WebView
          ref={webview => {
            this.webview = webview;
          }}
          source={require('../../../../dist/index.html')}
          style={{
            position: 'absolute',
            top: '100%',
            bottom: 0,
            right: 0,
            left: 0
          }}
        />
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

PaymentDetails.propTypes = {
  addCreditCardInfo: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired
};

export default PaymentDetails;
