import React from 'react';
import PropTypes from 'prop-types';
import { ImagePicker, Permissions } from 'expo';
import { Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { PickAvatarIcon, EditIcon } from './imageUrls';

/* Component ==================================================================== */
class AvatarPicker extends React.PureComponent {
  
  constructor(props){
    super(props);
    this.state = {
      image: props.image,
      base64: null,
    }
  }

  checkPermission = async () => {
    try{
      const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        const { status: askStatus } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (askStatus === 'granted') {
          this.openImageGallery();
        } else {
          throw new Error('Camera permission not granted');
        }
      }else {
        this.openImageGallery();
      }

    }catch(error){
      alert(error);
    }
  };

  openImageGallery = async () => {
    const { onPickedImage, isAvatarPicker } = this.props;
    try{
      const { cancelled, base64, uri } = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        base64: true,
      });
      
      if (!cancelled) {
        if(isAvatarPicker){
          this.setState({ image: uri, base64 }, () => {
            if(onPickedImage){
              onPickedImage(base64, uri);
            }
          });
        }else {
          onPickedImage(base64, uri);
        }
      }
    }catch(error){
      throw error;
    }
  }

  render(){
    return (
      <TouchableOpacity onPress={this.checkPermission}>
        { this.state.image ?
        (
          <View style={styles.imageWrap}>
            <View style={styles.container}>
              <Image style={styles.avatar} source={{ uri: this.state.image }} />
            </View>
            <Image resizeMode="cover" style={styles.btnEdit} source={EditIcon} />
          </View>
        ) : 
        (
          <View style={styles.container}>
            <View style={styles.wrapButton}>
              <Image style={styles.btnAdd} source={PickAvatarIcon} />
            </View>
            <Text style={styles.label}>Chọn hình ảnh</Text>
          </View>
        )
      }
      </TouchableOpacity>
    )
  }
};
 
AvatarPicker.propTypes = {
  image: PropTypes.string,
  onPickedImage: PropTypes.func,
  isAvatarPicker: PropTypes.bool,
};
AvatarPicker.defaultProps = {
  image: null,
  isAvatarPicker: true,
};
AvatarPicker.componentName = 'AvatarPicker';

/* Style */
const styles = StyleSheet.create({
  container: {
    width: 116,
    height: 80,
    backgroundColor: '#F6F6F8',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  wrapButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  btnAdd: {
    width: '100%',
    height: '100%',
  },
  btnEdit: {
    marginLeft: 16,
    width: 24,
    height: 24,
  },
  label: {
    marginTop: 8,
    fontSize: 12,
    fontFamily: 'Rubik-Regular',
    color: '#C1C5CB',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  imageWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  }
  
});
 
/* Export Component ==================================================================== */
export default AvatarPicker;