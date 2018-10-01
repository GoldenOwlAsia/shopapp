import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  TextInput,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import TouchableView from '../components/TouchableView';
import { colors } from '../utils/constants';

import { ownerLogin } from '../actions/auth';
import { OWNER_LOGIN_SUCCESS } from '../actions/types';

class OwnerLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codeValue: '',
      index: 0,
      loading: false,
    }
  }

  onChangeText = (text) => {
    this.setState({ codeValue: text, index: text.length - 1 }, () => {
      if(this.state.codeValue.length === 4){
        this.hiddenInput.blur();  
        setTimeout(() => {
          this.handleLogin(this.state.codeValue);
        }, 500);
      }
    });
  }

  onSelect = (index) => {
    this.hiddenInput.focus();
  }

  handleLogin = async (code) => {
    this.setState({ loading: true });
    const result = await this.props.ownerLogin({ code });
    this.setState({ loading: false });
    console.log('owner login result: ', result);
    if (result.type === OWNER_LOGIN_SUCCESS) {
      await AsyncStorage.setItem('authToken', result.payload.authToken);
      await AsyncStorage.setItem('isOwner', 'true');
    
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Owner' })],
        key: null,
      });
      this.props.navigation.dispatch(resetAction);

    }else {
      Alert.alert('Error', 'Invalid code');
    }
  }

  render() {
    const { codeValue, index, loading } = this.state;
    if(loading){
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator animating size="large" />
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <Text style={styles.guide}>
          Chúng tôi đã gửi cho bạn 4 kí tự bảo mật đến
          số điện thoại của bạn để xác nhận đăng nhập
        </Text>
        <Text style={styles.hint}>Nhập mã bảo mật ở đây</Text>
        <View style={styles.codeContainer}>
          <CodeElement onSelect={this.onSelect} index={0} value={codeValue.charAt(0)} editing={index === 0} />
          <CodeElement onSelect={this.onSelect} index={1} value={codeValue.charAt(1)} editing={index === 1} />
          <CodeElement onSelect={this.onSelect} index={2} value={codeValue.charAt(2)} editing={index === 2} />
          <CodeElement onSelect={this.onSelect} index={3} value={codeValue.charAt(3)} editing={index === 3} />
        </View>
        <TextInput value={this.state.codeValue} style={styles.hiddenInput} ref={(ref)=>{this.hiddenInput = ref}} returnKeyType="done" maxLength={4} keyboardType="numeric" onChangeText={this.onChangeText} autoFocus />
        <Text style={styles.hint}>Không nhận được tin nhắn.</Text>
        <TouchableView>
          <Text style={styles.resendText}>Gửi lại!</Text>
        </TouchableView>
      </View>
    )
  }
}

const CodeElement = (props) => {
  const { index, value, editing, onSelect } = props;

  const _onSelect = () => onSelect(index);

  return (
    <TouchableView onPress={_onSelect}>
      <View style={[styles.codeWrap, editing && styles.codeWrapEditing]}>
          <Text>{value}</Text>
      </View>
    </TouchableView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: '#FFF',
  },
  loadingContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  guide: {
    marginBottom: 50, 
    textAlign: 'center',
    fontFamily: "Rubik-Regular",
    lineHeight: 22,
    fontSize: 16,
    color: "#12283f"
  },
  hint: {
    textAlign: 'center',
    fontFamily: "Rubik-Regular",
    lineHeight: 24,
    fontSize: 18,
    color: "#868686"
  },
  codeContainer: {
    marginTop: 30,
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  codeWrap: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#F7F7F7',
    backgroundColor: '#F7F7F7',
  },
  codeWrapEditing: {
    borderColor: '#eeeeee',
    backgroundColor: '#FFF',
  },
  resendText: {
    color: 'green',
    alignSelf: 'center',
    padding: 8,
  },
  hiddenInput: {
    width: 0,
    height: 0,
    position: 'absolute',
    left: -999,
  }
});

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = {
  ownerLogin
};

export default connect(mapStateToProps, mapDispatchToProps)(OwnerLogin);