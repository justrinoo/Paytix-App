import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

export default function SplashScreen({navigation}) {
  const token = '1234';
  useEffect(() => {
    setTimeout(() => {
      if (token === '1234') {
        navigation.navigate('Auth');
      } else {
        return null;
      }
    }, 1000);
  });
  return (
    <View style={styles.spalashContainer}>
      <Image
        source={require('../../assets/images/tickitz.png')}
        style={styles.splashImage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  spalashContainer: {
    flex: 1,
    backgroundColor: '#DADDFC',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    textAlign: 'center',
  },
  splashImage: {
    width: 250,
    height: 100,
    alignItems: 'center',
  },
});
