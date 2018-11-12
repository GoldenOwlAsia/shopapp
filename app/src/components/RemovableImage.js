import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Image, View, Dimensions } from 'react-native';
import TouchableView from './TouchableView';
import { MaterialIcons } from "@expo/vector-icons";

/* Component ==================================================================== */
const RemovableImage = (props) => {
  const {
    url,
    id,
    onRemove,
  } = props;

  const internalOnRemove = () => onRemove(id);

  return (
    <View style={styles.container}>
      <View style={styles.imageWrap}>
        <Image style={styles.image} source={{ uri: url }} />
      </View>
      <View style={styles.btnRemoveWrap}>
        <TouchableView onPress={internalOnRemove}>
          <MaterialIcons name="close" />
        </TouchableView>
      </View>
    </View>
  )
};
 
RemovableImage.propTypes = {
};
RemovableImage.defaultProps = {
};
RemovableImage.componentName = 'RemovableImage';

/* Style */
const styles = StyleSheet.create({
  container: {
    width: (Dimensions.get('window').width - 80) / 3,
    height: 80,
    marginRight: 20,
    marginBottom: 10,
    position: 'relative',
  },
  imageWrap: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: '#F6F6F8',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  btnRemoveWrap: {
    position: 'absolute',
    width: 22,
    height: 22,
    borderRadius: 12,
    right: -12,
    top: -12,
    backgroundColor: '#f6f6f8',
    alignItems: 'center',
    justifyContent: 'center',
  }

});
 
/* Export Component ==================================================================== */
export default RemovableImage;