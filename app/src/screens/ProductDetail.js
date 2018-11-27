import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text
} from 'react-native';
import moment from 'moment'
import { BackArrow } from '../components/imageUrls';
import formatNumber from 'simple-format-number';

class ProductDetailScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          style={styles.headerLeftIcon}
          source={BackArrow}
        />
      </TouchableOpacity>
    ),
    headerStyle: {
      borderBottomWidth: 0,
    },
  });

  render() {
    const { product } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 20 }}>
          <Text style={styles.title}>Thông tin sản phẩm</Text>
          <View style={styles.firstContainer}>
            <View>
              <Text style={styles.label}>{product.name}</Text>
              <Text style={styles.description}>Cập nhật {moment(product.createdAt).format('DD/MM/YYYY')}</Text>
            </View>
            <TouchableOpacity
              style={styles.editButton}>
              <Text style={styles.editButtonText}>Chỉnh sửa</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.secondContainer}>
            <View>
              <Text style={styles.label}>3.4M</Text>
              <Text style={styles.description}>Giá Nhập</Text>
            </View>
            <View>
              <Text style={styles.label}>4.2M</Text>
              <Text style={styles.description}>Giá Bán</Text>
            </View>
            <View>
              <Text style={styles.label}>{formatNumber(product.quantity, {fractionDigits: 0, symbols: { grouping: '.'}})}</Text>
              <Text style={styles.description}>Số lượng</Text>
            </View>
            <View>
              <Text style={styles.label}>8 (EU)</Text>
              <Text style={styles.description}>Size</Text>
            </View>
          </View>
          <View style={styles.thirdContainer}>
            <Text style={styles.label}>Mô tả</Text>
            <Text style={[styles.description, { paddingTop: 5 }]}>{product.description}</Text>
          </View>
          <Divider style={{ marginHorizontal: 15 }} />
          <View style={styles.fourthContainer}>
            <Text style={styles.label}>Màu</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={[styles.colorSpot, { backgroundColor: '#f46969' }]}></View>
              <Text style={styles.colorText}>Đỏ</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={[styles.colorSpot, { backgroundColor: '#87ACF0' }]}></View>
              <Text style={styles.colorText}>Xanh</Text>
            </View>
          </View>
          <Divider style={{ marginHorizontal: 15 }} />
          <View style={styles.fifthContainer}>
            <Text style={styles.label}>Hình ảnh</Text>
            <ScrollView horizontal>
              {
                product.images.map((image) => (
                  <Image
                    key={image}
                    resizeMode="cover"
                    source={{ uri: image }}
                    style={styles.imageStyle} />
                ))
              }
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const Divider = (props) => (
  <View style={[styles.divider, props.style]} />
)

const styles = StyleSheet.create({
  headerLeftIcon: {
    marginLeft: 15,
    width: 18,
    height: 13
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    paddingLeft: 20,
    paddingTop: 10
  },
  firstContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20
  },
  secondContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 25,
    paddingVertical: 15,
    backgroundColor: '#F6F6F6'
  },
  thirdContainer: {
    marginTop: 25,
    paddingHorizontal: 20
  },
  fourthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  fifthContainer: {
    marginTop: 10,
    paddingHorizontal: 20
  },
  colorSpot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 10,
  },
  colorText: {
    opacity: 0.7,
    paddingTop: 5,
    paddingBottom: 5,
  },
  editButton: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#5275FF',
  },
  editButtonText: {
    color: '#5275FF',
    padding: 5,
    fontSize: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
  },
  description: {
    lineHeight: 20,
    opacity: 0.7,
  },
  imageStyle: {
    height: 100,
    width: 150,
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#F6F6F6',
  },
  divider: {
    height: 1,
    backgroundColor: '#EAEAEA',
    marginVertical: 10,
  }
})

const mapStateToProps = (state, props) => ({
  product: props.navigation.state.params.product
})

const mapDispatchToProps = {
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductDetailScreen);