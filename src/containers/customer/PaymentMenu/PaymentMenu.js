import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Alert,
  ScrollView,
  ActivityIndicator,
  Modal,
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
        .catch(e => {
        this.showAlert(e.message, 300);
      });
    });
  }

  showAlert(message, duration) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      alert(message);
    }, duration);
  }

  checkResponseMessage() {
    AsyncStorage.getItem('response_message').then(msg => {
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
            onPress={() =>
              this.props.navigate({
                routeName: 'PaymentDetails',
                params: { title: 'Add Credit Card' }
              })
            }
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
                    text={item.readableIdentifier}
                    expDate={item.expDate}
                    onRemove={() => this.removeCardAtIndex(item.get('_id'))}
                    leftIcon={this.renderLeftIcon(item)}
                />
              </View>
            ))}
          </ScrollView>
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
