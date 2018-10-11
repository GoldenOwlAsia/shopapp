import React from 'react';
import PropTypes from 'prop-types';
import { Image, View, StyleSheet, Text, Dimensions } from 'react-native';
import QuantityPicker from './QuantityPicker';
import TouchableView from './TouchableView';
import CustomImage from './CustomImage';
import { ProductHolder } from './imageUrls';
import { formatMoney } from '../utils/helpers';

/* Component ==================================================================== */
const ProductItem = (props) => {
  const { item, gridItem, onPress, onIncrease, onDecrease } = props;
  const { images, name, price, status, quantity, description } = item;

  const category = 'Giày thể thao nam';

  const URL = (images || []).length ? images[0] : null;

  if(gridItem){
    return (
      <TouchableView onPress={onPress}>
        <View style={styles.gridContainer}>
          <View style={[styles.imageWrap, styles.gridImageWrap]}>
            <CustomImage holder={ProductHolder} source={{ uri: URL }} style={styles.image} />
          </View>
          <View style={styles.gridContent}>
            <Text style={styles.title}>{name}</Text>
            <Text numberOfLines={1} style={styles.category}>{URL}</Text>
            <Text style={[styles.status, styles.gridStatus]}>{status === 'Available' ? 'Còn hàng' : 'Hết hàng'}</Text>
            <Text style={[styles.price, styles.gridPrice]}>{formatMoney(price)} VNĐ</Text>
            <QuantityPicker
              quantity={quantity}
              onIncrease={onIncrease}
              onDecrease={onDecrease}
            />
          </View>
        </View>
      </TouchableView>
    )
  }else{
    return (
      <TouchableView onPress={onPress}>
        <View style={styles.container}>
          <View style={[styles.imageWrap, styles.listImageWrap]}>
            <CustomImage holder={ProductHolder} source={{ uri: URL }} style={styles.image} />
          </View>
          <View style={styles.listContent}>
            <Text style={styles.title}>{name}</Text>
            <Text numberOfLines={1} style={styles.category}>{category}</Text>
            <View style={styles.horizontal}>
              <Text style={styles.price}>{formatMoney(price)} VNĐ</Text>
              <Text style={[styles.status, styles.gridStatus]}>{status === 'Available' ? 'Còn hàng' : 'Hết hàng'}</Text>
            </View>
            <View style={styles.dummy} />
            <QuantityPicker
              quantity={quantity}
              onIncrease={onIncrease}
              onDecrease={onDecrease}
            />
          </View>
        </View>
      </TouchableView>
    )
  }
  
};
 
ProductItem.propTypes = {
  item: PropTypes.object,
  onPress: PropTypes.func,
  onIncrease: PropTypes.func,
  onDecrease: PropTypes.func,
};
ProductItem.defaultProps = {
};
ProductItem.componentName = 'ProductItem';

/* Style */
const LIST_ITEM_HEIGHT = 114;
const GRID_ITEM_WIDTH = (Dimensions.get('window').width - 15*3)/2;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: LIST_ITEM_HEIGHT,
  },
  gridContainer: {
    width: GRID_ITEM_WIDTH,
  },
  imageWrap: {
    borderRadius: 6,
    overflow: 'hidden',
  },
  listImageWrap: {
    width: LIST_ITEM_HEIGHT,
    height: LIST_ITEM_HEIGHT,
  },
  gridImageWrap: {
    width: GRID_ITEM_WIDTH,
    height: GRID_ITEM_WIDTH,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  listContent: {
    flex: 1,
    marginLeft: 20,
    marginRight: 10,
  },
  gridContent: {
    marginTop: 8,
  },
  horizontal: {
    flexDirection: 'row',
    marginTop: 4,
    justifyContent: 'space-between',
  },
  title: {
    lineHeight: 16,
    fontSize: 14,
    fontWeight: "700",
    fontStyle: "normal",
    color: "#000000"
  },
  category: {
    lineHeight: 18,
    fontSize: 14,
    color: "#bebebe",
    marginTop: 4,
  },
  price: {
    lineHeight: 16,
    fontSize: 14,
    color: "#666666"
  },
  gridPrice: {
    marginTop: 16,
    marginBottom: 4,
  },
  status: {
    lineHeight: 16,
    fontSize: 14,
    color: "#5175ff"
  },
  gridStatus: {
    marginTop: 4,
  },
  dummy: {
    flex: 1,
  }

});
 
/* Export Component ==================================================================== */
export default ProductItem;