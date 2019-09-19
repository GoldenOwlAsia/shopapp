import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from 'react-native';
import TouchableView from './TouchableView';

/* Component ==================================================================== */
class QuantityPicker extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 0
    };
    this.isControlled = typeof props.quantity === 'number';
  }

  onDecrease = () => {
    const { quantity, onDecrease } = this.props;
    if (this.isControlled) {
      if (onDecrease) {
        if (quantity > 0) {
          onDecrease(quantity - 1);
        }
      }
    } else {
      this.setState(state => ({
        quantity: state.quantity > 0 ? state.quantity - 1 : state.quantity
      }));
    }
  };

  onIncrease = () => {
    const { quantity, onIncrease } = this.props;
    if (this.isControlled) {
      if (onIncrease) {
        onIncrease(quantity + 1);
      }
    } else {
      this.setState(state => ({
        quantity: state.quantity + 1
      }));
    }
  };

  render() {
    const quantity = this.isControlled
      ? this.props.quantity
      : this.state.quantity;
    return (
      <View style={[this.props.containerStyle, styles.container]}>
        <TouchableView onPress={this.onDecrease}>
          <Text style={styles.text}>-</Text>
        </TouchableView>
        <Text style={styles.quantity}>{quantity}</Text>
        <TouchableView onPress={this.onIncrease}>
          <Text style={styles.text}>+</Text>
        </TouchableView>
      </View>
    );
  }
}

QuantityPicker.propTypes = {
  quantity: PropTypes.number,
  onIncrease: PropTypes.func,
  onDecrease: PropTypes.func,
  containerStyle: PropTypes.object
};
QuantityPicker.defaultProps = {};
QuantityPicker.componentName = 'QuantityPicker';

/* Style */
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f6f5f8',
    alignSelf: 'flex-start'
  },
  quantity: {
    fontSize: 16,
    color: '#c1c5cb',
    paddingHorizontal: 16
  },
  text: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 6,
    paddingBottom: 6,
    fontSize: 24,
    color: '#c1c5cb'
  }
});

/* Export Component ==================================================================== */
export default QuantityPicker;
