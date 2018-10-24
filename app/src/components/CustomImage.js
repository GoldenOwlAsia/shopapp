import React from 'react';
import PropTypes from 'prop-types';
import { Image, View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { AvatarHolder } from './imageUrls'

/* Component ==================================================================== */
class CustomImage extends React.PureComponent {
  
  constructor(props){
    super(props)
    this.state = {
      source: this.props.source,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ source: nextProps.source })
  }

  onError = () => {
    const { holder } = this.props;
    const imageHolder = holder ? holder : AvatarHolder
    this.setState({ source: imageHolder })
  }

  render(){
    const { source: propsSource, holder, ...rest } = this.props;
    const imageHolder = holder ? holder : AvatarHolder
    const { source } = this.state;
    let imageSource;
    let uri;
    if(source){
      imageSource = source.uri ? source : imageHolder
    }else {
      imageSource = imageHolder;
    }

    return (
      <Image source={imageSource} onError={this.onError} {...rest}  />
    )
  }
};
 
CustomImage.propTypes = {
};
CustomImage.defaultProps = {
};
CustomImage.componentName = 'CustomImage';

/* Style */
const styles = StyleSheet.create({

});
 
/* Export Component ==================================================================== */
export default CustomImage;