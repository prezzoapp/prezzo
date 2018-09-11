// @flow
import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import { Entypo } from '@expo/vector-icons';

export default class OpenTableItem extends Component {

    render() {
        return (
            <TouchableOpacity style={styles.container}>
                <Image style={styles.userImage} source={require('../../../assets/images/item4.png')} />
                <View style={styles.textContainer}>
                    <Text style={styles.userName}>UserName</Text>
                    <View style={styles.statusContainer}>
                        <Text style={styles.tableId}>Table 21323</Text>
                        <Text style={styles.statusText}>• Waiter Reqested</Text>
                    </View>
                </View>
                <View style={styles.arrow}>
                    <Entypo name="chevron-right" size={30} color="white" />
                </View>
            </TouchableOpacity>
        );
    }
}