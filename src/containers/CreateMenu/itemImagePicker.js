import React, { Component } from 'react';

import { TouchableOpacity, Image, StyleSheet, View } from 'react-native';

import ImagePicker from 'react-native-image-picker';

import Icon from 'react-native-vector-icons/Ionicons';

export default class ItemImagePicker extends Component
{
    constructor(props)
    {
        super(props);

        console.log("Array Length: " + this.props.imagesArrayLength);

        this.state = { itemImage: null }
    }

    componentDidMount()
    {
        this.setState({ itemImage: this.props.image.image_path });
    }

    itemPickerActionSheet = () =>
    {
        const options = { title: "Select an Item's Image" };

        ImagePicker.showImagePicker(options, (response) =>
        {
          if (response.didCancel)
          {
            console.log('User cancelled image upload');
          }
          else if (response.error)
          {
            console.log('ImagePicker Error: ', response.error);
          }
          else
          {
            console.log('Image URI: ', response.uri);
            this.setState({ itemImage: response.uri });
          }
        });
      }

    render()
    {
        //console.log("Image Picker Render called!");
        return(
            <View>
                {this.props.editable &&
                    <TouchableOpacity style = { styles.closeBtn } activeOpacity = { 0.6 }>
                        <Icon title = "Delete" name = "md-close" color = "black" size = { 14 }  style = { styles.closeBtnIcon } />
                    </TouchableOpacity>
                }

                <TouchableOpacity onPress = { this.itemPickerActionSheet } style = { styles.itemImagePickerBtn }>
                    <Image style = { styles.itemImage }
                        source = { this.props.image.image_path }
                    />             
                </TouchableOpacity>       
            </View>
        )
    }
}

const styles = StyleSheet.create(
{
    itemImagePickerBtn:
    {
        borderRadius: 12,
        marginRight: 15,
        elevation: 5,
        width: 81,
        height: 81,
        marginTop: 15
    },

    itemImage:
    {
        resizeMode: 'cover',
        borderRadius: 8,
        width: 81,
        height: 81,
        borderWidth: 1,
        borderColor: 'rgb(164,164,164)'
    },

    closeBtn:
    {
        width: 18,
        height: 18,
        borderRadius: 10,
        backgroundColor: 'white',
        position: 'absolute',
        top: 8,
        right: 8,
        zIndex: 9999,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },

    closeBtnIcon:
    {
        fontWeight: 'bold'
    }
});


{/*
        IMAGE PICKER DEFAULT CODE

        <TouchableOpacity onPress = { this.itemPickerActionSheet } style = { styles.itemImagePickerBtn }>
            <Image style = { styles.itemImage }
                source = {
                    this.state.itemImage
                    ? { uri: this.state.itemImage } 
                    : require('../../../assets/images/etc/default-avatar.png')}
            />             
        </TouchableOpacity>
        
        <View style = { styles.itemImagePickerBtn }>
            <Image style = { styles.itemImage }
                source = { this.props.image.image_path }
            />
        </View>  
*/}