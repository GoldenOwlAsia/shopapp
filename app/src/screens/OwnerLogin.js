import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput
} from 'react-native';

class OwnerLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: new Array(4)
    }
  }

  onChangeCode = (index, character) => {
    console.log('the character: ', character);
    console.log('index: ', index);
  }

  renderInputs = () => {
    console.log('code: ', this.state.code);
    return this.state.code.map((input, index) => {
      return (
        <TextInput
          style={styles.input}
          keyboardType='numeric'
          value={index}
          underlineColorAndroid="transparent"
        />
      )
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.hint}>
          We've sent you 4 digital security code. Please enter them here.
        </Text>

        <Text style={styles.label}></Text>
        <View style={styles.verifyCode}>
          {this.renderInputs()}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20
  },
  hint: {
    textAlign: 'center',
    paddingTop: 30,
    paddingBottom: 30
  },
  verifyCode: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: 'red',
    backgroundColor: 'grey',
    marginLeft: 15,
    marginRight: 15,
    textAlign: 'center'
  }
});

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = {
  
};

export default connect(mapStateToProps, mapDispatchToProps)(OwnerLogin);