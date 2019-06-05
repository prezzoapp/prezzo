import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  AsyncStorage,
  TouchableOpacity,
  InteractionManager
} from 'react-native';
import PropTypes from 'prop-types';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import MenuButton from '../../../components/MenuButton';
import { Feather } from '../../../components/VectorIcons';
import EditableListItem from '../../../components/EditableListItem';
import styles from './styles';
import { FONT_FAMILY_MEDIUM, COLOR_WHITE } from '../../../services/constants';
import LoadingComponent from '../../../components/LoadingComponent';
import CacheImage from '../../../components/CacheImage';
import {
  showAlertWithMessage,
  manuallyLogout
} from '../../../services/commonFunctions';

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
        style={styles.headerLeftBtn}
      >
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
        .catch(err => {
          if(err.code === 401) {
            manuallyLogout(err, () => this.props.userLogout())
          } else {
            showAlertWithMessage('Uh-oh!', err);
          }
        });
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
    .catch(err => {
        if (err.code === 401) {
          manuallyLogout(err, () => this.props.userLogout());
        } else {
          showAlertWithMessage('Uh-oh!', err);
        }
      });
  }

  removeCardAtIndex(id) {
    this.removeCreditCard(id);
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

  renderLeftIcon(item) {
    if (item.get('type') === 'braintree-visa') {
      return (
        <CacheImage
          source={require('../../../../assets/images/icons/stp_card_visa.png')}
          type='image'
          style={styles.ccIcon}
        />
      );
    } else if (item.get('type') === 'braintree-mastercard') {
      return (
        <CacheImage
          source={require('../../../../assets/images/icons/stp_card_mastercard.png')}
          type='image'
          style={styles.ccIcon}
        />
      );
    } else if (item.get('type') === 'braintree-discover') {
      return (
        <CacheImage
          source={require('../../../../assets/images/icons/stp_card_discover.png')}
          type='image'
          style={styles.ccIcon}
        />
      );
    } else if (item.get('type') === 'braintree-jcb') {
      return (
        <CacheImage
          source={require('../../../../assets/images/icons/stp_card_jcb.png')}
          type='image'
          style={styles.ccIcon}
        />
      );
    }
  };

  render() {
    const data = this.props.data;
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
                style={styles.creditCardIcon}
              />
            }
          />

          <ScrollView style={styles.scrollViewStyle}>
            { data &&
              data.size !== 0 &&
              data.map((item, key) => (
                <View key={item.get('_id').toString()}>
                  <EditableListItem
                    text={item.get('readableIdentifier')}
                    expDate={item.get('expDate')}
                    onRemove={() => this.removeCardAtIndex(item.get('_id'))}
                    leftIcon={this.renderLeftIcon(item)}
                />
              </View>
            ))}
          </ScrollView>
        </View>

        <LoadingComponent visible={this.props.isBusy} />
      </View>
    );
  }
}

PaymentMenu.propTypes = {
  data: PropTypes.array.isRequired,
  navigate: PropTypes.func.isRequired,
  listCreditCards: PropTypes.func.isRequired,
  removeCreditCard: PropTypes.func.isRequired,
  userLogout: PropTypes.func.isRequired,
  isBusy: PropTypes.bool.isRequired
};

export default PaymentMenu;
