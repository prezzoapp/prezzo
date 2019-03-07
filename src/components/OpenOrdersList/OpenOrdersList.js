import React from 'react';
import { View, FlatList, Text } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { FONT_FAMILY_MEDIUM } from '../../services/constants';
import ActivityListItem from '../ActivityListItem';
import Button from '../Button';
import styles from './styles';

const OpenOrdersList = props => {
  const closeTable = () => {
    props.completeOrder();
  };

  const order = props.data;

  renderItem = data => (
    <ActivityListItem
      item={data.item}
      orderId={order.get('_id')}
      type="vendor"
      innerTab={props.innerTab}
      checkStatusAndCancelItem={itemId =>
        props.checkStatusAndCancelItem(itemId)
      }
    />
  );

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <FlatList
          keyExtractor={item => item.get('_id').toString()}
          showsVerticalScrollIndicator={false}
          data={
            order !== null && order.get('items').size !== 0
              ? order.get('items').toArray()
              : []
          }
          renderItem={this.renderItem}
        />
        {(() => {
          if (
            props.innerTab === 'open' ||
            props.innerTab === 'waiterRequested'
          ) {
            return (
              <View style={styles.footerContainer}>
                <Button
                  style={buttonStyles.closeTableBtn}
                  textStyle={buttonStyles.closeTableBtnText}
                  onPress={closeTable}
                >
                  Close Table
                </Button>
              </View>
            );
          }
        })()}
      </View>
    </View>
  );
};

const buttonStyles = {
  closeTableBtn: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    width: wp('37.33%'),
    height: hp('4.92%'),
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: hp('1%')
  },

  closeTableBtnText: {
    fontSize: wp('5.33%'),
    fontFamily: FONT_FAMILY_MEDIUM,
    color: 'rgba(255,255,255,0.5)',
    paddingTop: 0,
    paddingBottom: 0,
    justifyContent: 'center'
  }
}

export default OpenOrdersList;
