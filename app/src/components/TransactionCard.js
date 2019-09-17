import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Image } from 'react-native';
import { format } from 'date-fns'
import TouchableView from './TouchableView';
import { CardTransactionIcon } from './imageUrls';
import { formatMoney } from '../utils/helpers';
/* Style */
const styles = StyleSheet.create({
  container: {
    height: 100,
    minWidth: 200,
    flexDirection: 'row',
    padding: 20,
    borderRadius: 6,
    backgroundColor: "#f4f5f7",
    alignItems: 'center',
    marginRight: 20,
  },
  selectedBackground: {
    backgroundColor: "#5175ff",
  },
  content: {
    flex: 1,
    marginRight: 8,
  },
  primary: {
    lineHeight: 22,
    fontFamily: "Rubik-Medium",
    fontSize: 16,
    fontWeight: "700",
    color: "#5c5c5d"
  },
  secondary: {
    lineHeight: 16,
    fontFamily: "Rubik-Regular",
    fontSize: 12,
    color: "#5c5c5d"
  },
  selectedTextColor: {
    color: '#FFF'
  },
  icon: {
    width: 20,
    height: 20,
  }
});
/* Component ==================================================================== */
const TransactionCard = ({ selected, onPress, order }) => {
  const { createdByStaff, grandTotal, createdAt } = order;
  const { fullName } = createdByStaff;
  return (
    <TouchableView onPress={onPress}>
      <View style={[styles.container, selected && styles.selectedBackground]}>
        <View style={styles.content}>
          <Text style={[styles.primary, selected && styles.selectedTextColor]}>{formatMoney(grandTotal)} đ</Text>
          <Text style={[styles.primary, selected && styles.selectedTextColor]}>{fullName}</Text>
          <Text style={[styles.secondary, selected && styles.selectedTextColor]}>{format(new Date(createdAt), 'dd/MM/yyyy')}</Text>
        </View>
        <Image style={styles.icon} source={CardTransactionIcon} resizeMode="contain" />
      </View>
    </TouchableView>
  )
}

TransactionCard.propTypes = {
};
TransactionCard.defaultProps = {
};
TransactionCard.componentName = 'TransactionCard';

/* Export Component ==================================================================== */
export default TransactionCard;