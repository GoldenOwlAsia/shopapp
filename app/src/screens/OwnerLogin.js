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
  TouchableOpacity,
  Image
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import TouchableView from '../components/TouchableView';
import { BackArrow } from '../components/imageUrls';
import { ownerLogin } from '../actions/auth';
import { OWNER_LOGIN_SUCCESS } from '../actions/types';

class OwnerLogin extends Component {
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
      borderBottomWidth: 0
    }
  });

  constructor(props) {
    super(props);
    this.state = {
      codeValue: '',
      index: 0,
      loading: false
    };
    this.hiddenInputRef = React.createRef();
  }

  componentDidMount() {
    setTimeout(() => {
      this.onSelect();
    }, 100);
  }

  onChangeText = text => {
    this.setState({ codeValue: text, index: text.length }, () => {
      if (this.state.codeValue.length === 4) {
        this.hiddenInputRef.current.blur();
        setTimeout(() => {
          this.handleLogin(this.state.codeValue);
        }, 500);
      }
    });
  };

  onSelect = index => {
    this.hiddenInputRef.current.blur();
    setTimeout(() => {
      this.hiddenInputRef.current.focus();
    }, 100);
  };

  handleLogin = async code => {
    this.setState({ loading: true });
    const result = await this.props.ownerLogin({ code });
    this.setState({ loading: false });
    if (result.type === OWNER_LOGIN_SUCCESS) {
      await AsyncStorage.setItem('authToken', result.payload.authToken);
      await AsyncStorage.setItem('isOwner', 'true');

      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'MainOwner' })],
        key: null
      });
      this.props.navigation.dispatch(resetAction);
    } else {
      Alert.alert('Error', 'Invalid code');
      this.setState({ codeValue: '', index: 0 });
    }
  };

  render() {
    const { codeValue, index, loading } = this.state;
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator animating size="large" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView enableOnAndroid>
          <Text style={styles.guide}>
            Chúng tôi đã gửi cho bạn 4 kí tự bảo mật đến số điện thoại của bạn
            để xác nhận đăng nhập
          </Text>
          <Text style={styles.hint}>Nhập mã bảo mật ở đây</Text>
          <View style={styles.codeContainer}>
            <CodeElement
              onSelect={this.onSelect}
              index={0}
              value={codeValue.charAt(0)}
              editing={index === 0}
            />
            <CodeElement
              onSelect={this.onSelect}
              index={1}
              value={codeValue.charAt(1)}
              editing={index === 1}
            />
            <CodeElement
              onSelect={this.onSelect}
              index={2}
              value={codeValue.charAt(2)}
              editing={index === 2}
            />
            <CodeElement
              onSelect={this.onSelect}
              index={3}
              value={codeValue.charAt(3)}
              editing={index === 3}
            />
          </View>
          <TextInput
            value={this.state.codeValue}
            style={styles.hiddenInput}
            ref={this.hiddenInputRef}
            returnKeyType="done"
            maxLength={4}
            keyboardType="numeric"
            onChangeText={this.onChangeText}
            autoFocus
          />
          <Text style={styles.notMessage}>Không nhận được tin nhắn.</Text>
          <TouchableView>
            <Text style={styles.resendText}>Gửi lại!</Text>
          </TouchableView>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const CodeElement = props => {
  const { index, value, editing, onSelect } = props;
  const _onSelect = () => onSelect(index);
  return (
    <TouchableView
      onPress={_onSelect}
      style={[styles.codeWrap, editing && styles.codeWrapEditing]}
    >
      <Text style={styles.valueCode}>{value}</Text>
    </TouchableView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 40,
    backgroundColor: '#FFF'
  },
  loadingContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  guide: {
    marginBottom: 50,
    textAlign: 'center',
    lineHeight: 22,
    fontSize: 16
    // color: "#12283f",
  },
  hint: {
    textAlign: 'center',
    lineHeight: 24,
    fontSize: 18,
    color: '#868686'
  },
  notMessage: {
    textAlign: 'center',
    lineHeight: 24,
    fontSize: 14,
    color: '#868686'
  },
  codeContainer: {
    marginTop: 30,
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  codeWrap: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    backgroundColor: '#EEEEEE'
  },
  codeWrapEditing: {
    borderColor: '#EEEEEE',
    backgroundColor: '#FFFFFF'
    // shadowColor: '#EDF1FF'
  },
  valueCode: {
    fontSize: 24,
    fontWeight: '600'
  },
  resendText: {
    color: '#5175FF',
    alignSelf: 'center',
    fontSize: 16
  },
  hiddenInput: {
    // width: 0,
    // height: 0,
    position: 'absolute',
    left: -999
  }
});

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  ownerLogin
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OwnerLogin);
