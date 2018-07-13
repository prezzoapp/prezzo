import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import Icon from 'react-native-vector-icons/EvilIcons';

import {
    FONT_FAMILY, FONT_FAMILY_MEDIUM
} from '../../../services/constants';

export default class ListItem extends Component {
    constructor() {
        super();
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.selectedListItemID === this.props.item.id) {
            return true;
        }
        else {
            return false;
        }
    }

    render() {
        return (
            <View style={styles.listItem}>
                <ImageBackground source={this.props.item.imagePath} style={styles.image} imageStyle={{ borderRadius: 5 }}>
                    <LinearGradient
                        colors={['transparent', 'black']}
                        style={styles.linearGradientStyle}>
                        <TouchableOpacity activeOpacity={0.6}
                            style={styles.likeBtn}>
                            <Icon name="heart" size={25} color="rgb(255, 253, 250)" />
                            <Text style={styles.likesText}>{this.props.item.likes} likes</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </ImageBackground>
                <Text style={styles.restaurantName}>{this.props.item.restaurant}</Text>
                <Text style={styles.cityName}>{this.props.item.city}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create(
    {
        listItem:
        {
            marginRight: 15
        },

        image:
        {
            flex: 1,
            width: 128,
            height: 176,
            elevation: 5
        },

        likeBtn:
        {
            padding: 5,
            flexDirection: 'row',
            alignItems: 'center'
        },

        likesText:
        {
            color: 'rgb(255, 253, 250)',
            fontFamily: FONT_FAMILY,
            fontSize: 15,
            paddingLeft: 5
        },

        linearGradientStyle:
        {
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'flex-start',
            paddingBottom: 8,
            paddingLeft: 5,
            borderRadius: 5
        },

        restaurantName:
        {
            fontSize: 15,
            color: 'white',
            fontFamily: FONT_FAMILY_MEDIUM,
            paddingTop: 8
        },

        cityName:
        {
            paddingTop: 6,
            fontSize: 15,
            color: '#959595',
            fontFamily: FONT_FAMILY
        }
    });