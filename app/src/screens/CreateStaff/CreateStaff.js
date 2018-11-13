import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  StyleSheet,
  View,
  Alert,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import TextInput from '../../components/TextInput';
import BaseButton from '../../components/BaseButton';
import AvatarPicker from '../../components/AvatarPicker';
import { CloseIcon } from '../../components/imageUrls';
import { updateUserFromApi, createUserFromApi } from '../../actions/user';
// import { number, password, username, name } from '../../utils/validator';
import { renderAlert, validateAddUserForm } from '../../utils/helpers';

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
    headerStyle: {
      borderBottomWidth: 0,
    },
  });

  constructor(props) {
    super(props);
    this.state = {
      user: !props.isEdit ? {
        fullName: null,
        username: null,
        password: null,
        CMND: null,
        address: null,
        phoneNumber: null,
        salary: null,
        bonus: null,
        note: null,
      } : {
        fullName: props.user.fullName,
        username: props.user.username,
        password: props.user.password,
        CMND: props.user.CMND,
        address: props.user.address,
        phoneNumber: props.user.phoneNumber,
        salary: props.user.salary === 0 ? '0' : props.user.salary,
        bonus: props.user.bonus === 0 ? '0' : props.user.bonus,
        note: props.user.note,
      },
      isEdit: props.isEdit,
      messageValidate: null,
      isValidate: false,
    }
  }

  onChangeText = (field, value) => {
    this.setState({
      user: {
        ...this.state.user,
        [field]: value.trim() === '' ? null : value,
      }
    })
  }

  handleValidateForm = (user) => Object.values(user).find(item => item === null);

  handleSubmit = async() => {
    const { isEdit, user } = this.state;
    if (this.handleValidateForm(user) !== undefined) {
      return renderAlert('Nhắc nhở', 'Điền đầy đủ thông tin nhân viên');
    }
    const resultValidate = await validateAddUserForm(user);
    if (resultValidate.isValidate === true) {
      return renderAlert('Nhắc nhở', resultValidate.messageValidate);
    }
    if(isEdit){
      this.props.updateUserFromApi(this.props.user.id, user)
        .then(() => {
          renderAlert('Thành công', 'Cập nhật thành công', () => {this.props.navigation.goBack(null);});
        })
    }else {
      this.props.createUserFromApi(user).then(() => {
        renderAlert('Thành công', 'Tạo nhân viên thành công.', () => {
          this.props.navigation.goBack(null);
        });
      });
    }
  }

  onPickedImage = (base64) => {
    this.onChangeText('avatar', `data:image/jpeg;base64,${base64}`);
  }

  render() {
    const { isEdit, user } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{isEdit ? `Chỉnh sửa thông tin`: `Tạo nhân viên mới`}</Text>
        <KeyboardAwareScrollView extraScrollHeight={Platform.OS === 'ios' ? 10 : 100} enableOnAndroid style={styles.content}>
          <AvatarPicker image={this.props.user.avatar} onPickedImage={this.onPickedImage} />
          <TextInput
            label="Họ tên"
            value={user.fullName}
            onChangeText={(value) => this.onChangeText('fullName', value)}
          />
          <View style={{height: 5}} />
          <TextInput
            label="Tên đăng nhập"
            wrapperStyle={styles.input}
            value={user.username}
            onChangeText={(value) => this.onChangeText('username', value)}
          />
          <View style={{height: 5}} />
          <TextInput
            label="Mật khẩu"
            value={user.password}
            secureTextEntry
            wrapperStyle={styles.input}
            onChangeText={(value) => this.onChangeText('password', value)}
          />
          <View style={{height: 5}} />
          <TextInput
            label="Số chứng minh nhân dân"
            value={user.CMND}
            wrapperStyle={styles.input}
            onChangeText={(value) => this.onChangeText('CMND', value)}
            keyboardType="numeric"
          />
          <View style={{height: 5}} />
          <TextInput
            label="Địa chỉ"
            value="40E Ngô Đức Kế Quận 1"
            wrapperStyle={styles.input}
            value={user.address}
            onChangeText={(value) => this.onChangeText('address', value)}
          />
          <View style={{height: 5}} />
          <TextInput
            label="Số điện thoại"
            value={user.phoneNumber}
            wrapperStyle={styles.input}
            onChangeText={(value) => this.onChangeText('phoneNumber', value)}
            keyboardType="numeric"
          />
          <View style={{height: 5}} />
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
          <View style={{height: 5}} />
          <TextInput
            label="Ghi chú"
            value={user.note}
            onChangeText={(value) => this.onChangeText('note', value)}
            wrapperStyle={styles.input}
            multiline = {true}
            numberOfLines = {4}
          />
        </KeyboardAwareScrollView>
        <View style={{marginHorizontal: 24, alignItems: 'center'}}>
          <BaseButton onPress={this.handleSubmit} containerStyle={styles.btnConfirm} title="Xác nhận" />
        </View>
      </View>
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
    paddingLeft: 24,
    paddingBottom: 10,
    paddingTop: 24
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
    marginTop: 15,
    marginBottom: 20,
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