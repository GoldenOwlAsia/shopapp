import React from 'react';

import {
  View,
  StyleSheet,
  AsyncStorage,
  Image,
  Text,
  Alert,
  TouchableOpacity
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import AuthHeader from '../components/AuthHeader';
import TextInput from '../components/TextInput';
import { BackArrow } from '../components/imageUrls';
import BaseButton from '../components/BaseButton';
import TouchableView from '../components/TouchableView';
import { ArrowIcon } from '../components/imageUrls';
import { login } from '../actions/auth';
import { LOGIN_SUCCESS } from '../actions/types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#FFF',
  },
  contentWrapper: {
    // height: Dimensions.get('window').height / 3,
    justifyContent: 'center',
    marginBottom: 90
  },
  buttonWrapper: {
    paddingBottom: 10
  },
  forgotPasswordText: {
    marginTop: 16,
    fontSize: 14,
    fontWeight: "600",
    fontStyle: "normal",
    color: '#12283F',
    textAlign: 'center',
  },
  rightIcon: {
    width: 16,
    height: 16
  },
  headerAuth: {
    // height: Dimensions.get('window').height / 3,
    justifyContent: 'center',
    paddingTop: 50,
    paddingBottom: 80
  },
});

//TODO write a component
const RightIcon = () => (
  <Image resizeMode="contain" source={ArrowIcon} style={styles.rightIcon} />
)

class SignInScreen extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.goBack(null)}>
        <Image
          style={{ width: 24, height: 16, marginLeft: 16 }}
          source={BackArrow}
        />
      </TouchableOpacity>
    ),
    headerStyle: {
      borderBottomWidth: 0,
    },
  });

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loading: false,
    }
  }

  handleSignIn = async () => {
    try{
      this.setState({ loading: true });
      const result = await this.props.login(this.state.username, this.state.password);
      if (result.type === LOGIN_SUCCESS) {
        await AsyncStorage.setItem('authToken', result.payload.authToken);
        this.setState({ loading: false, username: '', password: '' }, () => {
          const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'MainStaff' })],
            key: null,
          });
          this.props.navigation.dispatch(resetAction);
        });
      }else {
        this.setState({ loading: false }, () => {
          Alert.alert(
            'Lỗi',
            'Tên đăng nhập hoặc mật khẩu không đúng. Vui lòng thử lại.',
            [],
            { cancelable: true }
          )
        });
      }
    }catch(error){
      this.setState({ loading: false });
      Alert.alert(
        'Lỗi',
        error.message,
        [],
        { cancelable: true }
      )
    }
  }

  onChangeUsername = (username) => {
    this.setState({
      username: username
    });
  }

  onChangePassword = (pass) => {
    this.setState({
      password: pass
    });
  }

  goToForgotPassword = () => {}

  onSubmitEditing = () => {
    this.passwordRef.input.focus()
  }

  onEndEditing = () => {
    this.handleSignIn()
  }

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView
          enableOnAndroid
          // contentContainerStyle={{ flex: 1 }}
        >
          <View style={styles.headerAuth}><AuthHeader /></View>
          <View style={styles.contentWrapper}>
            <TextInput
              label="Tên đăng nhập"
              value={this.state.username}
              onChangeText={this.onChangeUsername}
              returnKeyType={"next"}
              onSubmitEditing={this.onSubmitEditing}
              inputRef={(ref) => this.usernameRef = ref}
              style={{marginBottom: 10}}
            />

            <TextInput
              label="Mật khẩu"
              secureTextEntry
              value={this.state.password}
              onChangeText={this.onChangePassword}
              returnKeyType={"done"}
              inputRef={(ref) => this.passwordRef = ref}
              onSubmitEditing={this.onEndEditing}
            />
          </View>
            <BaseButton
              loading={this.state.loading}
              onPress={this.handleSignIn}
              IconRight={<RightIcon />}
              fullWidth title="Đăng nhập" />

            <TouchableView onPress={this.goToForgotPassword}>
              <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
            </TouchableView>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
	isAuthenticated: state.isAuthenticated,
	error: state.error
});

const mapDispatchToProps = {
  login
};


export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);