import React, { Component } from 'react';
import { Modal, View, Image, Text, FlatList } from 'react-native';
import { BlurView } from 'expo';
import PropTypes from 'prop-types';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import styles from './styles';
import AddReviewListItem from '../AddReviewListItem';
import Button from '../Button';

import {
  COLOR_WHITE,
  FONT_FAMILY_MEDIUM,
  SF_PRO_TEXT_BOLD
} from '../../services/constants';

const ReviewItems = props => {
  renderHeader = () => (
    <View style={styles.listHeader}>
      <Image
        source={require('../../../assets/images/custom_modal_icons/thumbs_up_icon.png')}
        style={styles.imageIcon}
      />
      <Text style={styles.title}>Congratulations!</Text>
      <Text style={styles.message}>
        Rate your dishes and add photos for other users to see!
      </Text>
    </View>
  );

  renderFooter = () => (
    <View style={styles.listFooter}>
      <Button
        style={buttonStyles.submitReviewBtn}
        textStyle={buttonStyles.submitReviewBtnText}
        onPress={() => null}>
        Submit Review
      </Button>

      <Button
        style={buttonStyles.closeReviewBtn}
        textStyle={buttonStyles.closeReviewBtnText}
        onPress={() => props.dismissModal()}>
        Close Review
      </Button>
    </View>
  );

  return(
    <Modal
      animationType="slide"
      transparent
      visible={props.modalVisible}
      onRequestClose={() => null}
    >
      <View style={styles.container}>
        <View style={styles.modalHolder}>
          <BlurView style={styles.blurView} tint="default" intensity={95} />
          <FlatList
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
            data={props.selectedItem.data}
            ListHeaderComponent={() => renderHeader()}
            ListFooterComponent={() => renderFooter()}
            renderItem={({ item }) => <AddReviewListItem item={item} />}
          />
        </View>
      </View>
    </Modal>
  );
};

const buttonStyles = {
  submitReviewBtn: {
    backgroundColor: '#2ED573',
    borderColor: '#0DD24A',
    width: wp('41.33%'),
    height: hp('4.92%'),
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: hp('5.78%'),
    marginBottom: hp('3.81%')
  },

  submitReviewBtnText: {
    fontSize: wp('3.46%'),
    fontFamily: SF_PRO_TEXT_BOLD,
    color: COLOR_WHITE,
    paddingTop: 0,
    paddingBottom: 0,
    justifyContent: 'center'
  },

  closeReviewBtn: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    width: wp('41.33%'),
    height: hp('4.92%'),
    justifyContent: 'center',
    borderRadius: 8,
    marginBottom: hp('5.66%')
  },

  closeReviewBtnText: {
    fontSize: wp('5.33%'),
    fontFamily: FONT_FAMILY_MEDIUM,
    color: 'rgba(255,255,255,0.5)',
    paddingTop: 0,
    paddingBottom: 0,
    justifyContent: 'center'
  }
};

ReviewItems.propTypes = {
  dismissModal: PropTypes.func.isRequired,
  selectedItem: PropTypes.object.isRequired,
  modalVisible: PropTypes.bool.isRequired
};

export default ReviewItems;
