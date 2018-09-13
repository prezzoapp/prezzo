//@flow
import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import { LinearGradient } from 'expo';
import { EvilIcons } from '@expo/vector-icons';
import styles from './styles';
import ExploreSearchInput from '../../../components/ExploreSearchInput';

export default class TableScreenHeader extends PureComponent {

    render() {
        return (
            <View style={styles.header}>
                <LinearGradient
                    colors={['rgb(0,0,0)', 'transparent']}
                    style={styles.linearGradientStyle}
                >
                    <ExploreSearchInput />
                    <View style={styles.detailContainer}>
                        <Image source={require('../../../../assets/images/item5.png')} style={styles.vendorImage} />
                        <View style={styles.nameContainer}>
                            <Text style={styles.vendorName}>Dummy</Text>
                            <Text style={styles.category}>Dummy</Text>
                        </View>
                    </View>
                </LinearGradient>
            </View>
        );
    }
}