import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import Icon from 'react-native-vector-icons/EvilIcons';

import {
    FONT_FAMILY
} from '../../services/constants';

export default class SearchInput extends Component
{
    constructor()
    {
        super();

        this.state = { showPlaceholder: true, searchInputValue: '' }
    }

    onFocus = () =>
    {
        if( this.state.showPlaceholder && this.state.searchInputValue == '' )
            this.setState({ showPlaceholder: false });
        else if( this.this.state.searchInputValue != '' )
            this.setState({ showPlaceholder: true });
    }

    onBlur = () =>
    {
        if( !this.state.showPlaceholder )
            this.setState({ showPlaceholder: true })
    }

    render()
    {
        return (
            <View style = { styles.searchInputHolder }>
                <LinearGradient colors = {[ 'rgb(44, 44, 44)', 'rgb(52, 52, 52)' ]} style = { styles.LinearGradientStyle } >
                    {
                        ( this.state.showPlaceholder ) &&
                        <View style = { styles.placeholder }>
                            <Icon name = "search" size = { 25 } color = "rgb(151, 151, 151)" />
                            <Text style = { styles.searchText }>Search</Text>
                        </View>
                    }
                    
                    <TextInput
                        style = { styles.searchTextInput }
                        underlineColorAndroid = "transparent"
                        onFocus = { this.onFocus }
                        onBlur = { this.onBlur }
                        onChangeText = { ( text ) => this.setState({ searchInputValue: text }) }
                    />
                </LinearGradient>
            </View>
        )
    }
}

const styles = StyleSheet.create(
{
    searchInputHolder:
    {
        marginHorizontal: 15
    },

    searchTextInput:
    {
        flex: 1,
        padding: 0,
        margin: 0,
        paddingHorizontal: 10,
        fontSize: 15,
        color: 'white',
        alignSelf: 'stretch'
    },

    LinearGradientStyle:
    {       
        height: 40, 
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        position: 'relative',
        elevation: 2
    },

    placeholder:
    {
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center'
    },

    searchText:
    {
        fontSize: 18,
        justifyContent: 'center',
        color: 'rgb(151, 151, 151)',
        fontFamily: FONT_FAMILY
    }
});