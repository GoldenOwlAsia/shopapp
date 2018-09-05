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
    padding: 10,
    backgroundColor: '#F6F6F8',
  },
  text: {
    width: '100%'
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
        {!!this.props.label && <Text>{this.props.label}</Text>}
        <TextInput
          style={[styles.text, this.props.style]}
          underlineColorAndroid="transparent"
          {...this.props}
        />
      </KeyboardAvoidingView>
    );
  }
}

NormalTextInput.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  wrapperStyle: PropTypes.object
}

// skip this line if using Create React Native App
AppRegistry.registerComponent('ShopApp', () => NormalTextInput);

export default NormalTextInput;