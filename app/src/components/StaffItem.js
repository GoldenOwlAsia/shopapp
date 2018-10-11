import React from 'react';
import PropTypes from 'prop-types';
import { Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import CustomImage from './CustomImage'
import { AvatarHolder } from './imageUrls';

//TODO move to Constant file
const ITEM_HEIGHT = 60; 

/* Component ==================================================================== */
const StaffItem = (props) => {
  const { staff, onItemPress } = props;
  const { fullName, avatar, phoneNumber } = staff;

  const avatarSource = avatar ? { uri: avatar } : AvatarHolder;

  const onPress = () => {
    onItemPress(staff);
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <CustomImage style={styles.image} source={{ uri: avatar }} resizeMethod="resize" />
        <View style={styles.info}>
          <Text style={styles.name}>{fullName}</Text>
          <Text style={styles.phone}>{phoneNumber}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
};
 
StaffItem.propTypes = {
  onItemPress: PropTypes.func,
  staff: PropTypes.shape({
    avatar: PropTypes.string,
    name: PropTypes.string,
    phone: PropTypes.string,
  })
};
StaffItem.defaultProps = {
};
StaffItem.componentName = 'StaffItem';

/* Style */
const styles = StyleSheet.create({
  container: {
    height: ITEM_HEIGHT,
    flexDirection: 'row',
  },
  image: {
    width: ITEM_HEIGHT,
    height: ITEM_HEIGHT,
    borderRadius: 4,
  },
  info: {
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'center',
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 19,
    color: '#12283F',
  },
  phone: {
    fontSize: 14,
    lineHeight: 19,
    color: '#A8A8A8',
  }
});
 
/* Export Component ==================================================================== */
export default StaffItem;