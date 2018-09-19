import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Image, Text, StyleSheet, View } from 'react-native';
import { PlusIcon } from './imageUrls';

/* Component ==================================================================== */
const NotificationItem = (props) => {
  const { onPress, item, selected} = props;
  const { avatarUrl, supplier, product, customer, date } = item;
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, { backgroundColor: selected ? '#F7F8FE' : '#FFF' }]}>
        <View style={styles.imageWrap}>
          <Image style={styles.image} source={{ uri: avatarUrl }} />
        </View>
        <View style={styles.content}>
          <Text style={styles.message}>
            <Text style={styles.supplierName}>{supplier}&nbsp;</Text>
             vừa bán được {product} cho khách hàng {customer}
             <Text style={styles.time}>&nbsp;{date}</Text>
          </Text>
        </View>
        <Image style={styles.rightIcon} source={PlusIcon} />
      </View>
    </TouchableOpacity>
  )
};
 
NotificationItem.propTypes = {
  item: PropTypes.object,
  selected: PropTypes.bool,
  onPress: PropTypes.func,
};
NotificationItem.defaultProps = {
};
NotificationItem.componentName = 'NotificationItem';

/* Style */
const AVATAR_SIZE = 54;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageWrap: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE/2,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  supplierName: {
    fontSize: 16,
    fontFamily: 'Rubik-Medium',
    fontWeight: '700',
    color: '#12283F',
    marginRight: 4,
  },
  message: {
    fontSize: 16,
    fontFamily: 'Rubik-Regular',
    color: '#A8A8A8',
  },
  time: {
    fontSize: 14,
    fontFamily: 'Rubik-Italic',
    color: '#A8A8A8',
    marginLeft: 4,
  },
  rightIcon: {
    width: 12,
    height: 12,
    marginLeft: 10,
  }

});
 
/* Export Component ==================================================================== */
export default NotificationItem;