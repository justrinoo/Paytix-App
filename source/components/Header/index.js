import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {View, Image, StyleSheet, Text, TextInput} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import axios from '../../utils/axios';

export default function Header(props) {
  const [statusMenu, setStatusMenu] = useState(false);

  const menuNavigation = () => {
    if (statusMenu === false) {
      setStatusMenu(true);
    } else {
      setStatusMenu(false);
    }
  };

  const goToNextScreen = screen => {
    props.navigation.navigate(screen);
    setStatusMenu(false);
  };

  const handleLogout = async () => {
    setStatusMenu(false);
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('id');
    props.navigation.navigate('Auth', {
      screen: 'Login',
    });
  };

  return (
    <>
      <View style={styles.homeMain_Header}>
        <View style={styles.homeMain_spaceColumn}>
          <Image
            source={require('../../assets/images/tickitz.png')}
            style={styles.homeMain_BrandLogo}
          />
        </View>
        <View style={styles.homeMain_spaceColumn}>
          {!statusMenu ? (
            <Icon
              name="menu-outline"
              color="#000000"
              size={20}
              onPress={menuNavigation}
            />
          ) : (
            <Icon
              name="close-outline"
              color="#000000"
              size={20}
              onPress={menuNavigation}
            />
          )}
        </View>
      </View>

      {statusMenu ? (
        <View style={styles.homeMain_navigationContainer}>
          <View style={styles.homeMain_navigationRows}>
            <TextInput
              placeholder="Search"
              placeholderTextColor="#A0A3BD"
              style={styles.homeMain_navigationInput}
            />
            <View style={styles.homeMain_navigationLine}></View>
            <View>
              <Text
                style={styles.homeMain_navigationTextLinkScreen}
                onPress={() => goToNextScreen('Home')}>
                Home
              </Text>
            </View>
            <View style={styles.homeMain_navigationLine}></View>
            <View>
              <Text
                style={styles.homeMain_navigationTextLinkScreen}
                onPress={() => goToNextScreen('Profile')}>
                Profile
              </Text>
            </View>
            <View style={styles.homeMain_navigationLine}></View>
            <View>
              <Icon
                name="log-out"
                size={20}
                color="#000000"
                style={{position: 'absolute', left: 130}}
              />
              <Text
                style={styles.homeMain_navigationTextLinkScreen}
                onPress={handleLogout}>
                Logout
              </Text>
            </View>
            <View style={styles.homeMain_navigationLine}></View>
            <Text style={styles.homeMain_navigationTextLinkScreenFooter}>
              &copy; 2021 Tickitz. All Rights Reserved.
            </Text>
          </View>
        </View>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  homeMain_Header: {
    backgroundColor: '#FFFFFF',
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
  homeMain_navigationContainer: {
    position: 'relative',
    backgroundColor: '#ffffff',
    // flex: 1,
  },
  homeMain_navigationRows: {
    flexDirection: 'column',
  },
  homeMain_navigationInput: {
    flexDirection: 'column',
    marginVertical: 16,
    marginHorizontal: 35,
    paddingLeft: 52,
    backgroundColor: '#ffffff',
    borderRadius: 4,
    width: '85%',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#DEDEDE',
  },
  homeMain_navigationLine: {
    marginTop: 20,
    marginBottom: 25,
    width: '100%',
    height: 1,
    backgroundColor: '#DEDEDE',
  },
  homeMain_navigationTextLinkScreen: {
    color: '#14142B',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
  homeMain_navigationTextLinkScreenFooter: {
    color: '#6E7191',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 56,
    marginBottom: 20,
  },
});
