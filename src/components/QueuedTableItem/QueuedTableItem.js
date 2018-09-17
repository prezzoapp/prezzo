// @flow
import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import { FontAwesome, MaterialIcons } from '../VectorIcons';
import { ACCEPT_ORDER, DELETE_ORDER } from '../../services/constants';

export default class QueuedTableItem extends Component {

    render() {
        const { item, index } = this.props.user;
        return (
            <View style={styles.container}>
                <Image style={styles.userImage} source={this.props.user.item.userName!="" ? {uri: item.userImg} :require('../../../assets/images/item4.png')} />
                <View style={styles.textContainer}>
                    <Text style={styles.userName}>{item.userName}</Text>
                    <View style={styles.statusContainer}>
                        <Text style={styles.tableId}>Table {this.props.user.item.tableId}</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.delete} onPress={()=>this.props.handleQueuedTableItem(item.id,index,DELETE_ORDER)}>
                    <FontAwesome name="trash-o" size={30} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.add} onPress={()=>this.props.handleQueuedTableItem(item.id,index,ACCEPT_ORDER)}>
                    <MaterialIcons name="add" size={30} color="white" />
                </TouchableOpacity>
            </View>
        );
    }
}
