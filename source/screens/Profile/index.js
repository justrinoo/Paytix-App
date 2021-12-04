import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import global from '../../../assets/css/global';
import {Footer, Header, Input} from '../../components';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useState} from 'react/cjs/react.development';
export default function Profile({navigation}) {
  const [menuActive, setMenuActive] = useState('Detail');

  const changeMenuScreen = menu => {
    setMenuActive(menu);
  };

  return (
    <ScrollView style={styles.profile_main}>
      <Header navigation={navigation} />
      <View style={styles.profile_container}>
        <View style={styles.profile_subHeader_container}>
          <View
            style={[global.globalContainer, styles.profile_subHeader_column]}>
            <Text
              style={
                menuActive === 'Detail'
                  ? styles.profile_subHeader_column_title_active
                  : styles.profile_subHeader_column_title
              }
              onPress={() => changeMenuScreen('Detail')}>
              Details Account
            </Text>
          </View>
          <View
            style={[global.globalContainer, styles.profile_subHeader_column]}>
            <Text
              style={
                menuActive === 'OrderHistory'
                  ? styles.profile_subHeader_column_title_active
                  : styles.profile_subHeader_column_title
              }
              onPress={() => changeMenuScreen('OrderHistory')}>
              Order History
            </Text>
          </View>
        </View>
      </View>

      <View style={global.globalContainer}>
        {menuActive === 'Detail' ? (
          <>
            <View style={styles.profile_card_information}>
              <View style={styles.profile_card_information_container}>
                <Text style={styles.profile_card_information_title}>INFO</Text>
                <Icon name="ellipsis-h" size={28} color="#5F2EEA" />
              </View>
              <View style={styles.profile_card_body_information}>
                <Image
                  source={require('../../assets/images/Profile.png')}
                  style={styles.profile_card_body_information_image}
                />
                <Text style={styles.profile_card_body_information_title}>
                  Jonas El Rodriguez
                </Text>
                <Text style={styles.profile_card_body_information_title_job}>
                  Moviegoers
                </Text>
              </View>
            </View>
            <Text style={styles.profile_settings_title}>Account Settings</Text>
            <View style={styles.profile_card_settings}>
              <Text style={styles.profile_card_settings_title}>
                Details Information
              </Text>
              <View
                style={{
                  borderColor: '#DEDEDE',
                  borderWidth: 1,
                  borderStyle: 'solid',
                  marginBottom: 29,
                }}></View>
              <Input
                childrenText="Full Name"
                childrenPlaceHolder="Jonas El Rodriguez"
                childrenType="default"
                childrenOnChange={() => null}
              />
              <Input
                childrenText="E-mail"
                childrenPlaceHolder="jonasrodrigu123@gmail.com"
                childrenType="email-address"
                childrenOnChange={() => null}
              />
              <Input
                childrenText="Phone Number"
                childrenPlaceHolder="81445687121"
                childrenType="numeric"
                childrenOnChange={() => null}
              />
            </View>

            <View style={styles.profile_card_privacy}>
              <Text style={styles.profile_card_settings_title}>
                Account and Privacy
              </Text>
              <View
                style={{
                  borderColor: '#DEDEDE',
                  borderWidth: 1,
                  borderStyle: 'solid',
                  marginBottom: 29,
                }}></View>
              <Input
                childrenText="New Password"
                childrenPlaceHolder="••••••••••"
                childrenType="visible-password"
                childrenOnChange={() => null}
              />
              <Input
                childrenText="Confirm Password"
                childrenPlaceHolder="••••••••••"
                childrenType="visible-password"
                childrenOnChange={() => null}
              />
            </View>

            <TouchableHighlight style={styles.profile_button}>
              <Text style={styles.profile_button_title}>Update changes</Text>
            </TouchableHighlight>
          </>
        ) : (
          <>
            <View style={styles.profile_card_orderHistory}>
              <View style={styles.profile_card_orderHistory_body}>
                <Image
                  source={require('../../assets/images/Sponsor1.png')}
                  style={styles.profile_card_orderHistory_image}
                />
                <Text style={styles.profile_card_orderHistory_date}>
                  Tuesday, 07 July 2020 - 04:30pm
                </Text>
                <Text style={styles.profile_card_orderHistory_movie}>
                  Spider-Man: Homecoming
                </Text>
              </View>
              <View
                style={{
                  borderColor: '#DEDEDE',
                  borderWidth: 1,
                  borderStyle: 'solid',
                  marginBottom: 24,
                }}></View>
              <TouchableHighlight
                style={[
                  styles.profile_card_orderHistory_button_active,
                  styles.profile_card_orderHistory_button_used,
                ]}>
                <Text style={styles.profile_card_orderHistory_button_title}>
                  Ticket in active
                </Text>
              </TouchableHighlight>
            </View>
          </>
        )}
      </View>
      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  profile_main: {},
  profile_subHeader_container: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  profile_subHeader_column_title: {
    marginHorizontal: 14,
    paddingBottom: 20,
    color: '#AAAAAA',
    fontWeight: '400',
    fontSize: 14,
  },
  profile_subHeader_column_title_active: {
    marginHorizontal: 14,
    fontWeight: '400',
    borderBottomWidth: 2,
    borderStyle: 'solid',
    borderColor: '#5F2EEA',
    paddingBottom: 20,
    color: '#14142B',
    fontSize: 14,
  },
  profile_card_information_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profile_card_information_title: {
    fontWeight: '400',
    fontSize: 16,
    color: '#4E4B66',
  },
  profile_card_information: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    elevation: 1,
    padding: 40,
    marginTop: 32,
  },
  profile_card_body_information: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profile_card_body_information_image: {
    marginTop: 45,
    width: 136,
    height: 136,
    resizeMode: 'contain',
  },
  profile_card_body_information_title: {
    fontWeight: '600',
    fontSize: 20,
    color: '#14142B',
    marginTop: 32,
    marginBottom: 4,
  },
  profile_card_body_information_title_job: {
    fontSize: 14,
    fontWeight: '400',
    color: '#4E4B66',
  },
  profile_settings_title: {
    color: '#14142B',
    fontWeight: '600',
    fontSize: 18,
    marginTop: 48,
  },
  profile_card_settings: {
    paddingHorizontal: 24,
    paddingVertical: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    marginTop: 39,
  },
  profile_card_settings_title: {
    fontSize: 16,
    fontWeight: '400',
    color: '#14142B',
    marginBottom: 8,
  },
  profile_card_privacy: {
    paddingHorizontal: 24,
    paddingVertical: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    marginTop: 39,
  },
  profile_button: {
    width: '100%',
    backgroundColor: '#5F2EEA',
    borderRadius: 8,
    elevation: 2,
    marginTop: 48,
    paddingVertical: 12,
  },
  profile_button_title: {
    textAlign: 'center',
    color: '#F7F7FC',
    fontWeight: 'bold',
    fontSize: 14,
  },

  // ORDER HISTORY
  profile_card_orderHistory: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    elevation: 1,
    marginTop: 32,
  },
  profile_card_orderHistory_body: {
    padding: 25,
  },
  profile_card_orderHistory_image: {
    width: 50.72,
    height: 17.08,
    resizeMode: 'contain',
  },
  profile_card_orderHistory_date: {
    marginTop: 18,
    color: '#AAAAAA',
    fontSize: 13,
    fontWeight: '400',
    marginBottom: 4,
  },
  profile_card_orderHistory_movie: {
    fontSize: 18,
    marginTop: 4,
    fontWeight: '600',
    color: '#000000',
  },
  profile_card_orderHistory_button_title: {
    fontWeight: '700',
    fontSize: 14,
    color: '#F7F7FC',
    textAlign: 'center',
  },
  profile_card_orderHistory_button_active: {
    backgroundColor: '#00BA88',
    borderRadius: 8,
    paddingVertical: 12,
    marginHorizontal: 24,
    marginTop: 24,
    marginBottom: 32,
  },
  profile_card_orderHistory_button_used: {
    backgroundColor: '#6E7191',
    borderRadius: 8,
    paddingVertical: 12,
    marginHorizontal: 24,
    marginTop: 24,
    marginBottom: 32,
  },
});
