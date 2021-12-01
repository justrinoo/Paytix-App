import React from 'react';
import {Text, StyleSheet, ScrollView, View} from 'react-native';

export default function Home() {
  return (
    <ScrollView contentContainerStyle={styles.homeMain_container}>
      <View>
        <Text>Hello Home 1</Text>
      </View>
      <View>
        <Text>Hello Home 2</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  homeMain_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'black',
  },
});
