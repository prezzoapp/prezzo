// @flow
import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

export default class QueuedTableItem extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.userImage} source={require('../../../assets/images/item4.png')} />
                <View style={styles.textContainer}>
                    <Text style={styles.userName}>UserName</Text>
                    <View style={styles.statusContainer}>
                        <Text style={styles.tableId}>Table 21323</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.delete}>
                    <FontAwesome name="trash-o" size={30} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.add}>
                    <MaterialIcons name="add" size={30} color="white" />
                </TouchableOpacity>
            </View>
        );
    }
}