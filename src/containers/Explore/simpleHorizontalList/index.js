import React, { Component } from 'react';
import { FlatList, Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';

import ListItem from './listItem';

import { toJS } from 'immutable';

import {
    FONT_FAMILY,
    FONT_FAMILY_MEDIUM,
    FONT_FAMILY_BOLD
} from '../../../services/constants';

export default class SimpleHorizontalList extends Component {
    constructor() {
        super();
    }

    updateLikes = (id) => {
        this.props.selectedListItemIDAction(id);
        this.props.updateLikesAction(id);
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    contentContainerStyle={{ paddingLeft: 15 }}
                    horizontal={true}
                    keyExtractor={(item, index) => item.id}
                    data={this.props.item}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) =>
                        <ListItem
                            item={item}
                        />
                    }
                />
            </View>
        )
    }
}

const styles = StyleSheet.create(
    {

    });