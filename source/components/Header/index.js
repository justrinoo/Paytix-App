import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Header() {
  const menuNavigation = () => {};

  return (
    <View style={styles.homeMain_Header}>
      <View style={styles.homeMain_spaceColumn}>
        <Image
          source={require('../../assets/images/tickitz.png')}
          style={styles.homeMain_BrandLogo}
        />
      </View>
      <View style={styles.homeMain_spaceColumn}>
        <Icon
          name="menu-outline"
          color="#000000"
          size={20}
          onPress={menuNavigation}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  homeMain_Header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  homeMain_spaceColumn: {
    marginVertical: 33,
    marginHorizontal: 24,
  },
  homeMain_BrandLogo: {
    width: 86,
    height: 24,
  },
});
