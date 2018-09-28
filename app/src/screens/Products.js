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
} from 'react-native';
import ProductItem from '../components/OwnerProductItem';
import SearchBar from '../components/SearchBar';
import StaffItem from '../components/StaffItem';
import { Hamburger, PlusIcon } from '../components/imageUrls';
import { getAllProducts } from '../actions/product';

class ProductsScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Sản phẩm',
    headerLeft: (
      <TouchableOpacity>
        <Image
          style={{ width: 16, height: 16, marginLeft: 16 }}
          source={Hamburger}
        />
      </TouchableOpacity>
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
  }

  componentDidMount() {
    this.props.getAllProducts();
  }

  onItemPress = (product) => {
    // this.props.navigation.navigate('CreateProduct', { product });
  }

  renderProductItem = ({ item }) => (
    <ProductItem item={item} onItemPress={this.onItemPress} />
  )

  keyExtractor = (item) => `product-${item.id}`;

  onRefresh = () => {
    this.props.getAllProducts();
  }

  render() {
    const { loading, error, products } = this.props;

    return (
      <View style={styles.container}>
        <SearchBar placeholder="Tìm kiếm" />
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