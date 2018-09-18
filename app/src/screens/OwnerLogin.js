import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { colors } from '../utils/constants';

import { ownerLogin } from '../actions/auth';
import { OWNER_LOGIN_SUCCESS } from '../actions/types';

class OwnerLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: ['', '', '', '']
    }
  }

  onChangeCode = (index, character) => {
    const code = [...this.state.code];
    code[index] = character;
    this.setState({
      code
    });
    const emptyField = code.filter((char) => !char && char !== '0').length;
    if (!emptyField) {
      this.handleLogin(code);
    }
  }

  handleLogin = async (codeArr) => {
    const code = codeArr.join('');
    const result = await this.props.ownerLogin({ code });
    console.log('owner login result: ', result);
    if (result.type === OWNER_LOGIN_SUCCESS) {
      this.props.navigation.navigate('Owner');
    }
  }

  renderInputs = () => {
    return this.state.code.map((value, index) => {
      return (
        <TextInput
          style={[styles.input, value ? styles.hasValue : {}]}
          keyboardType='numeric'
          maxLength={1}
          value={index}
          underlineColorAndroid="transparent"
          onChangeText={(text) => this.onChangeCode(index, text)}
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
    fontSize: 16,
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
    borderColor: colors.GREY_97,
    backgroundColor: colors.WHITE,
    marginLeft: 15,
    marginRight: 15,
    textAlign: 'center'
  },
  hasValue: {
    backgroundColor: colors.GREY_97
  }
});

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = {
  ownerLogin
};

export default connect(mapStateToProps, mapDispatchToProps)(OwnerLogin);