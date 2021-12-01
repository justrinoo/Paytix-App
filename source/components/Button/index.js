import React from 'react';
import {TouchableHighlight, StyleSheet, View, Text} from 'react-native';
export default function ButtonComponent({children, childrenOnPress}) {
  return (
    <View style={styles.buttonContainer}>
      <TouchableHighlight onPress={childrenOnPress} underlayColor="none">
        <View style={styles.buttonComponent}>{children}</View>
      </TouchableHighlight>
    </View>
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
});
