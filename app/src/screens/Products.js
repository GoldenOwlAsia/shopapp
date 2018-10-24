import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  RefreshControl,
  Text,
  AsyncStorage,
  Alert,
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import ProductItem from '../components/OwnerProductItem';
import SearchBar from '../components/SearchBar';
import StaffItem from '../components/StaffItem';
import { Hamburger, PlusIcon } from '../components/imageUrls';
import { getAllProducts } from '../actions/product';
import { LogoutIcon } from '../components/icons';

class ProductsScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Sản phẩm',
    headerLeft: (
      <LogoutIcon onPress={() => {
        Alert.alert(
          'Xác Nhận',
          'Bạn có thật sự muốn đăng xuất ?',
          [
            {text: 'Cancel', onPress: () => {}, style: 'cancel'},
            {text: 'OK', onPress: async () => {
              await AsyncStorage.clear();

              navigation.dispatch(StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'AuthLoading' })],
                key: null,
              }));

            }},
          ],
          { cancelable: false }
        )
      }} />
    ),
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate('CreateProduct')}>
        <Image
          style={{ width: 16, height: 16, marginRight: 16 }}
          source={PlusIcon}
        />
      </TouchableOpacity>
    )
  });

  constructor(props) {
    super(props);
    this.state = {
      searchKeyword: '',
    };
  }

  async componentDidMount() {
    await this.props.getAllProducts();
  }

  onChangeSearhKeyword = (keyword) => {
    this.setState({
      searchKeyword: keyword
    });
  }

  onItemPress = (product) => {
    // this.props.navigation.navigate('CreateProduct', { product });
  }

  renderProductItem = ({ item }) => (
    <ProductItem item={item} onItemPress={this.onItemPress} />
  )

  keyExtractor = (item) => `product-${item.id}`;

  onRefresh = async () => {
    await this.props.getAllProducts();
  }

  render() {
    const { loading, error } = this.props;
    const products = this.props.products.filter(item => !this.state.searchKeyword || item.name.toLowerCase().includes(this.state.searchKeyword.toLowerCase()));
    return (
      <View style={styles.container}>
      <SearchBar
        placeholder="Tìm kiếm"
        value={this.state.searchKeyword}
        onChangeText={this.onChangeSearhKeyword}
      />
        <FlatList
          data={products}
          renderItem={this.renderProductItem}
          keyExtractor={this.keyExtractor}
          style={styles.list}
          ItemSeparatorComponent={Divider}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={this.onRefresh}
            />
          }
        />
      </View>
    )
  }
}

const Divider = () => (
  <View style={styles.divider} />
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF',
  },
  list: {
    marginTop: 27,
  },
  divider: {
    height: 1,
    backgroundColor: '#EAEAEA',
    marginTop: 10,
    marginBottom: 10,
  }
})

const mapStateToProps = (state) => ({
  loading: state.Product.loading,
  error: state.Product.error,
  products: state.Product.products,
});

const mapDispatchToProps = {
  getAllProducts,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductsScreen);