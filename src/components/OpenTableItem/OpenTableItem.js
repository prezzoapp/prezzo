// @flow
import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import { Entypo } from '../VectorIcons';

export default class OpenTableItem extends Component {

    render() {
        const { item, index } = this.props.user;
        return (
            <TouchableOpacity style={styles.container}>
                <Image style={styles.userImage} source={this.props.user.item.userName!="" ? {uri: item.userImg} :require('../../../assets/images/item4.png')} />
                <View style={styles.textContainer}>
                    <Text style={styles.userName}>{item.userName}</Text>
                    <View style={styles.statusContainer}>
                        <Text style={styles.tableId}>Table {this.props.user.item.tableId}</Text>
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
