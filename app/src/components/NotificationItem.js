import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { TouchableOpacity, Image, Text, StyleSheet, View } from 'react-native';
import { distanceInWords, format } from 'date-fns';
import { MaterialIcons } from '@expo/vector-icons';
import CustomImage from './CustomImage';
import { ProductHolder } from './imageUrls';

/* Component ==================================================================== */
const NotificationItem = (props) => {
  const { onPress, item, selected} = props;
  const { avatarUrl, createdByStaff, order, customer, createdAt } = item;
  const { items } = order;
  const product = items[0];
  const { name, image } = product;

  const date =  format(
    new Date(createdAt),
    'MM/DD/YYYY'
  )

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, { backgroundColor: selected ? '#F7F8FE' : '#FFF' }]}>
        <View style={styles.imageWrap}>
          <CustomImage style={styles.image} holder={ProductHolder} source={{ uri: image }} />
        </View>
        <View style={styles.content}>
          <Text style={styles.message}>
            <Text style={styles.supplierName}>{createdByStaff.fullName}&nbsp;</Text>
             vừa bán được {name} cho khách hàng {customer.name}
          </Text>
          <Text style={styles.time}>&nbsp;{moment(date).fromNow()}</Text>
        </View>
        {/* <Image style={styles.rightIcon} source={PlusIcon} /> */}
        <MaterialIcons color="#D3D5DA" size={18} style={styles.rightIcon} name="keyboard-arrow-right" />
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
    // fontWeight: '500',
    color: '#12283F',
    marginRight: 4,
  },
  message: {
    fontSize: 16,
    color: '#A8A8A8',
  },
  time: {
    fontSize: 14,
    fontFamily: 'Rubik-Italic',
    color: '#A8A8A8',
    marginTop: 4,
  },
  rightIcon: {
    marginLeft: 10,
  }

});
 
/* Export Component ==================================================================== */
export default NotificationItem;