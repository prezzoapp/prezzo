import React, { Component } from 'react';
import ReactNative, {
  View,
  TouchableOpacity,
  Text,
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
import showGenericAlert from '../../../components/GenericAlert';

import {
  FONT_FAMILY_MEDIUM,
  COLOR_WHITE,
  NETWORK_REQUEST_FAILED
} from '../../../services/constants';
import {
  manuallyLogout,
  showAlertWithMessage
} from '../../../services/commonFunctions';

const windowHeight = Dimensions.get('window').height;
let keyboardDidShowCalled = false;
const scrollViewRef = React.createRef();
const buttonRef = React.createRef();

let disableBtn = false;

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
    };
  };

  static displayName = 'Payment Methods';

  constructor() {
    super();

    this.state = {
      selectCheckBox: false,
      dataValid: false,
      error: ''
    };

    this.formData = null;
    this.getToken = '';
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(async () => {
      try {
        const response = await this.props.getToken();

        this.getToken = response.token;
        this.webview.messagesChannel.on('isTokenizationComplete', nonce => {
          console.log('isTokenizationComplete function called!');
          this.isTokenizationComplete(nonce);
        });

        this.webview.messagesChannel.on('isError', error => {
          console.log('isError function called!');
          this.props.hideLoading();
          if(error.message.code === 'CLIENT_GATEWAY_NETWORK') {
            showAlertWithMessage(
              'Uh-oh!',
              { message: NETWORK_REQUEST_FAILED },
              () => {
                disableBtn = false;
              }
            );
          } else {
            showAlertWithMessage('Uh-oh!', error.message, () => {
              disableBtn = false;
            });
          }
        });
      } catch(err) {
        if(err.code === 401) {
          manuallyLogout(err, () => this.props.userLogout());
        } else {
          showAlertWithMessage('Uh-oh!', err, () => {
            disableBtn = false;
          });
        }
      }
    });
  }

  onChange(data) {
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

  async checkResponseMessage(){
    await AsyncStorage.getItem('response_message').then((msg) => {
      console.log('response message is -----------------', msg);
    });
  }

  async isTokenizationComplete(response) {
    try {
      const nonce = response.payload;

      const paymentMethod = await this.props.isTokenizationComplete(nonce, this.state.selectCheckBox);
      await this.props.addCreditCardInfo(
        paymentMethod,
        paymentMethod.isDefault
      );
      if (
        this.props.navigation.state.params
          .selectPaymentMethodAfterCardTokenizing
      ) {
        this.props.navigation.state.params.selectPaymentMethodAfterCardTokenizing(paymentMethod._id);
      }
      this.props.navigation.goBack();
      InteractionManager.runAfterInteractions(() => {
        disableBtn = false;
      });
    } catch(err) {
      if(err.code === 401) {
        manuallyLogout(err, () => this.props.userLogout());
      } else {
        showAlertWithMessage('Uh-oh!', err, () => {
          disableBtn = false;
        });
      }
    }
  }

  togglePreferredPayment() {
    this.setState(() => {
      return {
        selectCheckBox: !this.state.selectCheckBox
      }
    })
  }

  cardTokenize() {
    if(disableBtn === false) {
      disableBtn = true;
      const card = {
        token: this.getToken,
        number: this.formData.values.number,
        expirationDate: this.formData.values.expiry,
        cvv: this.formData.values.cvc,
        postalCode: this.formData.values.postalCode
      }
      if(card.token === '') {
        disableBtn = false;
        showGenericAlert('Uh-oh!', 'Invalid token');
      } else {
        this.props.showLoading();
        this.webview.sendJSON({
          payload: card
        });
      }
    }
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
                name={this.state.selectCheckBox ? 'check-square' : 'square'}
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
  navigate: PropTypes.func.isRequired,
  getToken: PropTypes.func.isRequired,
  hideLoading: PropTypes.func.isRequired,
  showLoading: PropTypes.func.isRequired,
  userLogout: PropTypes.func.isRequired,
  isTokenizationComplete: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired
};

export default PaymentDetails;
