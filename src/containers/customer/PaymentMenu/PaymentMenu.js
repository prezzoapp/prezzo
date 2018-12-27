import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Alert,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  Modal,
  AsyncStorage,
  TouchableOpacity
} from 'react-native';
import { PropTypes } from 'prop-types';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';
import MenuButton from '../../../components/MenuButton';
import { Feather } from '../../../components/VectorIcons';
import EditableListItem from '../../../components/EditableListItem';
import styles from './styles';
import { FONT_FAMILY_MEDIUM, COLOR_WHITE } from '../../../services/constants';

class PaymentMenu extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: (
      <Text
        style={{
          width: wp('70%'),
          fontSize: wp('6.4%'),
          fontFamily: FONT_FAMILY_MEDIUM,
          color: COLOR_WHITE,
          textAlign: 'center',
          justifyContent: 'center'
        }}
        numberOfLines={1}
      >
        Payment Methods
      </Text>
    ),
    headerBackTitle: null,
    headerStyle: {
      backgroundColor: '#2B2C2C',
      shadowColor: 'transparent',
      borderBottomWidth: 0
    },
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
    ),
    headerTintColor: '#fff'
  });

  static displayName = 'Payment Methods';

  componentDidMount() {
    console.log(this.props.data);
    this.props.listCreditCards().then(() => {
        this.checkResponseMessage();
      })
      .catch(e => {
        this.showAlert(e.message, 300);
      });
  }
  showAlert(message, duration) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      alert(message);
    }, duration);
  }

  checkResponseMessage() {
    AsyncStorage.getItem('response_message').then((msg) => {
      console.log('response message is -----------------', msg);
    });
  }
  removeCardAtIndex(id) {
    Alert.alert(
      null,
      'Are you sure you want to delete this payment method?',
      [
        {
          text: 'Yes',
          onPress: () => this.props.removeCreditCard(id)
        },
        {
          text: 'No',
          onPress: () => null,
          style: 'cancel'
        }
      ],
      { cancelable: false }
    );
  }

  render() {
    return (
      <View style={styles.parent}>
        <View style={styles.container}>
          <MenuButton
            onPress={() =>
              this.props.navigate({
                routeName: 'PaymentDetails',
                params: { title: 'Add Credit Card' }
              })
            }
            title="Add Credit Card"
            icon="add"
            leftIcon={
              <Image
                source={require('../../../../assets/images/Credit-Card.png')}
                style={{
                  width: 28,
                  resizeMode: 'contain'
                }}
              />
            }
          />

          <ScrollView style={styles.scrollViewStyle}>
            {this.props.data &&
            this.props.data.map((item, key) => (
                <View
                key={key}
                  style={{
                    flexDirection: 'row',
                    height: 0.2 * 0.85 * Dimensions.get('window').width
                  }}
                >
                  <EditableListItem
                    text={item.readableIdentifier}
                    expDate={item.expDate}
                    onRemove={() => this.removeCardAtIndex(item._id)}
                    leftIcon={(() => {
                    if (item.type === 'braintree-visa') {
                      return (
                          <Image
                            source={require('../../../../assets/images/icons/stp_card_visa.png')}
                            style={{
                              width: 35,
                              resizeMode: 'contain',
                              marginLeft: 10,
                              marginRight: 15
                            }}
                          />
                        );
                    } else if (item.type === 'braintree-mastercard') {
                      return (
                          <Image
                            source={require('../../../../assets/images/icons/stp_card_mastercard.png')}
                            style={{
                              width: 35,
                              resizeMode: 'contain',
                              marginLeft: 10,
                              marginRight: 15
                            }}
                          />
                        );
                    } else if (item.type === 'braintree-discover') {
                        return (
                          <Image
                            source={require('../../../../assets/images/icons/stp_card_discover.png')}
                            style={{
                              width: 35,
                              resizeMode: 'contain',
                              marginLeft: 10,
                              marginRight: 15
                            }}
                          />
                        );
                      } else if (item.type === 'braintree-jcb') {
                        return (
                          <Image
                            source={require('../../../../assets/images/icons/stp_card_jcb.png')}
                            style={{
                              width: 35,
                              resizeMode: 'contain',
                              marginLeft: 10,
                              marginRight: 15
                            }}
                          />
                      );
                    }
                  })()}
                />
              </View>
            ))}
          </ScrollView>

          {/*<MenuButton
            onPress={() => {}}
            title="Add Bitcoin"
            icon="add"
            leftIcon={
              <Image
                source={require('../../../../assets/images/bitcoin.png')}
                style={{
                  width: 20,
                  resizeMode: 'contain'
                }}
              />
            }
          />

          <MenuButton
            onPress={() => {}}
            title="Add Paypal"
            icon="add"
            leftIcon={
              <Image
                source={require('../../../../assets/images/Paypal-icon.png')}
                style={{
                  width: 25,
                  resizeMode: 'contain'
                }}
              />
            }
          />*/}
        </View>

        <Modal animationType="none" transparent visible={this.props.isBusy}>
          <View style={styles.loaderView}>
            <ActivityIndicator size="large" color="white" />
          </View>
        </Modal>
      </View>
    );
  }
}

PaymentMenu.propTypes = {
  navigate: PropTypes.func.isRequired
};

export default PaymentMenu;
