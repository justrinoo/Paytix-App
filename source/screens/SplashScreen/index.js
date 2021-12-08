import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

export default function SplashScreen({navigation}) {
  const checkToken = async () => {
    const token = await AsyncStorage.getItem('token');
    setTimeout(() => {
      return token
        ? navigation.navigate('HomeScreen', {
            screen: 'Home',
          })
        : navigation.navigate('Auth', {
            screen: 'Login',
          });
    }, 1500);
  };

  useEffect(() => {
    checkToken();
  }, []);
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
