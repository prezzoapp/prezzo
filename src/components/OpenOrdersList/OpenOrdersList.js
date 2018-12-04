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
    props.completeOrder(props.data._id);
  };

  return (
    <View style={styles.container}>
      {(() => {
        if (!props.data) {
          return (
            <View style={styles.notFoundHolder}>
              <Text style={styles.message}>Order has been completed.</Text>
            </View>
          )
        }
        return (
          <View style={{ flex: 1 }}>
            <FlatList
              keyExtractor={item => item._id.toString()}
              showsVerticalScrollIndicator={false}
              data={
                props.data !== null && props.data.items.length !== 0
                  ? props.data.items
                  : []
              }
              renderItem={({ item }) => (
                <ActivityListItem
                  item={item}
                  orderId={props.data._id}
                  type="vendor"
                  checkStatusAndCancelItem={(orderId, itemId) =>
                    props.checkStatusAndCancelItem(orderId, itemId)
                  }
                />
              )}
            />
            {(() => {
              if (props.tabName === 'openOrder') {
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
        );
      })()}
    </View>
  );
}

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
