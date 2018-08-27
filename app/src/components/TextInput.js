import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Text,
  View,
  Platform
} from 'react-native';
import { PropTypes } from 'prop-types';

const styles = StyleSheet.create({
  wrapper: {
    padding: 15,
    backgroundColor: '#F6F6F8'
  }
});

class NormalTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  handleChange = (text) => {
    this.setState({text});
    this.props.onChange && this.props.onChange(text);
  }

  render() {
    return (
      <KeyboardAvoidingView style={[styles.wrapper, this.props.wrapperStyle]} behavior="padding" enabled>
        {this.props.label && <Text>{this.props.label}</Text>}
        <TextInput
          {...this.props}
        />
      </KeyboardAvoidingView>
    );
  }
}

NormalTextInput.propTypes = {
  onChange: PropTypes.func.required,
  placeholder: PropTypes.string,
  value: PropTypes.string
}

// skip this line if using Create React Native App
AppRegistry.registerComponent('ShopApp', () => NormalTextInput);

export default NormalTextInput;