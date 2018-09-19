import React from 'react';
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
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Tạo nhân viên mới</Text>
          <AvatarPicker />
          <TextInput
            label="Họ tên"
            value="Trần Hồng Hạnh"
            wrapperStyle={styles.input}
          />
          <TextInput
            label="Tên đăng nhập"
            value="hanh_sale"
            wrapperStyle={styles.input}
          />
          <TextInput
            label="Mật khẩu"
            value="123456"
            secureTextEntry
            wrapperStyle={styles.input}
          />
          <TextInput
            label="Số chứng minh nhân dân"
            value="025122333"
            wrapperStyle={styles.input}
          />
          <TextInput
            label="Địa chỉ"
            value="40E Ngô Đức Kế Quận 1"
            wrapperStyle={styles.input}
          />
          <TextInput
            label="Số điện thoại"
            value="0988222112"
            wrapperStyle={styles.input}
          />
          <View style={styles.horizontal}>
            <View style={styles.horizontalItem}>
              <TextInput
                label="Số điện thoại"
                value="0988222112"
                wrapperStyle={styles.input}
              />
            </View>
            <View style={styles.horizontalItem}>
              <TextInput
                label="Số điện thoại"
                value="0988222112"
                wrapperStyle={styles.input}
              />
            </View>
          </View>
          <TextInput
            label="Ghi chú"
            value="Lorem ipsum dolor sit amet, eu tota zril nec, ad has zril eirmod. Eum eu alia dolores eligendi, eligendi expetendis vis in, duis posidonium."
            wrapperStyle={styles.input}
            multiline = {true}
            numberOfLines = {4}
          />
          <BaseButton onPress={() => this.props.navigation.goBack()} containerStyle={styles.btnConfirm} title="Xác nhận" />
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

export default CreateStaffScreen;