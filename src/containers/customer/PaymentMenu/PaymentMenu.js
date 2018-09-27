import React, { Component } from 'react';
import { View, Image, Alert } from 'react-native';
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

  removeCategoryAtIndex(index) {
    Alert.alert(index);
  }

  render() {
    const Data = [ {
        image: 'https://placekitten.com/200/240',
        text: '8234',
        expDate: '03/19'
      }, {
        image: 'https://placekitten.com/200/240',
        text: '1234',
        expDate: '04/20'
      }
    ];

    return (
      <View style={styles.parent}>
        <View style={[styles.container, { marginTop: hp('7.389%') }]}>
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

          { Data.map((item, key)=>(
            <View key={key} style={{ flexDirection: 'row', marginTop: 10 }}>
              <EditableListItem
                text={item.text}
                expDate={item.expDate}
                onRemove={() =>
                  this.removeCategoryAtIndex(
                    'Are you sure you want to delete this payment method?'
                  )
                }
                leftIcon={
                  <Image
                    source={require('../../../../assets/images/Credit-Card.png')}
                    style={{
                      width: 28,
                      resizeMode: 'contain',
                      marginLeft: 10,
                      marginRight: 15
                    }}
                  />
                }
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
      </View>
    );
  }
}

PaymentMenu.propTypes = {
  navigate: PropTypes.func.isRequired
};

export default PaymentMenu;
