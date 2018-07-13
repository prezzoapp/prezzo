import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import ItemImagePicker from './itemImagePicker';

import Icon from 'react-native-vector-icons/Feather';

import {
    FONT_FAMILY,
    FONT_FAMILY_BOLD,
    COLOR_BLACK,
    COLOR_GREEN,
    COLOR_DANGER
} from '../../services/constants';

export default class MenuItem extends Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        // if( nextProps.item.id === this.props.item.id )
        // {            
        //     return false;
        // }
        // else
        // {   
        //     console.log("Next Props Item ID: " + nextProps.item.id);
        //     console.log("Previous Props Item ID: " + this.props.item.id);         
        //     return true;
        // }

        return true;
    }

    changeText = (inputType, text) => {
        this.props.changeText(this.props.item.id, inputType, text);
    }

    render() {
        return (
            <View style={styles.menuItem}>
                <View style={styles.controlBtnsPanel}>
                    {this.props.item.editable &&
                        <View style={styles.controlBtnsPanel}>
                            <TouchableOpacity activeOpacity={0.6} style={styles.twoLineIconBtn} onPress={() => this.props.saveItem(this.props.item.id)}>
                                <Text style={styles.addText}>Save</Text>
                            </TouchableOpacity>

                            <TouchableOpacity activeOpacity={0.6} style={styles.twoLineIconBtn} onPress={() => this.props.deleteItem(this.props.item.id)}>
                                <Text style={[styles.addText, { color: COLOR_DANGER }]}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    }

                    <TouchableOpacity activeOpacity={0.6} style={styles.twoLineIconBtn}>
                        <Image source={require('../../../assets/images/two-lines-icon.png')} style={{ width: 30, height: 10 }} />
                    </TouchableOpacity>
                </View>

                <View style={styles.itemContainer}>
                    <View style={[styles.sectionHeader, (!this.props.item.editable && { paddingBottom: 10 })]}>
                        {(this.props.item.editable)
                            ?
                            <TextInput
                                autoFocus={true}
                                underlineColorAndroid="transparent"
                                value={this.props.item.name}
                                style={styles.textInput}
                                onChangeText={(text) => this.changeText('ITEM_NAME', text)}
                            />
                            :
                            <Text style={styles.sectionHeaderText}>{this.props.item.name}</Text>
                        }

                        {!this.props.item.editable &&
                            <TouchableOpacity activeOpacity={0.6} onPress={() => this.props.editItem(this.props.item.id)}>
                                <Text style={styles.addText} >Edit</Text>
                            </TouchableOpacity>
                        }
                    </View>
                    <View>
                        {(this.props.item.editable)
                            ?
                            <TextInput
                                underlineColorAndroid="transparent"
                                value={this.props.item.price}
                                style={styles.textInput}
                                onChangeText={(text) => this.changeText('ITEM_PRICE', text)}
                            />
                            :
                            <Text style={[styles.sectionHeaderText, styles.paddingBottom_10]}>{this.props.item.price}</Text>
                        }

                        {(this.props.item.editable)
                            ?
                            <TextInput
                                multiline={true}
                                underlineColorAndroid="transparent"
                                value={this.props.item.description}
                                style={styles.otherInfoTextInput}
                                onChangeText={(text) => this.changeText('ITEM_DESC', text)}
                            />
                            :
                            <Text style={[styles.otherInfoText, styles.paddingBottom_10]}>{this.props.item.description}</Text>
                        }
                    </View>
                    <View style={[styles.itemImagesWrapper]}>
                        {
                            this.props.item.itemImages.map((item, index) =>
                                (
                                    <ItemImagePicker
                                        key={index}
                                        image={item}
                                        editable={this.props.item.editable}
                                        changeImage={(imageID, imagePath) => this.props.changeImage(this.props.item.id, imageID, imagePath)}
                                        deleteImage={(imageID) => this.props.deleteImage(this.props.item.id, imageID)}
                                    />
                                ))

                        }
                        <TouchableOpacity style={styles.itemImagePickerBtn} onPress={() => this.props.addNewImageThumbnail(this.props.item.id)}>
                            <Icon title="Add More" name="plus" color="rgb(161,161,161)" size={28} style={styles.closeBtnIcon} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create(
    {
        menuItem:
        {
            marginBottom: 8
        },

        twoLineIconBtn:
        {
            paddingLeft: 10,
            paddingRight: 15,
            paddingVertical: 10
        },

        itemContainer:
        {
            paddingHorizontal: 15,
            backgroundColor: '#404040',
            borderRadius: 8,
            shadowColor: '#000',
            shadowOffset: { width: 5, height: 5 },
            shadowOpacity: 1,
            shadowRadius: 10,
            elevation: 5,
            paddingBottom: 15
        },

        sectionHeader:
        {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            paddingTop: 10
        },

        sectionHeaderText:
        {
            color: '#fff',
            fontFamily: FONT_FAMILY,
            fontSize: 17,
            flex: 1
        },

        otherInfoText:
        {
            fontSize: 15,
            color: '#fff',
            fontFamily: FONT_FAMILY
        },

        otherInfoTextInput:
        {
            fontSize: 15,
            color: '#fff',
            fontFamily: FONT_FAMILY,
            minHeight: 50,
            // backgroundColor: 'red',
            textAlignVertical: 'top',
            padding: 0
        },

        addText:
        {
            color: COLOR_GREEN,
            fontSize: 15,
            fontFamily: FONT_FAMILY
        },

        paddingBottom_10:
        {
            paddingBottom: 10
        },

        itemImagesWrapper:
        {
            flexDirection: 'row',
            flexWrap: 'wrap'
        },

        itemImagePickerBtn:
        {
            borderRadius: 8,
            marginRight: 15,
            width: 81,
            height: 81,
            marginTop: 15,
            justifyContent: 'center',
            alignItems: 'center'
        },

        controlBtnsPanel:
        {
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center'
        },

        textInput:
        {
            minHeight: 35,
            padding: 0,
            flex: 1,
            fontFamily: FONT_FAMILY,
            fontSize: 17,
            color: 'white',
            marginVertical: 0,
            textAlignVertical: 'top'
        }
    });