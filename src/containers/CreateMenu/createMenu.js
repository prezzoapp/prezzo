import React, { PureComponent } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';

// import Menus from './fakeMenus';

import MenuItem from './menuItem';

import { connect } from 'react-redux';

import * as actions from './actions';

import {
    FONT_FAMILY,
    FONT_FAMILY_BOLD,
    COLOR_BLACK,
    COLOR_GREEN
} from '../../services/constants';

class MenuItems extends PureComponent 
{
    static navigationOptions =
    {
        title: 'Create Menu',
        headerStyle: {          
          backgroundColor: '#2B2C2C',
          elevation: 0
        },

        headerTitleStyle:
        {

            fontWeight: 'bold',
        
            fontFamily: FONT_FAMILY
        },

        headerTintColor: '#fff'
    };
      
    constructor()
    {
        super();
    }

    renderFooter = () =>
    {
        return(
            <View style = { styles.footerSection }>
                <TouchableOpacity style = { styles.addAnotherCommonBtn } activeOpacity = { 0.6 }>
                    <Text style = { styles.addAnotherCommonBtnText }>Add Another Category</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style = { styles.addAnotherCommonBtn } activeOpacity = { 0.6 } onPress = {() => this.props.addNewItemInMenuList() }>
                    <Text style = { styles.addAnotherCommonBtnText }>Add Another Item</Text>
                </TouchableOpacity>                              
            </View>
        )
    }

    render()
    {
        return(
            <View style = { styles.container }>
                <View style = { styles.sectionHeader }>
                    <Text style = { styles.sectionHeaderText }>{ this.props.menusListReducer.categoryName }</Text>
                    <TouchableOpacity activeOpacity = { 0.6 }>
                        <Text style = { styles.addText }>Edit</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    keyExtractor = {( item, index ) => index}
                    data = { this.props.menusListReducer.menuState }
                    renderItem = {({ item }) =>
                        <MenuItem
                            item = { item }
                            addNewImageThumbnail = { ( parentID ) => this.props.addNewImageComponent( parentID ) } />}
                    ListFooterComponent = { this.renderFooter }
                />

                <View style = { styles.footerSection }>
                    <TouchableOpacity activeOpacity = { 0.6 } style = { styles.submitMenuBtn }>
                        <Text style = { styles.submitBtnText }>Submit Menu</Text>
                    </TouchableOpacity>
                </View>                
            </View>
        )
    }
}

const styles = StyleSheet.create(
{
    container:
    {
        flex: 1,
        backgroundColor: 'red',
        backgroundColor: COLOR_BLACK,
        paddingHorizontal: 20
    },

    sectionHeader:
    {
        borderBottomColor: 'rgb(157,157,157)',
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        paddingVertical: 10
    },

    sectionHeaderText:
    {
        color: '#fff',
        fontFamily: FONT_FAMILY,
        fontSize: 20
    },

    addText:
    {
        color: COLOR_GREEN,
        fontSize: 16,
        paddingRight: 13,
        fontFamily: FONT_FAMILY
    },

    addAnotherCommonBtn:
    {
        paddingVertical: 8,
        alignSelf: 'flex-start'
    },

    addAnotherCommonBtnText:
    {
        color: 'rgb(147,147,147)',
        fontFamily: FONT_FAMILY,
        fontSize: 18
    },

    footerSection:
    {
        padding: 15,
        justifyContent: 'center'
    },

    submitMenuBtn:
    {
        alignSelf: 'center',
        paddingHorizontal: 40,
        paddingVertical: 8,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: 'rgb(15,209,74)',
        elevation: 2
    },

    submitBtnText:
    {
        color: 'white',
        fontFamily: FONT_FAMILY_BOLD,
        fontSize: 15
    }
});

const mapStateToProps = ( state, ownProps ) =>
{
    return {
        menusListReducer: state.get('menusListReducer').toJS()
    }
}

export default connect(mapStateToProps, actions)(MenuItems);