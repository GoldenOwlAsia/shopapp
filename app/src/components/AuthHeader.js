import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet
} from 'react-native';

import { logoUrl } from './imageUrls';

class AuthHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.titleWrapper}>
        <Image
          style={styles.logo}
          source={logoUrl}
        />
        <View style={styles.titleTextWrapper}>
          <Text style={styles.title}>Shop App</Text>
          <Text style={styles.subTitle}>Shop managerment</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    flex: 0.6
  },
  logo: {
    maxWidth: 70,
    maxHeight: 70
  },
  titleTextWrapper: {
    paddingLeft: 15,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  title: {
    fontSize: 36,
    letterSpacing: -1.0
  },
  subTitle: {
    fontSize: 16,
    letterSpacing: -1.0
  }
});

export default AuthHeader;