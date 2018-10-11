import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  StyleSheet,
  View,
  Alert,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import TextInput from '../../components/TextInput';
import BaseButton from '../../components/BaseButton';
import AvatarPicker from '../../components/AvatarPicker';
import { CloseIcon } from '../../components/imageUrls';

import { updateUserFromApi, createUserFromApi } from '../../actions/user';

const ContainerComponent = Platform.OS === 'ios' ? KeyboardAvoidingView : View;

class CreateStaffScreen extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.goBack(null)}>
        <Image
          style={{ width: 16, height: 16, marginLeft: 16 }}
          source={CloseIcon}
        />
      </TouchableOpacity>
    ),
  });

  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      isEdit: props.isEdit,
    }
  }

  onChangeText = (field, value) => {
    this.setState({
      user: {
        ...this.state.user,
        [field]: value,
      }
    })
  }

  handleSubmit = () => {
    const { isEdit, user } = this.state;
    if(isEdit){
      this.props.updateUserFromApi(user.id, user)
        .then(() => {
          this.renderAlert('Thành công', 'Cập nhật thành công');
        })
    }else {
      this.props.createUserFromApi(user).then(() => {
        this.renderAlert('Thành công', 'Tạo nhân viên thành công.', () => {
          this.props.navigation.goBack(null);
        });
      });
    }
  }

  renderAlert = (title, message, onPressOK) => (
    Alert.alert(
      title,
      message,
      [
        {text: 'OK', onPress: onPressOK},
      ],
      { cancelable: true }
    )
  )

  onPickedImage = (base64) => {
    this.onChangeText('avatar', `data:image/jpeg;base64,${base64}`);
  }

  render() {
    const { isEdit, user } = this.state;
    return (
      <KeyboardAwareScrollView extraScrollHeight={Platform.OS === 'ios' ? 10 : 100} enableOnAndroid style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>{isEdit ? `Chỉnh sửa thông tin`: `Tạo nhân viên mới`}</Text>
          <AvatarPicker image={user.avatar} onPickedImage={this.onPickedImage} />
          <TextInput
            label="Họ tên"
            value={user.fullName}
            onChangeText={(value) => this.onChangeText('fullName', value)}
          />
          <TextInput
            label="Tên đăng nhập"
            wrapperStyle={styles.input}
            value={user.username}
            onChangeText={(value) => this.onChangeText('username', value)}
          />
          <TextInput
            label="Mật khẩu"
            value={user.password}
            secureTextEntry
            wrapperStyle={styles.input}
            onChangeText={(value) => this.onChangeText('password', value)}
          />
          <TextInput
            label="Số chứng minh nhân dân"
            value={user.CMND}
            wrapperStyle={styles.input}
            onChangeText={(value) => this.onChangeText('CMND', value)}
            keyboardType="numeric"
          />
          <TextInput
            label="Địa chỉ"
            value="40E Ngô Đức Kế Quận 1"
            wrapperStyle={styles.input}
            value={user.address}
            onChangeText={(value) => this.onChangeText('address', value)}
          />
          <TextInput
            label="Số điện thoại"
            value={user.phoneNumber}
            wrapperStyle={styles.input}
            onChangeText={(value) => this.onChangeText('phoneNumber', value)}
            keyboardType="numeric"
          />
          <View style={styles.horizontal}>
            <View style={styles.horizontalItem}>
              <TextInput
                label="Lương"
                value={`${user.salary || ''}`}
                onChangeText={(value) => this.onChangeText('salary', value)}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.horizontalItem}>
              <TextInput
                label="Thưởng"
                value={`${user.bonus || ''}`}
                onChangeText={(value) => this.onChangeText('bonus', value)}
                keyboardType="numeric"
              />
            </View>
          </View>
          <TextInput
            label="Ghi chú"
            value={user.note}
            onChangeText={(value) => this.onChangeText('note', value)}
            wrapperStyle={styles.input}
            multiline = {true}
            numberOfLines = {4}
          />
          <BaseButton onPress={this.handleSubmit} containerStyle={styles.btnConfirm} title="Xác nhận" />
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    padding: 24,
  },
  title: {
    fontSize: 24,
    color: '#12283F',
    fontWeight: '700',
    lineHeight: 32,
    marginBottom: 23,
  },
  input: {
    marginTop: 20,
  },
  horizontal: {
    flexDirection: 'row',
    marginLeft: -8,
    marginRight: -8,
  },
  horizontalItem: {
    flex: 1,
    marginLeft: 8,
    marginRight: 8,
  },
  btnConfirm: {
    marginTop: 30,
    marginBottom: 30,
  }
});

const mapStateToProps = (state, ownProps) => {
  let user, isEdit;
  const { navigation } = ownProps;
  if(navigation && navigation.state && navigation.state.params){
    user = navigation.state.params.user;
    isEdit = navigation.state.params.isEdit;
  }
  return ({
    user,
    isEdit,
    loading: state.User.loading,
    error: state.User.error,
  })
}

const mapDispatchToProps = {
  updateUserFromApi,
  createUserFromApi,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateStaffScreen);