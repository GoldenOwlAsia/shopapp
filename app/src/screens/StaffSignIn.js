import React from 'react';

import {
  View,
  StyleSheet
} from 'react-native';

import AuthHeader from '../components/AuthHeader';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import { ArrowIcon } from '../components/imageUrls';
import { colors } from "../utils/constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 15,
    marginRight: 15
  },
  contentWrapper: {
    flex: 1
  },
  buttonWrapper: {
    paddingBottom: 10
  },
  forgotPasswordText: {
    color: '#12283F'
  }
});

class SignInScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  static navigationOptions = {
    title: 'Staff sign in'
  };

  handleSignIn = () => {
    console.log('handle sign in');
  }

  onChangeUsername = (username) => {
    console.log('username: ', username);
    this.setState({
      username: username
    });
  }

  onChangePassword = (pass) => {
    console.log('password: ', pass);
    this.setState({
      password: pass
    });
  }

  goToForgotPassword = () => {
    console.log('go to forgot password!');
  }

  render() {
    return (
      <View style={styles.container}>
        <AuthHeader />

        <View style={styles.contentWrapper}>
          <TextInput
            label="Username"
            underlineColorAndroid="transparent"
            placeholder="username"
            value={this.state.username}
            onChangeText={this.onChangeUsername}
          />

          <TextInput
            label="Password"
            wrapperStyle={{marginTop: 15}}
            placeholder="password"
            underlineColorAndroid="transparent"
            secureTextEntry
            value={this.state.password}
            onChangeText={this.onChangePassword}
          />
        </View>

        <View style={styles.buttonWrapper}>
          <Button
            text="Sign in"
            primary
            centerText
            onPress={this.handleSignIn}
            rightIcon={ArrowIcon}
          />
          <Button
            text="Forgot password"
            centerText
            textStyle={styles.forgotPasswordText}
            onPress={this.goToForgotPassword}
          />
        </View>

      </View>
    );
  }
}

export default SignInScreen;