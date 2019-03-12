import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Alert,
  ScrollView,
  AsyncStorage,
  TouchableOpacity,
  InteractionManager
} from 'react-native';
import { PropTypes } from 'prop-types';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import MenuButton from '../../../components/MenuButton';
import { Feather } from '../../../components/VectorIcons';
import EditableListItem from '../../../components/EditableListItem';
import CacheImage from '../../../components/CacheImage';
import styles from './styles';
import { FONT_FAMILY_MEDIUM, COLOR_WHITE } from '../../../services/constants';
import LoadingComponent from '../../../components/LoadingComponent';
import { showAlertWithMessage } from '../../../services/commonFunctions';

let disableBtn = false;

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
      borderBottomWidth: 0,
      elevation: 0
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
    InteractionManager.runAfterInteractions(() => {
      this.props.listCreditCards().then(() => {
          this.checkResponseMessage();
        })
        .catch(err => showAlertWithMessage('Uh-oh!', err));
    });
  }

  checkResponseMessage() {
    AsyncStorage.getItem('response_message').then(msg => {
      console.log('response message is -----------------', msg);
    });
  }

  removeCreditCard(id) {
    this.props.removeCreditCard(id)
    .then(() => {})
    .catch(err => showAlertWithMessage('Uh-oh!', err));
  }

  removeCardAtIndex(id) {
    Alert.alert(
      null,
      'Are you sure you want to delete this payment method?',
      [
        {
          text: 'Yes',
          onPress: () => this.removeCreditCard(id)
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

  navigateToPaymentDetails() {
    if(disableBtn === false) {
      disableBtn = true;
      this.props.navigate({
        routeName: 'PaymentDetails',
        params: { title: 'Add Credit Card' }
      });
      InteractionManager.runAfterInteractions(() => {
        disableBtn = false;
      });
    }
  }

  render() {
    return (
      <View style={styles.parent}>
        <View style={styles.container}>
          <MenuButton
            onPress={() => this.navigateToPaymentDetails()}
            title="Add Credit Card"
            icon="add"
            leftIcon={
              <CacheImage
                source={require('../../../../assets/images/Credit-Card.png')}
                type='image'
                style={{
                  width: wp('7.46%'),
                  height: hp('2.33%'),
                  resizeMode: 'contain'
                }}
              />
            }
          />

          <ScrollView style={styles.scrollViewStyle}>
            {this.props.data &&
            this.props.data.map((item, key) => (
                <View key={item._id}>
                  <EditableListItem
                    text={item.readableIdentifier}
                    expDate={item.expDate}
                    onRemove={() => this.removeCardAtIndex(item._id)}
                    leftIcon={(() => {
                    if (item.type === 'braintree-visa') {
                      return (
                          <CacheImage
                            source={require('../../../../assets/images/icons/stp_card_visa.png')}
                            type='image'
                            style={styles.ccIcon}
                          />
                        );
                    } else if (item.type === 'braintree-mastercard') {
                        return (
                          <CacheImage
                            source={require('../../../../assets/images/icons/stp_card_mastercard.png')}
                            type='image'
                            style={styles.ccIcon}
                          />
                        );
                      } else if (item.type === 'braintree-discover') {
                        return (
                          <CacheImage
                            source={require('../../../../assets/images/icons/stp_card_discover.png')}
                            type='image'
                            style={styles.ccIcon}
                          />
                        );
                      } else if (item.type === 'braintree-jcb') {
                        return (
                          <CacheImage
                            source={require('../../../../assets/images/icons/stp_card_jcb.png')}
                            type='image'
                            style={styles.ccIcon}
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

        <LoadingComponent visible={this.props.isBusy} />
      </View>
    );
  }
}

PaymentMenu.propTypes = {
  navigate: PropTypes.func.isRequired
};

export default PaymentMenu;
