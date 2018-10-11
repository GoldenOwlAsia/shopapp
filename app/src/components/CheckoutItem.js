import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, Image } from 'react-native';
import QuantityPicker from './QuantityPicker';
import TouchableView from './TouchableView';
import { UpArrow, DownArrow, Trash } from './imageUrls';
import { formatMoney } from '../utils/helpers';

/* Component ==================================================================== */
class CheckoutItem extends React.PureComponent {
  state = {
    expand: false,
  }

  toggleExpand = () => {
    this.setState({ expand: !this.state.expand });
  }

  render(){
    const { productName, totalPrice, quantity, onDecrease, onIncrease, onRemove } = this.props;
    return (
      <View>
        <Header
          productName={productName}
          totalPrice={formatMoney(totalPrice)}
          expand={this.state.expand}
          toggleExpand={this.toggleExpand}
        />
        { this.state.expand && <Content onRemove={onRemove} onIncrease={onIncrease} onDecrease={onDecrease} quantity={quantity} /> }
      </View>
    )
  }
};

const Header = ({ expand, toggleExpand, productName, totalPrice }) => (
  <TouchableView onPress={toggleExpand}>
    <View style={styles.header}>
      <Image source={expand ? UpArrow : DownArrow} resizeMode={'contain'} style={styles.arrow} />
      <Text numberOfLines={1} style={styles.title}>{productName}</Text>
      <Text style={styles.price}>{totalPrice} VNĐ</Text>
    </View>
  </TouchableView>
)

const Content = ({ quantity, onDecrease, onIncrease, onRemove }) => (
  <View style={styles.content}>
    <Text style={styles.quantityText}>Số lượng</Text>
    <QuantityPicker onIncrease={onIncrease} onDecrease={onDecrease} quantity={quantity} />
    <View style={{ flex: 1 }} />
    <TouchableView onPress={onRemove}>
      <Image resizeMode={'contain'} source={Trash} style={styles.deleteIcon} />
    </TouchableView>
  </View>
)
 
 CheckoutItem.propTypes = {
  
};
 CheckoutItem.defaultProps = {
};
 CheckoutItem.componentName = ' CheckoutItem';

/* Style */
const styles = StyleSheet.create({
  content: {
    
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center', 
    paddingTop: 12,
    paddingBottom: 12,
  },
  arrow: {
    width: 16,
    height: 16,
  },
  title: {
    flex: 1,
    marginLeft: 15,
    marginRight: 15,
    lineHeight: 19,
    fontSize: 14,
    fontWeight: "700",
    color: "#12283f"
  },
  price: {
    lineHeight: 19,
    fontSize: 14,
    fontWeight: "700",
    color: "#5175ff"
  },
  content: {
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: '#f6f6f8',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  quantityText: {
    lineHeight: 14,
    fontSize: 12,
    color: "#666666",
    marginRight: 20
  },
  deleteIcon: {
    width: 16,
    height: 16,
  }

});
 
/* Export Component ==================================================================== */
export default  CheckoutItem;