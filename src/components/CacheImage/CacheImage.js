import React, { Component } from 'react';
import { ImageBackground, Image } from 'react-native';
import shorthash from 'shorthash';
import { FileSystem, Asset } from 'expo';
import PropTypes from 'prop-types';

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
      console.log(path);
      const image = await FileSystem.getInfoAsync(path);

      if(image.exists && this._isMounted) {
        this.setState({
          imgSource: {uri: image.uri}
        });
        return;
      }

      const newImage = await FileSystem.downloadAsync(imageSource, path);
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
        this.setState({
          imgSource: {uri: asset.localUri}
        });
      } else {
        await asset.downloadAsync();
        if(asset.localUri && this._isMounted) {
          this.setState({
            imgSource: {uri: asset.localUri}
          });
        }
      }
    } catch(e) {
      console.log(e);
    }
  };

  downloadAndCacheImage(imageSource) {
    if(typeof imageSource === 'string' && this.props.selectImageThroughImagePicker) {
      this.setState({
        imgSource: {uri: imageSource}
      });
    } else if(typeof imageSource === 'string' && this.props.selectImageThroughImagePicker === false) {
      this.downloadAndCacheRemoteImage(imageSource);
    } else if(typeof imageSource === 'number') {
      this.downloadAndCacheLocalImage(imageSource);
    } else if(imageSource === null && this._isMounted) {
      this.setState({
        imgSource: null
      });
    }
  }

  render() {
    const { style, imageStyle } = this.props;
    console.log('Component rerender...');
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

CacheImage.propTypes = {
  // source: PropTypes.oneOfType([
  //   PropTypes.string,
  //   PropTypes.number
  // ]),
  // type: PropTypes.string.isRequired,
  // style: PropTypes.object.isRequired,
  // imageStyle: PropTypes.object,
  // selectImageThroughImagePicker: PropTypes.bool,
  // deletePreviousImage: PropTypes.func
};

CacheImage.defaultProps = {
  source: null,
  imageStyle: null,
  selectImageThroughImagePicker: false,
  deletePreviousImage: null
};
