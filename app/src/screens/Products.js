import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  RefreshControl
} from 'react-native';
import ProductItem from '../components/OwnerProductItem';
import SearchBar from '../components/SearchBar';
// import StaffItem from '../components/StaffItem';
import { Hamburger, PlusIcon } from '../components/imageUrls';
import { getAllProducts } from '../actions/product';

class ProductsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Sản phẩm',
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Image
          style={{ width: 16, height: 12, marginLeft: 12 }}
          source={Hamburger}
        />
      </TouchableOpacity>
    ),
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate('CreateProduct')}>
        <Image
          style={{ width: 16, height: 16, marginRight: 12 }}
          source={PlusIcon}
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
      searchKeyword: ''
    };
  }

  async componentDidMount() {
    await this.props.getAllProducts();
  }

  onChangeSearhKeyword = keyword => {
    this.setState({
      searchKeyword: keyword
    });
  };

  onItemPress = product => {
    this.props.navigation.navigate('ProductDetail', { product });
  };

  renderProductItem = ({ item }) => (
    <ProductItem item={item} onItemPress={this.onItemPress} />
  );

  keyExtractor = item => `product-${item.id}`;

  onRefresh = async () => {
    await this.props.getAllProducts();
  };

  render() {
    const { loading, error } = this.props;
    const products = this.props.products.filter(
      item =>
        !this.state.searchKeyword ||
        item.name.toLowerCase().includes(this.state.searchKeyword.toLowerCase())
    );
    return (
      <View style={styles.container}>
        <View style={{ paddingHorizontal: 12 }}>
          <SearchBar
            placeholder="Tìm kiếm"
            value={this.state.searchKeyword}
            onChangeText={this.onChangeSearhKeyword}
          />
        </View>
        <FlatList
          data={products}
          renderItem={this.renderProductItem}
          keyExtractor={this.keyExtractor}
          style={styles.list}
          ItemSeparatorComponent={Divider}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={this.onRefresh} />
          }
        />
      </View>
    );
  }
}

const Divider = () => <View style={styles.divider} />;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  list: {
    marginTop: 27,
    paddingLeft: 18
  },
  divider: {
    height: 1,
    backgroundColor: '#EAEAEA',
    marginTop: 10,
    marginBottom: 10
  }
});

const mapStateToProps = state => ({
  loading: state.Product.loading,
  error: state.Product.error,
  products: state.Product.products
});

const mapDispatchToProps = {
  getAllProducts
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsScreen);
