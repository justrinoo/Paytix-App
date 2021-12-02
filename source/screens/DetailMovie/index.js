import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
export default function DetailMovie() {
  return (
    <View style={styles.homeDetail_Container}>
      <Text style={styles.homeDetail_TextDetail}>Hello Detail Movie</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  homeDetail_Container: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    backgroundColor: 'black',
  },

  homeDetail_TextDetail: {
    fontSize: 39,
    color: 'red',
  },
});
