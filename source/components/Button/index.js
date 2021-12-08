import React from 'react';
import {TouchableOpacity, StyleSheet, View, Text} from 'react-native';
export default function ButtonComponent({children, childrenOnPress}) {
  return (
    <TouchableOpacity onPress={childrenOnPress} activeOpacity={1}>
      <View style={styles.buttonComponent}>{children}</View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 20,
  },
  buttonComponent: {
    marginTop: 20,
    padding: 17,
    backgroundColor: '#5F2EEA',
    borderRadius: 12,
    width: '100%',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
});
