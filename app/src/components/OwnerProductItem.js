import React from 'react';
import PropTypes from 'prop-types';
import { Image, View, StyleSheet, Text, Dimensions } from 'react-native';
import QuantityPicker from './QuantityPicker';
import TouchableView from './TouchableView';
import CustomImage from './CustomImage';
import { ProductHolder } from './imageUrls'
import { formatMoney } from '../utils/helpers';

/* Component ==================================================================== */
const ProductItem = (props) => {
  const { item, onItemPress, onIncrease, onDecrease } = props;
  const { images, name, price, quantity } = item;

  const URL = (images || []).length ? images[0] : null;

  const internalOnPress = () => onItemPress(item);

  return (
    <TouchableView onPress={internalOnPress}>
      <View style={styles.container}>
        <View style={styles.imageWrap}>
          <CustomImage holder={ProductHolder} style={styles.image} resizeMode="cover" source={{ uri: URL }} />
        </View>
        <View style={styles.content}>
          <Text numberOfLines={1} style={styles.title}>{name}</Text>
          <Text style={styles.price}>{`${formatMoney(price)} VNĐ`}</Text>
          <View style={styles.meta}>
            <Text style={styles.quantity}>{`Số lượng: ${quantity}`}</Text>
            <Text style={styles.lastUpdate}>Cập nhật: 24.07.2018</Text>
          </View>
        </View>
      </View>
    </TouchableView>
  )
  
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
const LIST_ITEM_HEIGHT = 60;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: LIST_ITEM_HEIGHT,
  },
  imageWrap: {
    width: LIST_ITEM_HEIGHT,
    height: LIST_ITEM_HEIGHT,
    borderRadius: 6,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    marginHorizontal: 10,
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    lineHeight: 19,
    fontSize: 14,
    fontWeight: '700',
    color: '#12283f'
  },
  price: {
    lineHeight: 19,
    fontSize: 14,
    color: '#a8a8a8'
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  quantity: {
    lineHeight: 19,
    fontSize: 14,
    color: '#5175ff'
  },
  lastUpdate: {
    lineHeight: 16,
    fontSize: 12,
    color: '#a8a8a8'
  }
  

});
 
/* Export Component ==================================================================== */
export default ProductItem;