import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  Alert,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import TextInput from '../components/TextInput';
import AvatarPicker from '../components/AvatarPicker';
import BaseButton from '../components/BaseButton';
import ColorPicker from '../components/ColorPicker';
import SelectSize from '../components/SelectSize';
import ListImagePicker from '../components/ListImagePicker';
import { CloseIcon } from '../components/imageUrls';
import { handleCreateProduct, getCategories } from '../actions/product';
import { validateAddProductForm } from './../utils/helpers';

const COLORS = [
  { id: 1, color: 'white' },
  { id: 2, color: '#f46969' },
  { id: 3, color: '#87acf0' },
  { id: 4, color: 'rgba(248, 225, 82, 0.51)' },
  { id: 5, color: 'rgba(100, 142, 68, 0.51)' },
  { id: 6, color: 'rgba(121, 56, 130, 0.51)' },
  { id: 7, color: 'rgba(0, 0, 0, 0.51)' },
]

const SIZES = [
  { value: '8 (EU)' },
  { value: '10 (EU)' },
  { value: '12 (EU)' },
]

class CreateProduct extends Component {

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
      categories: [],
      product: {
        color: COLORS[0].color,
        name: null,
        category: null,
        quantity: null,
        size: null,
        importPrice: null,
        price: null,
        description: null,
        images: [],
      },
    }
  }

  componentDidMount() {
    this.props.getCategories()
      .then(categories => {
        this.setState({ categories })
      })
  }

  handleValidateForm = (product) => Object.values(product).find(item => item === null);

  onChangeText = (field, value) => {
    if (field === 'images') {
      this.setState({
        product: {
          ...this.state.product,
          [field]: value,
        }
      })
    } else {
      this.setState({
        product: {
          ...this.state.product,
          [field]: value.trim() === '' ? null : value,
        }
      })
    }
  }

  renderAlert = (title, message, onPressOK) => (
    Alert.alert(
      title,
      message,
      [
        { text: 'OK', onPress: onPressOK },
      ],
      { cancelable: true }
    )
  )

  handleSubmit = async () => {
    if (this.handleValidateForm(this.state.product) !== undefined) {
      return this.renderAlert('Nhắc nhở', 'Điền đầy đủ thông tin sản phẩm');
    }
    const resultValidate = await validateAddProductForm(this.state.product);
    if (resultValidate.isValidate === true) {
      return this.renderAlert('Nhắc nhở', resultValidate.messageValidate);
    }
    this.props.handleCreateProduct(this.state.product).then(() => {
      this.renderAlert('Thành công', 'Tạo sản phẩm thành công', () => {
        this.props.navigation.goBack(null);
      });
    })
  }

  render() {
    const { name, color, quantity, importPrice, price, description } = this.state.product;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Tạo sản phẩm mới</Text>
        <KeyboardAwareScrollView extraScrollHeight={Platform.OS === 'ios' ? 10 : 100} enableOnAndroid style={styles.content}>
          <ListImagePicker onImagesChange={(value) => this.onChangeText('images', value)} />
          <ColorPicker
            colorList={COLORS}
            color={color}
            onItemPress={(value) => this.onChangeText('color', value)}
          />
          <TextInput
            label="Tên sản phẩm"
            value={name}
            onChangeText={(value) => this.onChangeText('name', value)}
          />
          <View style={{ height: 5 }} />
          <SelectSize
            onSelectedChange={(value) => this.onChangeText('category', value)}
            label={'Loại sản phẩm'} data={this.state.categories}
          />
          <View style={{ height: 5 }} />
          <View style={styles.horizontal}>
            <View style={styles.horizontalItem}>
              <TextInput
                label="Số lượng"
                value={`${quantity || ''}`}
                onChangeText={(value) => this.onChangeText('quantity', value)}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.horizontalItem}>
              <SelectSize
                onSelectedChange={(value) => this.onChangeText('size', value)}
                label={'Size'} data={SIZES}
              />
            </View>
          </View>
          <View style={{ height: 5 }} />
          <View style={styles.horizontal}>
            <View style={styles.horizontalItem}>
              <TextInput
                label="Giá nhập"
                value={`${importPrice || ''}`}
                onChangeText={(value) => this.onChangeText('importPrice', value)}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.horizontalItem}>
              <TextInput
                label="Giá bán"
                value={`${price || ''}`}
                onChangeText={(value) => this.onChangeText('price', value)}
                keyboardType="numeric"
              />
            </View>
          </View>
          <View style={{ height: 5 }} />
          <TextInput
            label="Ghi chú"
            value={description}
            onChangeText={(value) => this.onChangeText('description', value)}
            multiline={true}
            numberOfLines={4}
          />
        </KeyboardAwareScrollView>
        <View style={{ marginHorizontal: 24, alignItems: 'center' }}>
          <BaseButton onPress={this.handleSubmit} containerStyle={styles.btnConfirm} title="Xác nhận" />
        </View>
      </View>
    )
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

const mapDispatchToProps = {
  handleCreateProduct,
  getCategories,
}

export default connect(null, mapDispatchToProps)(CreateProduct);