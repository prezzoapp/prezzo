import React, { Component } from 'react';
import ReactNative, {
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Modal,
  AsyncStorage,
  KeyboardAvoidingView,
  ScrollView,
  InteractionManager,
  findNodeHandle,
  UIManager,
  Dimensions,
  Keyboard
} from 'react-native';
import { CreditCardInput } from 'react-native-credit-card-input';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PropTypes from 'prop-types';
import { WebView } from 'react-native-webview-messaging/WebView';
import { Feather } from '../../../components/VectorIcons';
import styles from './styles';
import Button from '../../../components/Button';
import { get, post } from '../../../utils/api';

import { FONT_FAMILY_MEDIUM, COLOR_WHITE } from '../../../services/constants';
import KeyboardSpacer from 'react-native-keyboard-spacer';
const windowHeight = Dimensions.get('window').height;
let keyboardDidShowCalled = false;
const scrollViewRef = React.createRef();
const buttonRef = React.createRef();

class PaymentDetails extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
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
          {navigation.state.params.title}
        </Text>
      ),
      headerStyle: {
        backgroundColor: '#2B2C2C',
        shadowColor: 'transparent',
        borderBottomWidth: 0,
        elevation: 0,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0
      },
      headerTintColor: '#fff',
      headerBackTitle: 'Hello',
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
    }
  };

  static displayName = 'Payment Methods';

  constructor() {
    super();

    this.state = {
      selectCheckBox: false,
      dataValid: false,
      isLoading: false,
      error: ''
    };

    this.formData = null;
    this.getToken = '';
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState(() => {
          return {
            isLoading: true
          }
        },
        () => {
          get(`/v1/self/payment-token`).then(response => {
              console.log(`Token: ${response.token}`);
              this.setState(
                () => {
                  return {
                    isLoading: false
                  };
              },
                () => {
                  this.getToken = response.token;
                  this.webview.messagesChannel.on(
                    'isTokenizationComplete',
                    nonce => this.isTokenizationComplete(nonce)
                );

                this.webview.messagesChannel.on('isError', error =>
                    this.isError(error)
                  );
                }
              );
            })
            .catch(e => {
              this.showAlert(e.message, 300);
              this.setState(() => {
                return {
                  isLoading: false
                };
              });
            });
        }
      );
    });
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

  showAlert(message, duration) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      alert(message);
    }, duration);
  }

  async checkResponseMessage(){
    await AsyncStorage.getItem('response_message').then((msg) => {
      console.log('response message is -----------------', msg);
    });
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

    post(`/v1/payment-methods`, {
      nonce,
      isDefault: this.state.selectCheckBox
    }).then(paymentMethod => {
      console.log('Response After Sending Nonce: ');
      console.log(paymentMethod);
      this.props
        .addCreditCardInfo(paymentMethod, paymentMethod.isDefault)
        .then(() => {
          this.setState(
            () => {
            return {
                isLoading: false
            };
          },
          () => {
            this.props.navigation.goBack();
          }
        );
      });
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

  componentWillMount() {
    this.keyboardShow = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    this.keyboardHide = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
  }

  componentWillUnmount() {
    this.keyboardShow.remove();
    this.keyboardHide.remove();
  }

  keyboardDidShow = event => {
    if(keyboardDidShowCalled === false) {
      keyboardDidShowCalled = true;
      const keyboardHeight = event.endCoordinates.height;
      const button = ReactNative.findNodeHandle(buttonRef.current);
      UIManager.measure(button, (originX, originY, width, height, pageX, pageY) => {
        const fieldHeight = height;
        const fieldTop = pageY;
        gap = (windowHeight - keyboardHeight) - (fieldTop + fieldHeight);
        if (gap < 0) {
          scrollViewRef.current.scrollTo({
            x: 0, y: -gap, animated: true
          });
        }
      });
    }
  }

  keyboardDidHide = event => {
    scrollViewRef.current.scrollTo({
      x: 0, y: 0, animated: true
    })
    keyboardDidShowCalled = false;
  }


  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding'>
        <View style={styles.container}>
          <ScrollView
            ref={scrollViewRef}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scrollView}
          >
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
              <Feather
                style={styles.checkbox}
                name={this.state.selectCheckBox ? 'square' : 'check-square'}
                size={wp('7.2%')}
                color="white"
              />
              <Text style={styles.promotionalText}>Preferred Payment</Text>
            </TouchableOpacity>

            <View style={styles.btnHolder}>
              <Button
                ref={buttonRef}
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
            <Modal
              animationType="none"
              transparent
              visible={this.state.isLoading}
            >
              <View style={styles.loaderView}>
                <ActivityIndicator size="large" color="white" />
              </View>
            </Modal>

            {(() => {
              if(this.state.error) {
                return (
                  <Text style={{ color: 'white' }}>{this.state.error}</Text>
                );
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
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
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
