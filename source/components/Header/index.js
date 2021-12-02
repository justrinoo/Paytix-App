import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  TextInput,
  Dimensions,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

export default function Header() {
  const [statusMenu, setStatusMenu] = useState(false);

  const menuNavigation = () => {
    if (statusMenu === false) {
      setStatusMenu(true);
    } else {
      setStatusMenu(false);
    }
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
          <Icon
            name="menu-outline"
            color="#000000"
            size={20}
            onPress={menuNavigation}
          />
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
              <Text style={styles.homeMain_navigationTextLinkScreen}>
                Location
              </Text>
            </View>
            <View style={styles.homeMain_navigationLine}></View>
            <View>
              <Text style={styles.homeMain_navigationTextLinkScreen}>Home</Text>
            </View>
            <View style={styles.homeMain_navigationLine}></View>
            <View>
              <Text style={styles.homeMain_navigationTextLinkScreen}>
                Payment
              </Text>
            </View>
            <View style={styles.homeMain_navigationLine}></View>
            <View>
              <Text style={styles.homeMain_navigationTextLinkScreen}>
                Profile
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
    elevation: 5,
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
    marginHorizontal: 24,
    marginVertical: 16,
    backgroundColor: '#ffffff',
    // flex: 1,
  },
  homeMain_navigationRows: {
    flexDirection: 'column',
  },
  homeMain_navigationInput: {
    paddingLeft: 52,
    backgroundColor: '#ffffff',
    borderRadius: 4,
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
  },
});
