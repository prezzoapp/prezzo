import React, { Component } from 'react';
import {
  View,
  Image,
  Alert,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  Modal
} from 'react-native';
import { PropTypes } from 'prop-types';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MenuButton from '../../../components/MenuButton';
import EditableListItem from '../../../components/EditableListItem';
import styles from './styles';

class PaymentMenu extends Component {
  static navigationOptions = {
    title: 'Payment Methods',
    headerStyle: {
      backgroundColor: '#2B2C2C',
      shadowColor: 'transparent',
      borderBottomWidth: 0
    },
    headerTintColor: '#fff'
  };

  static displayName = 'Payment Methods';

  componentDidMount() {
    this.props.listCreditCards();
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
    console.log(this.props.isBusy);
    return (
      <View style={styles.parent}>
        <ScrollView style={styles.scrollViewStyle} bounces={false}>
          <View style={[styles.container, { paddingVertical: hp('7%') }]}>
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

            <MenuButton
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
            />
          </View>
        </ScrollView>

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
