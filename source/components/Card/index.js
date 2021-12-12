import React from 'react';
import {View, StyleSheet} from 'react-native';
export default function Card({index, children}) {
  return (
    <View style={styles.homeRows_listmovie_card} key={index}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  homeRows_listmovie_card: {
    borderRadius: 16,
    backgroundColor: '#ffffff',
    borderWidth: 0.5,
    borderStyle: 'solid',
    padding: 15,
    marginHorizontal: 5,
    marginVertical: 29,
    borderColor: '#DEDEDE',
  },
});
