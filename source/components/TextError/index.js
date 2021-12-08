import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
export default function TextError({children}) {
  return (
    <View>
      <Text style={styles.textError}>{children}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  textError: {
    color: '#ED2E7E',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 8,
  },
});
