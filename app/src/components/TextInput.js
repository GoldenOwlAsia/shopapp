import React, { Component } from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import { PropTypes } from 'prop-types';
import { TextField } from 'react-native-material-textfield';

const styles = StyleSheet.create({
  containerStyle: {
    borderRadius: 6,
    backgroundColor: "#f6f6f8",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#eeeeee",
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 14,
    lineHeight: 19,
    fontWeight: 'normal',
    color: "#caced4",
  },
  textInput: {
    fontSize: 16,
    fontWeight: '600',
    color: "#12283f",
  }
});

class NormalTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  handleChange = (text) => {
    this.setState({text});
    this.props.onChangeText && this.props.onChangeText(text);
  }

  render(){
    const { label, value, spaceTop, inputRef, ...rest } = this.props;
    return (
        <TextField
          {...rest}
          label={label}
          onChangeText={this.handleChange}
          containerStyle={[styles.containerStyle, spaceTop && { marginTop: 10 }]}
          tintColor="#8f8b99"
          baseColor="#8f8b99"
          labelFontSize={14}
          titleFontSize={24}
          fontSize={16}
          textColor={'#12283f'}
          lineWidth={0}
          activeLineWidth={0}
          style={styles.textInput}
          autoCapitalize={'none'}
          value={value ? value : this.state.text}
          ref={inputRef}
        />
    )
  }
}

NormalTextInput.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  wrapperStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
}

NormalTextInput.defaultProps = {
  spaceTop: true,
}

export default NormalTextInput;