import React, {useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Modal,
  TouchableHighlight,
  Pressable,
  CheckBox,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import global from '../../../assets/css/global';
import {Footer, Header, Input} from '../../components';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useState} from 'react/cjs/react.development';
import axios from '../../utils/axios';
import {getUser, setDataTicketBooking} from '../../stores/action/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
export default function Profile({navigation}) {
  // const [image, setImage] = useState(null);
  const [formImage, setFormImage] = useState({
    image: '',
  });
  const [loading, setLoading] = useState(false);

  const [popUpSettings, setPopUpSettings] = useState(false);
  const [popUpModalQuestion, setPopUpModalQuestion] = useState(false);
  const [menuActive, setMenuActive] = useState('Detail');
  const user = useSelector(state => state.user);
  const dispatch = useDispatch(getUser());
  const [selectOptionUpdate, setSelectOptionUpdate] = useState('');

  const userInformation = user.users[0];

  const [orderHistories, setOrderHistories] = useState([]);
  const [dataBooking, setDataBooking] = useState([]);

  // ACCOUNT SETTINGS STATE
  const [firstName, setFirstName] = useState(userInformation.firstName);
  const [lastName, setLastName] = useState(userInformation.lastName);
  const [email, setEmail] = useState(userInformation.email);
  const [phoneNumber, setPhoneNumber] = useState(userInformation.phoneNumber);

  const updateDetailInformation = async () => {
    try {
      const setDataUpdateDetailInformation = {
        firstName,
        lastName,
        email,
      };
      const response = await axios.patch(
        'user/update-profile',
        setDataUpdateDetailInformation,
      );

      setSelectOptionUpdate('');
      Toast.show({
        type: 'success',
        text1: 'From Paytix:',
        text2: response.data.message,
        visibilityTime: 10000,
      });
      dispatch(getUser());
    } catch (error) {
      console.log('error update profile =>', error.response);
    }
  };

  // PASSWORD SETTINGS STATE
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState(false);
  const [messagePassword, setMessagePassword] = useState('');
  const updatePassword = async () => {
    try {
      const setDataUpdatePassword = {
        newPassword,
        confirmPassword,
      };
      const response = await axios.patch(
        'auth/update-password',
        setDataUpdatePassword,
      );
      setNewPassword('');
      setConfirmPassword('');
      setSelectOptionUpdate('');
      Toast.show({
        type: 'success',
        text1: 'From Paytix:',
        text2: response.data.message,
        visibilityTime: 10000,
      });
    } catch (error) {
      setErrorPassword(true);
      setMessagePassword(error.response.data.message);
      console.log(error.response);
    }
  };

  const getOrderHistoryUserBuyTicket = async () => {
    try {
      const response = await axios.get('booking/user-id');
      const filterStatusSuccess = response.data.data.filter(
        value => value.statusPayment === 'Success',
      );
      setOrderHistories(filterStatusSuccess);
    } catch (error) {
      new Error(error.response);
    }
  };

  // const getOrderHistoryUserByBookingId = async bookindId => {
  //   try {
  //     const response = await axios.get(`booking/booking-id/${bookindId}`);
  //     setDataBooking([response.data.data]);
  //     console.log('data booking =>', dataBooking);
  //   } catch (error) {
  //     new Error(error.response);
  //   }
  // };

  useEffect(() => {
    getOrderHistoryUserBuyTicket();
    dispatch(getUser());
  }, []);

  const changeMenuScreen = menu => {
    setMenuActive(menu);
  };

  const handlerUsedTicket = async (id, nameMovie) => {
    try {
      await axios.get(`booking/used-ticket/${id}`);
      await AsyncStorage.setItem('title', nameMovie);
      dispatch(setDataTicketBooking(id));
      setTimeout(() => {
        navigation.navigate('Ticket', {
          setDetailTicketBooking: dataBooking,
        });
        getOrderHistoryUserBuyTicket();
      }, 1500);
    } catch (error) {
      new Error(error.response);
    }
  };

  const showPopUpSettings = () => {
    setPopUpSettings(true);
  };

  const showPopUpImageQuestion = () => {
    setPopUpModalQuestion(true);
  };

  const showCameraPicker = async () => {
    const result = await launchCamera({
      maxHeight: 10000,
      maxWidth: 10000,
      quality: 0.5,
    });
    const setDataImage = {
      uri: result.assets[0].uri,
      type: result.assets[0].type,
      name: result.assets[0].fileName,
    };
    setFormImage({image: setDataImage});
  };
  const showGalleryPicker = async () => {
    const result = await launchImageLibrary();
    // URI
    // FileName
    // Type
    const setDataImage = {
      uri: result.assets[0].uri,
      type: result.assets[0].type,
      name: result.assets[0].fileName,
    };
    setFormImage({image: setDataImage});
  };

  const UpdateImage = async () => {
    // console.log('image =>', image);
    try {
      const formData = new FormData();
      for (const data in formImage) {
        formData.append(data, formImage[data]);
      }
      setLoading(true);
      const response = await axios.patch(`user/update-image`, formData);
      Toast.show({
        type: 'success',
        text1: `Hello ${userInformation.firstName} ${userInformation.lastName}`,
        text2: response.data.message,
        position: 'top',
      });
      setTimeout(() => {
        setLoading(false);
        setPopUpModalQuestion(false);
        setPopUpSettings(false);
      }, 2000);
      setFormImage({image: ''});
      dispatch(getUser());
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: `Hello ${userInformation.firstName} ${userInformation.lastName}`,
        text2: error.response.data.message,
        position: 'top',
      });
      setLoading(false);
    }
  };

  const handleSelectOptionUpdate = text => {
    setSelectOptionUpdate(text);
  };

  console.log('data booking =>', dataBooking);
  return (
    <ScrollView style={styles.profile_main}>
      <Header navigation={navigation} />
      <Toast />

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
                <Icon
                  name="ellipsis-h"
                  size={28}
                  color="#5F2EEA"
                  onPress={showPopUpSettings}
                />
              </View>
              <View>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={popUpSettings}
                  onRequestClose={() => {
                    setPopUpSettings(!popUpSettings);
                  }}>
                  <View style={styles.modalSettings}>
                    <View style={styles.modalView}>
                      <Pressable onPress={showPopUpImageQuestion}>
                        <View
                          style={{
                            backgroundColor: '#DEDEDE',
                            width: 100,
                            height: 100,
                            flexDirection: 'column',
                            alignContent: 'center',
                            alignItems: 'center',
                            borderRadius: 100,
                            marginBottom: 10,
                          }}>
                          <Image
                            source={require('../../assets/images/camera.png')}
                            style={styles.modalImage}
                          />
                        </View>
                      </Pressable>
                      <Modal
                        animationType="fade"
                        transparent={false}
                        visible={popUpModalQuestion}
                        onRequestClose={() => {
                          setPopUpModalQuestion(!popUpModalQuestion);
                        }}>
                        <View style={styles.modalViewQuestion}>
                          <Toast />
                          <Text
                            style={{
                              color: '#000000',
                              fontSize: 24,
                              fontWeight: 'bold',
                            }}>
                            Please choose upload image
                          </Text>
                          {formImage.image === '' ? null : (
                            <Image
                              source={{
                                uri: 'https://inspektorat.kotawaringinbaratkab.go.id/public/uploads/user/default-user-imge.jpeg',
                              }}
                              style={{width: 100, height: 100}}
                            />
                          )}
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'center',
                            }}>
                            <Pressable onPress={showCameraPicker}>
                              <View
                                style={{marginHorizontal: 20, marginTop: 30}}>
                                <Icon
                                  name="camera"
                                  size={35}
                                  style={{marginLeft: 4}}
                                  color="#A0A3BD"
                                />
                                <Text
                                  style={{
                                    marginTop: 10,
                                    fontWeight: '600',
                                    color: '#000000',
                                  }}>
                                  Camera
                                </Text>
                              </View>
                            </Pressable>
                            <Pressable onPress={showGalleryPicker}>
                              <View
                                style={{marginHorizontal: 20, marginTop: 30}}>
                                <Icon
                                  name="images"
                                  size={35}
                                  style={{marginLeft: 4}}
                                  color="#A0A3BD"
                                />
                                <Text
                                  style={{
                                    marginTop: 10,
                                    fontWeight: '600',
                                    color: '#000000',
                                  }}>
                                  Gallery
                                </Text>
                              </View>
                            </Pressable>
                          </View>
                          {formImage.image === '' ? null : (
                            <TouchableHighlight
                              style={{
                                backgroundColor: '#5F2EEA',
                                borderRadius: 8,
                                marginTop: 30,
                                padding: 8,
                              }}
                              onPress={UpdateImage}>
                              <Text
                                style={{color: '#FFFFFF', fontWeight: 'bold'}}>
                                {loading ? (
                                  <ActivityIndicator size="large" />
                                ) : (
                                  'Upload'
                                )}
                              </Text>
                            </TouchableHighlight>
                          )}
                        </View>
                      </Modal>
                      <Text
                        style={{
                          color: '#14142B',
                          fontWeight: 'bold',
                          fontSize: 18,
                        }}>
                        Choose your image
                      </Text>
                      <View>
                        <Pressable
                          style={styles.modalButton_close}
                          onPress={() => setPopUpSettings(!popUpSettings)}>
                          <Text style={styles.textStyle}>Cancel</Text>
                        </Pressable>
                      </View>
                    </View>
                  </View>
                </Modal>
              </View>
              <View style={styles.profile_card_body_information}>
                <Image
                  source={{
                    uri: userInformation.image
                      ? `https://paytix.herokuapp.com/uploads/user/${userInformation.image}`
                      : 'https://inspektorat.kotawaringinbaratkab.go.id/public/uploads/user/default-user-imge.jpeg',
                  }}
                  style={styles.profile_card_body_information_image}
                />
                <Text style={styles.profile_card_body_information_title}>
                  {userInformation.firstName} {userInformation.lastName}
                </Text>
                <Text style={styles.profile_card_body_information_title_job}>
                  {userInformation.email}
                </Text>
              </View>
            </View>

            <Text style={styles.profile_settings_title}>Account Settings</Text>
            <Pressable
              onPress={() => handleSelectOptionUpdate('AccountSettings')}>
              <View
                style={
                  selectOptionUpdate === 'AccountSettings'
                    ? styles.profile_card_settings_selected
                    : styles.profile_card_settings
                }>
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
                  childrenText="First Name"
                  childrenPlaceHolder="Jonas El"
                  childrenType="default"
                  childrenOnChange={firstNameText =>
                    setFirstName(firstNameText)
                  }
                  isValue={true}
                  childrenValue={firstName}
                />
                <Input
                  childrenText="Last Name"
                  childrenPlaceHolder="Rodriguez"
                  childrenType="default"
                  childrenOnChange={lastNameText => setLastName(lastNameText)}
                  isValue={true}
                  childrenValue={lastName}
                />
                <Input
                  childrenText="E-mail"
                  childrenPlaceHolder="jonasrodrigu123@gmail.com"
                  childrenType="email-address"
                  isDisabled={true}
                  childrenOnChange={emailText => setEmail(emailText)}
                  isValue={true}
                  childrenValue={email}
                />
                <Input
                  childrenText="Phone Number"
                  childrenPlaceHolder="81445687121"
                  childrenType="numeric"
                  isDisabled={true}
                  childrenOnChange={phoneNumberText =>
                    setPhoneNumber(phoneNumberText)
                  }
                  isValue={true}
                  childrenValue={phoneNumber}
                />
              </View>
            </Pressable>
            <Pressable
              onPress={() => handleSelectOptionUpdate('PrivacyPassword')}>
              <View
                style={
                  selectOptionUpdate === 'PrivacyPassword'
                    ? styles.profile_card_privacy_selected
                    : styles.profile_card_privacy
                }>
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
                  childrenType="default"
                  isPassword={true}
                  childrenOnChange={newText => setNewPassword(newText)}
                />
                <Input
                  childrenText="Confirm Password"
                  childrenPlaceHolder="••••••••••"
                  childrenType="default"
                  isPassword={true}
                  childrenOnChange={confirmText =>
                    setConfirmPassword(confirmText)
                  }
                />
                {errorPassword ? (
                  <>
                    <View>
                      <Text
                        style={{
                          color: '#ED2E7E',
                          fontWeight: 'bold',
                          textAlign: 'center',
                          marginTop: 5,
                        }}>
                        {selectOptionUpdate === 'PrivacyPassword'
                          ? messagePassword
                          : null}
                      </Text>
                    </View>
                  </>
                ) : null}
              </View>
            </Pressable>

            {selectOptionUpdate === '' ? null : (
              <TouchableHighlight
                style={styles.profile_button}
                onPress={
                  selectOptionUpdate === 'AccountSettings'
                    ? updateDetailInformation
                    : updatePassword
                }>
                <Text style={styles.profile_button_title}>
                  {selectOptionUpdate === 'AccountSettings'
                    ? 'Update Detail Account'
                    : 'Update New Password'}
                </Text>
              </TouchableHighlight>
            )}
          </>
        ) : (
          <ScrollView>
            {orderHistories.map(item => (
              <View style={styles.profile_card_orderHistory} key={item.id}>
                <View style={styles.profile_card_orderHistory_body}>
                  {/* <Image
                      source={
                        item === 'Ebv.id'
                          ? require('../../assets/images/Sponsor2.png')
                          : item === 'Hiflix'
                          ? require('../../assets/images/Sponsor1.png')
                          : item === 'CineOne21'
                          ? require('../../assets/images/Sponsor3.png')
                          : null
                      }
                      style={styles.profile_card_orderHistory_image}
                    /> */}
                  <Text style={styles.profile_card_orderHistory_date}>
                    {new Date(item.dateBooking).toDateString()} -{' '}
                    {item.timeBooking.substring(0, 5) >= 18
                      ? `${item.timeBooking.substring(0, 5)}pm`
                      : `${item.timeBooking.substring(0, 5)}am`}
                  </Text>
                  <Text style={styles.profile_card_orderHistory_movie}>
                    {item.title}
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
                  underlayColor="none"
                  onPress={() =>
                    item.statusUsed === 'active'
                      ? handlerUsedTicket(item.id, item.title)
                      : null
                  }
                  style={
                    item.statusUsed === 'active'
                      ? styles.profile_card_orderHistory_button_active
                      : styles.profile_card_orderHistory_button_used
                  }>
                  <Text style={styles.profile_card_orderHistory_button_title}>
                    {item.statusUsed === 'active'
                      ? 'Ticket in active'
                      : 'Ticket Already used'}
                  </Text>
                </TouchableHighlight>
              </View>
            ))}
          </ScrollView>
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
    borderRadius: 100,
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
  profile_card_settings_selected: {
    paddingHorizontal: 24,
    paddingVertical: 40,
    borderColor: '#5F2EEA',
    borderStyle: 'solid',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
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
  profile_card_privacy_selected: {
    borderColor: '#5F2EEA',
    borderStyle: 'solid',
    borderWidth: 2,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 40,
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
  modalSettings: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 55,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalButton_close: {
    padding: 6,
    borderColor: '#5F2EEA',
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 4,
    marginTop: 30,
  },
  textStyle: {
    color: '#5F2EEA',
    fontWeight: '700',
    fontSize: 16,
  },
  modalImage: {
    width: 50,
    height: 45,
    resizeMode: 'contain',
    marginTop: 30,
  },
  modalViewQuestion: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
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
