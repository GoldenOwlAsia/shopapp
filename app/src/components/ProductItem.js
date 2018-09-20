import React from 'react';
import PropTypes from 'prop-types';
import { Image, View, StyleSheet, Text, Dimensions } from 'react-native';
import QuantityPicker from './QuantityPicker';
import TouchableView from './TouchableView';

/* Component ==================================================================== */
const ProductItem = (props) => {
  const { item, gridItem, onPress, onIncrease, onDecrease } = props;
  const { image, name, category, price, status, quantity } = item;

  if(gridItem){
    return (
      <TouchableView onPress={onPress}>
        <View style={styles.gridContainer}>
          <View style={[styles.imageWrap, styles.gridImageWrap]}>
            <Image source={{ uri: image }} style={styles.image} />
          </View>
          <View style={styles.gridContent}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.category}>{category}</Text>
            <Text style={[styles.status, styles.gridStatus]}>{status}</Text>
            <Text style={[styles.price, styles.gridPrice]}>{price}</Text>
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
            <Image source={{ uri: image }} style={styles.image} />
          </View>
          <View style={styles.listContent}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.category}>{category}</Text>
            <View style={styles.horizontal}>
              <Text style={styles.price}>{price}</Text>
              <Text style={styles.status}>{status}</Text>
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
    fontFamily: "Rubik-Medium",
    fontSize: 14,
    fontWeight: "700",
    fontStyle: "normal",
    color: "#000000"
  },
  category: {
    lineHeight: 18,
    fontFamily: "Rubik-Regular",
    fontSize: 14,
    color: "#bebebe",
    marginTop: 4,
  },
  price: {
    lineHeight: 16,
    fontFamily: "Rubik-Regular",
    fontSize: 14,
    color: "#666666"
  },
  gridPrice: {
    marginTop: 16,
    marginBottom: 4,
  },
  status: {
    lineHeight: 16,
    fontFamily: "Rubik-Regular",
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