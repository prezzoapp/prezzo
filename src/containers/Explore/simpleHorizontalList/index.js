import React, { Component } from 'react';
import { FlatList, Text, View, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';

import ListItem from './listItem';

import Carousel from 'react-native-snap-carousel';

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
                { ( this.props.sectionName === 'trending' ) &&
                    <FlatList
                        initialNumToRender = { 10 }
                        contentContainerStyle={{ paddingLeft: 15, paddingBottom: 15 }}
                        horizontal={true}
                        keyExtractor={(item, index) => item.id}
                        data={this.props.item}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) =>
                            <ListItem
                                item={item} sectionName={this.props.sectionName}
                            />
                        }
                    />
                }

                { ( this.props.sectionName === 'featured' ) &&
                    <View style = {{ paddingBottom: 15 }}>
                        <Carousel
                            layout={'default'}
                            ref={(c) => { this._carousel = c; }}
                            data={this.props.item}
                            sliderWidth={Dimensions.get('window').width}
                            itemWidth={Dimensions.get('window').width - 50}
                            renderItem={({ item }) =>
                                <ListItem
                                    item={item} sectionName={this.props.sectionName}
                                />
                            }
                        />
                    </View>
                }
            </View>
        )
    }
}