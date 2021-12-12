import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  Pressable,
  TextInput,
} from 'react-native';
import {Header, Input, Footer, Modal} from '../../components';
import global from '../../../assets/css/global';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {getUser} from '../../stores/action/user';
import {useSelector, useDispatch} from 'react-redux';
import axios from '../../utils/axios';

export default function Payment({navigation, route}) {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const profileUser = user.users[0];
  const [fullname, setFullName] = useState(
    `${profileUser.firstName} ${profileUser.lastName}`,
  );
  const [email, setEmail] = useState(profileUser.email);
  const [phoneNumber, setPhoneNumber] = useState(profileUser.phoneNumber);
  const [modalVisibile, setModalVisible] = useState(false);
  const [methodPayment, setMethodPayment] = useState('');
  const [selectedMidtrans, setSelectedMidtrans] = useState('');
  const detailOrder = route.params;

  console.log('detil order =>', detailOrder);

  const [userAlreadyBooking, setUserAlreadyBooking] = useState('');

  const PopUpTransferPayment = payment => {
    setMethodPayment(payment);
    setModalVisible(true);
  };

  const selectedPaymentMidtrans = midtransText => {
    setSelectedMidtrans(midtransText);
  };

  const cancelSelectedPaymentMidtrans = () => {
    setSelectedMidtrans('');
  };

  const createBooking = async () => {
    try {
      const {userId, movieId, scheduleId, seat, timeBooking, dateBooking} =
        detailOrder;
      const setDataBooking = {
        userId,
        movieId,
        scheduleId,
        seat,
        timeBooking,
        dateBooking,
      };
      const response = await axios.post('booking/create', setDataBooking);
      setUserAlreadyBooking('ready');
      return navigation.navigate('MidtransScreen', {
        redirectUrl: response.data.data.redirect_url,
      });
    } catch (error) {
      new Error(error.resposne);
    }
  };

  // const createBookingTransfer = async () => {
  //   try {
  //     const {
  //       userId,
  //       movieId,
  //       scheduleId,
  //       seat,
  //       timeBooking,
  //       dateBooking,
  //       nameMovie,
  //       totalPayment,
  //     } = detailOrder;
  //     const setDetailBooking = {
  //       userId,
  //       movieId,
  //       scheduleId,
  //       seat,
  //       timeBooking,
  //       dateBooking,
  //     };
  //     await axios.post('booking/create', setDetailBooking);
  //     const setDetailTicketBooking = {
  //       nameMovie,
  //       userId,
  //       seat,
  //       timeBooking,
  //       dateBooking,
  //       totalPayment,
  //     };
  //     return navigation.navigate('Ticket', {
  //       setDetailTicketBooking,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    if (userAlreadyBooking === 'ready') {
      return navigation.navigate('Profile');
    }
    dispatch(getUser());
  }, []);

  const lengthFullName = fullname.split(' ').length >= 6 && true;
  const lengthEmail = email.split('').length >= 6 && true;
  const lengthPhoneNumber = phoneNumber.split('').length >= 6 && true;

  console.log(userAlreadyBooking);
  return (
    <ScrollView contentContainerStyle={styles.paymentMain}>
      <Header navigation={navigation} />
      <View style={styles.payment_header_total}>
        <Text
          style={[global.globalContainer, styles.payment_header_total_title]}>
          Total Payment
        </Text>
        <Text
          style={[
            global.globalContainer,
            styles.payment_header_total_title_price,
          ]}>
          Rp{new Intl.NumberFormat('id-ID').format(detailOrder.totalPayment)}
        </Text>
      </View>

      <View>
        <Modal
          methodPayment={methodPayment}
          setModalVisible={setModalVisible}
          modalVisibile={modalVisibile}
        />
      </View>

      <View style={[global.globalContainer, styles.payment_method_container]}>
        <Text style={styles.payment_title_method}>Payment Method</Text>
        <View style={styles.payment_card_method}>
          {selectedMidtrans !== 'midtrans' ? (
            <>
              <View style={styles.payment_card_method_body}>
                <Pressable onPress={() => PopUpTransferPayment('Gopay')}>
                  <View
                    style={
                      methodPayment === 'Gopay'
                        ? styles.payment_card_method_body_border_active
                        : styles.payment_card_method_body_border
                    }>
                    <Image
                      source={require('../../assets/images/GoPay.png')}
                      style={styles.payment_card_method_image}
                    />
                  </View>
                </Pressable>
                <Pressable onPress={() => PopUpTransferPayment('Ovo')}>
                  <View
                    style={
                      methodPayment === 'Ovo'
                        ? styles.payment_card_method_body_border_active
                        : styles.payment_card_method_body_border
                    }>
                    <Image
                      source={require('../../assets/images/Ovo.png')}
                      style={styles.payment_card_method_image}
                    />
                  </View>
                </Pressable>
                <Pressable onPress={() => PopUpTransferPayment('Paypal')}>
                  <View
                    style={
                      methodPayment === 'Paypal'
                        ? styles.payment_card_method_body_border_active
                        : styles.payment_card_method_body_border
                    }>
                    <Image
                      source={require('../../assets/images/Paypal.png')}
                      style={styles.payment_card_method_image}
                    />
                  </View>
                </Pressable>
                <Pressable onPress={() => PopUpTransferPayment('GooglePay')}>
                  <View
                    style={
                      methodPayment === 'GooglePay'
                        ? styles.payment_card_method_body_border_active
                        : styles.payment_card_method_body_border
                    }>
                    <Image
                      source={require('../../assets/images/GooglePay.png')}
                      style={styles.payment_card_method_image}
                    />
                  </View>
                </Pressable>
                <Pressable onPress={() => PopUpTransferPayment('BCA')}>
                  <View
                    style={
                      methodPayment === 'BCA'
                        ? styles.payment_card_method_body_border_active
                        : styles.payment_card_method_body_border
                    }>
                    <Image
                      source={require('../../assets/images/BCA.png')}
                      style={styles.payment_card_method_image}
                    />
                  </View>
                </Pressable>
                <Pressable onPress={() => PopUpTransferPayment('BRI')}>
                  <View
                    style={
                      methodPayment === 'BRI'
                        ? styles.payment_card_method_body_border_active
                        : styles.payment_card_method_body_border
                    }>
                    <Image
                      source={require('../../assets/images/BRI.png')}
                      style={styles.payment_card_method_image}
                    />
                  </View>
                </Pressable>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: 36,
                }}>
                <View style={styles.payment_card_method_question_line}></View>
                <View>
                  <Text style={styles.payment_card_method_question_title}>
                    or
                  </Text>
                </View>
                <View style={styles.payment_card_method_question_line}></View>
              </View>
            </>
          ) : null}

          <View
            style={
              selectedMidtrans === 'midtrans'
                ? styles.payment_card_method_viaMidtrans_selected
                : styles.payment_card_method_viaMidtrans
            }>
            <Text
              style={
                selectedMidtrans === 'midtrans'
                  ? styles.payment_card_method_title_viaMidtrans_active_selected
                  : styles.payment_card_method_title_viaMidtrans
              }
              onPress={() => selectedPaymentMidtrans('midtrans')}>
              Midtrans Payment
            </Text>
          </View>
          {selectedMidtrans === 'midtrans' ? (
            <Text
              style={styles.payment_card_method_title_viaMidtrans_cancel}
              onPress={cancelSelectedPaymentMidtrans}>
              Cancel
            </Text>
          ) : null}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 36,
            }}>
            <Text style={styles.payment_card_method_title_viaCash}>
              Pay via cash.
            </Text>
            <Text style={styles.payment_card_method_title_viaCash_active}>
              See how it work
            </Text>
          </View>
        </View>
        {/* PERSONAL INFO */}
        <View style={styles.personalInfo_container}>
          <Text style={styles.personalInfo_title}>Personal Info</Text>
          <View style={styles.personalInfo_card}>
            <View style={styles.inputComponentContainer}>
              <Text style={styles.inputComponentLabel}>Full Name</Text>
              <TextInput
                style={[styles.inputComponent]}
                placeholder="jonasrodridgurz"
                keyboardType="default"
                onChangeText={fullnameText => setFullName(fullnameText)}
                value={fullname}
              />
            </View>
            <View style={styles.inputComponentContainer}>
              <Text style={styles.inputComponentLabel}>Email</Text>
              <TextInput
                style={[styles.inputComponent]}
                placeholder="jonasrodri123@gmail.com"
                keyboardType="email-address"
                onChangeText={emailText => setEmail(emailText)}
                value={email}
              />
            </View>
            <View style={styles.inputComponentContainer}>
              <Text style={styles.inputComponentLabel}>Phone Number</Text>
              <TextInput
                style={[styles.inputComponent]}
                placeholder="81445687121"
                keyboardType="numeric"
                onChangeText={phoneText => setPhoneNumber(phoneText)}
                value={phoneNumber}
              />
            </View>

            {lengthFullName || lengthEmail || lengthPhoneNumber ? null : (
              <View style={styles.personalInfo_card_information}>
                <Icon
                  name="exclamation-triangle"
                  size={20}
                  color="#F4B740"
                  style={{marginHorizontal: 24}}
                />
                <Text style={styles.personalInfo_card_information_title}>
                  Fill your data correctly.
                </Text>
              </View>
            )}
          </View>

          {selectedMidtrans === 'midtrans' ? (
            <TouchableHighlight
              style={styles.personalInfo_button}
              onPress={createBooking}>
              <Text style={styles.personalInfo_button_title}>
                Pay your order
              </Text>
            </TouchableHighlight>
          ) : (
            <TouchableHighlight style={styles.personalInfo_button}>
              <Text style={styles.personalInfo_button_title}>
                Whatsapp +62 5720 2302 230
              </Text>
            </TouchableHighlight>
          )}
        </View>
      </View>
      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  paymentMain: {
    flexGrow: 1,
    backgroundColor: '#EFF0F6',
  },
  payment_header_total: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  payment_header_total_title: {
    marginHorizontal: 24,
    color: '#AAAAAA',
    fontSize: 16,
    marginTop: 18,
    marginBottom: 18,
  },
  payment_method_container: {
    marginTop: 40,
  },
  payment_header_total_title_price: {
    marginHorizontal: 24,
    marginTop: 18,
    marginBottom: 18,
    color: '#14142B',
    fontWeight: '600',
    fontSize: 20,
  },
  payment_title_method: {
    color: '#14142B',
    fontWeight: '600',
    fontSize: 18,
  },
  payment_card_method: {
    marginTop: 16,
    paddingVertical: 32,
    paddingHorizontal: 18,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
  },
  payment_card_method_body: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  payment_card_method_image: {
    width: 50,
    height: 16,
    resizeMode: 'contain',
  },
  payment_card_method_body_border: {
    borderWidth: 0.5,
    borderStyle: 'solid',
    marginTop: 16,
    borderColor: '#DEDEDE',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 9,
    marginHorizontal: 5,
  },
  payment_card_method_body_border_active: {
    borderWidth: 1,
    borderStyle: 'solid',
    marginTop: 16,
    borderColor: '#5F2EEA',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 9,
    marginHorizontal: 5,
  },

  payment_card_method_question_title: {
    color: '#A0A3BD',
    fontSize: 14,
    marginHorizontal: 41,
  },
  payment_card_method_question_line: {
    backgroundColor: '#DEDEDE',
    height: 1,
    marginTop: 10,
    width: '30%',
  },
  payment_card_method_title_viaCash: {
    color: '#6E7191',
    fontSize: 14,
  },
  payment_card_method_title_viaCash_active: {
    color: '#5F2EEA',
    fontSize: 14,
    marginHorizontal: 5,
  },
  payment_card_method_title_viaMidtrans_active_selected: {
    color: '#FFFFFF',
    fontSize: 14,
    marginHorizontal: 5,
  },
  payment_card_method_viaMidtrans_selected: {
    padding: 4,
    backgroundColor: '#5F2EEA',
    borderRadius: 4,
    width: '50%',
    marginHorizontal: 70,
  },
  payment_card_method_title_viaMidtrans: {
    color: '#5F2EEA',
    fontSize: 14,
    marginTop: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  payment_card_method_title_viaMidtrans_cancel: {
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 10,
    textAlign: 'center',
  },

  // PERSONAL INFO
  personalInfo_container: {
    marginTop: 40,
    marginBottom: 16,
  },
  personalInfo_title: {
    fontWeight: '600',
    fontSize: 18,
    color: '#14142B',
  },
  personalInfo_card: {
    marginTop: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 25,
    paddingHorizontal: 32,
  },
  personalInfo_card_information: {
    backgroundColor: '#F4B7404D',
    marginTop: 33,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 12,
  },
  personalInfo_card_information_title: {
    color: '#4E4B66',
    fontSize: 14,
    textAlign: 'center',
  },
  personalInfo_button: {
    marginTop: 67.2,
    borderRadius: 16,
    backgroundColor: '#5F2EEA',
    paddingVertical: 11.2,
    paddingHorizontal: 15.7,
  },
  personalInfo_button_title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    color: '#F7F7FC',
  },
  inputComponentContainer: {
    marginTop: 29,
  },
  inputComponent: {
    paddingHorizontal: 24,
    paddingVertical: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#DEDEDE',
    color: '#A0A3BD',
    fontSize: 16,
  },
  inputComponentLabel: {
    marginBottom: 10,
    color: '#4E4B66',
    fontSize: 16,
  },
});
