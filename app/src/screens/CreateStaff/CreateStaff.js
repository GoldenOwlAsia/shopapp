import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import TextInput from '../../components/TextInput';
import BaseButton from '../../components/BaseButton';
import AvatarPicker from '../../components/AvatarPicker';
import { CloseIcon } from '../../components/imageUrls';

import { updateUserFromApi } from '../../actions/user';

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
      this.props.updateUserFromApi(user.id, user);
    }
  }

  render() {
    const { isEdit, user } = this.state;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>{isEdit ? `Chỉnh sửa thông tin`: `Tạo nhân viên mới`}</Text>
          <AvatarPicker />
          <TextInput
            label="Họ tên"
            wrapperStyle={styles.input}
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
          />
          <View style={styles.horizontal}>
            <View style={styles.horizontalItem}>
              <TextInput
                label="Lương"
                value="7,000,000 đ"
                wrapperStyle={styles.input}
              />
            </View>
            <View style={styles.horizontalItem}>
              <TextInput
                label="Thưởng"
                value="500,000 đ"
                wrapperStyle={styles.input}
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
      </ScrollView>
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
    fontFamily: 'Rubik-Medium',
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
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateStaffScreen);