import React, { Component } from 'react';
import { ImageBackground, Image } from 'react-native';
import shorthash from 'shorthash';
import { FileSystem, Asset } from 'expo';

export default class CacheImage extends Component {
  _isMounted = false;
  state = {
    imgSource: null
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.source !== this.props.source) {
      console.log('next props source: ', nextProps.source);
      console.log('this props source: ', this.props.source);
      this.downloadAndCacheImage(nextProps.source);
    }
  }

  componentDidMount() {
    this._isMounted = true;
    this.downloadAndCacheImage(this.props.source);
  }

  downloadAndCacheRemoteImage = async (imageSource) => {
    try {
      const name = shorthash.unique(imageSource);
      const path = `${FileSystem.cacheDirectory}${name}.jpeg`;
      const image = await FileSystem.getInfoAsync(path);

      if(image.exists && this._isMounted) {
        console.log('read remote image from cache');
        this.setState({
          imgSource: {uri: image.uri}
        });
        return;
      }

      console.log('downloading remote image to cache');
      const newImage = await FileSystem.downloadAsync(imageSource, path);
      console.log('download remote image complete');
      if(newImage.uri && this._isMounted) {
        this.setState({
          imgSource: {uri: newImage.uri}
        });
      }
    } catch(e) {
      console.log(e);
    }
  };

  downloadAndCacheLocalImage = async (imageSource) => {
    try {
      const asset = await Asset.fromModule(imageSource);
      if(asset.localUri && this._isMounted) {
        //console.log('read local image from cache');
        this.setState({
          imgSource: {uri: asset.localUri}
        });
      } else {
        //console.log('downloading local image to cache');
        await asset.downloadAsync();
        if(asset.localUri && this._isMounted) {
          this.setState({
            imgSource: {uri: asset.localUri}
          });
        }
      }
      //console.log(asset.localUri);
    } catch(e) {
      console.log(e);
    }
  };

  downloadAndCacheImage(imageSource) {
    if(typeof imageSource === 'string') {
      console.log('Type of image source: ', typeof imageSource);
      this.downloadAndCacheRemoteImage(imageSource);
    } else if(typeof imageSource === 'number') {
      console.log('Type of image source: ', typeof imageSource);
      this.downloadAndCacheLocalImage(imageSource);
    } else if(imageSource === undefined && this._isMounted) {
      console.log('Type of image source: ', typeof imageSource);
      this.setState({
        imgSource: null
      });
    }
  }

  render() {
    const { style, imageStyle } = this.props;
    if(this.props.type === 'backgroundImage') {
      return (
        <ImageBackground
          style={style}
          source={this.state.imgSource}
          imageStyle={imageStyle}
        >
          {this.props.children}
        </ImageBackground>
      );
    }
    return (
      <Image
        style={style}
        source={this.state.imgSource}
      />
    )
  }
}
