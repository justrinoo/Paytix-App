import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableHighlight,
  Alert,
} from 'react-native';
import {Header, Footer, ListSeats} from '../../components';

import Icon from 'react-native-vector-icons/FontAwesome5';
import IconClose from 'react-native-vector-icons/Ionicons';
import {getUser} from '../../stores/action/user';
import axios from '../../utils/axios';
import {useSelector, useDispatch} from 'react-redux';
export default function Seats({navigation, route}) {
  const dispatch = useDispatch();
  const [questionSeat, setQuestionSeat] = useState(false);
  const [userSeats, setUserSeats] = useState([]);
  const [soldSeat, setSoldSeat] = useState([]);
  const user = useSelector(state => state.user);
  const detailUser = user.users[0];
  const {detailOrder} = route.params;

  const orderDetail = detailOrder[0];

  const {date, dateBooking, movieId, nameMovie, premiere, scheduleId, time} =
    orderDetail;

  const listAlphabet = ['A', 'B', 'C', 'D', 'E', 'F'];

  const userBookSoldSeat = async () => {
    try {
      const response = await axios.get(
        `booking/seat?scheduleId=${scheduleId}&movieId=${movieId}&dateBooking=${dateBooking}&timeBooking=${time}`,
      );
      const seat = response.data.data.map(value => value.seat);
      setSoldSeat(seat);
    } catch (error) {
      new Error(error);
    }
  };

  useEffect(() => {
    dispatch(getUser());
    userBookSoldSeat();
  }, []);

  const chooseSeats = seat => {
    if (userSeats.includes(seat)) {
      const cancelSeat = userSeats.filter(value => value !== seat);
      setUserSeats(cancelSeat);
    } else if (userSeats.length === 10) {
      Alert.alert('Message', 'Are you sure you booked more than 10 seats?', [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => {
            setUserSeats([...userSeats]);
          },
        },
        {
          text: 'OK',
          onPress: () => {
            setUserSeats([...userSeats, seat]);
          },
        },
      ]);
    } else {
      setUserSeats([...userSeats, seat]);
    }
  };
  const goToCheckout = () => {
    navigation.navigate('Payment', {
      userId: detailUser.id, // from redux
      movieId: movieId,
      nameMovie: nameMovie,
      scheduleId: scheduleId,
      dateBooking: dateBooking,
      timeBooking: time,
      seat: userSeats,
      totalPayment: `${
        premiere === 'Hiflix'
          ? userSeats.length * 50000
          : premiere === 'Ebv.id'
          ? userSeats.length * 35000
          : premiere === 'CineOne21'
          ? userSeats.length * 75000
          : null
      }`,
    });
  };

  const ClearSeats = () => {
    setUserSeats([]);
  };

  return (
    <ScrollView contentContainerStyle={styles.Seat_main}>
      <Header navigation={navigation} />
      <View style={styles.Seat_container}>
        <Text style={styles.Seat_title}>Choose Your Seat</Text>

        <View style={styles.Seat_card}>
          <View
            style={{
              height: 5,
              backgroundColor: '#9570FE',
              borderRadius: 3,
            }}></View>

          <View style={styles.Seat_SeatsContainer}>
            {listAlphabet.map((value, idx) => (
              <View key={idx}>
                <ListSeats
                  keyAlphabet={value}
                  selectedSeats={userSeats}
                  soldSeats={soldSeat}
                  chooseSeats={chooseSeats}
                />
              </View>
            ))}
          </View>

          {/* SEAT */}
          <View style={styles.Seat_Keys}>
            <Text style={styles.Seat_Keys_title}>Seating Key</Text>
            <View style={styles.Seat_Keys_rows}>
              <View>
                <View style={styles.Seat_Keys_column_alphabet_left}>
                  <Icon name="arrow-down" size={20} color="#14142B" />
                  <Text style={styles.Seat_Keys_column_title}>A - F</Text>
                </View>
                <View style={styles.Seat_Keys_column_seat_options}>
                  <View
                    style={{
                      backgroundColor: '#D6D8E7',
                      width: 20,
                      height: 20,
                      borderRadius: 4,
                    }}></View>
                  <Text style={styles.Seat_Keys_column_seat_options_title}>
                    Available
                  </Text>
                </View>
                <View style={styles.Seat_Keys_column_seat_options}>
                  <View
                    style={{
                      backgroundColor: '#F589D7',
                      width: 20,
                      height: 20,
                      borderRadius: 4,
                    }}></View>
                  <Text style={styles.Seat_Keys_column_seat_options_title}>
                    Love nest
                  </Text>
                </View>
              </View>
              <View>
                <View style={styles.Seat_Keys_column_alphabet_right}>
                  <Icon name="arrow-right" size={20} color="#14142B" />
                  <Text style={styles.Seat_Keys_column_title}>1 - 12</Text>
                </View>
                <View style={styles.Seat_Keys_column_seat_options}>
                  <View
                    style={{
                      backgroundColor: '#5F2EEA',
                      width: 20,
                      height: 20,
                      borderRadius: 4,
                      marginLeft: 30,
                    }}></View>
                  <Text style={styles.Seat_Keys_column_seat_options_title}>
                    Selected
                  </Text>
                </View>
                <View style={styles.Seat_Keys_column_seat_options}>
                  <View
                    style={{
                      backgroundColor: '#6E7191',
                      width: 20,
                      height: 20,
                      borderRadius: 4,
                      marginLeft: 30,
                    }}></View>
                  <Text style={styles.Seat_Keys_column_seat_options_title}>
                    Sold
                  </Text>
                </View>
              </View>
            </View>
          </View>
          {/* END SEAT */}
        </View>

        {/* ORDER INFO */}
        <View style={styles.OrderInfo_container}>
          <Text style={styles.OrderInfo_title}>Order Info</Text>

          <View style={styles.OrderInfo_Card}>
            <View style={styles.OrderInfo_Card_Rows}>
              <Image
                source={
                  premiere === 'Ebv.id'
                    ? require('../../assets/images/Sponsor2.png')
                    : premiere === 'Hiflix'
                    ? require('../../assets/images/Sponsor1.png')
                    : premiere === 'CineOne21'
                    ? require('../../assets/images/Sponsor3.png')
                    : null
                }
                style={styles.OrderInfo_Image}
              />
              <Text style={styles.OrderInfo_title_schedule}>{premiere}</Text>
              <Text style={styles.OrderInfo_title_movie}>{nameMovie}</Text>
            </View>
            <View style={styles.OrderInfo_desc}>
              <View style={styles.OrderInfo_desc_row}>
                <View>
                  <Text style={styles.orderInfo_desc_title}>{date}</Text>
                </View>
                <View style={styles.orderInfo_desc_title_value}>
                  <Text style={styles.orderInfo_desc_title_value}>
                    {time >= 18 ? `${time}pm` : `${time}am`}
                  </Text>
                </View>
              </View>
              <View style={styles.OrderInfo_desc_row}>
                <View>
                  <Text style={styles.orderInfo_desc_title}>
                    One ticket price
                  </Text>
                </View>
                <View>
                  <Text style={styles.orderInfo_desc_title_value}>
                    Rp{' '}
                    {premiere === 'Hiflix'
                      ? new Intl.NumberFormat('id-ID').format('50000')
                      : premiere === 'Ebv.id'
                      ? new Intl.NumberFormat('id-ID').format('35000')
                      : premiere === 'CineOne21'
                      ? new Intl.NumberFormat('id-ID').format('75000')
                      : null}
                  </Text>
                </View>
              </View>
              <View style={styles.OrderInfo_desc_row}>
                <View>
                  <Text style={styles.orderInfo_desc_title}>Seat choosed</Text>
                </View>
                <View style={{position: 'relative'}}>
                  {userSeats.length > 0 ? (
                    <View>
                      <IconClose
                        onPress={ClearSeats}
                        name="close"
                        size={20}
                        color="#14142B"
                        style={{position: 'absolute', left: -18, top: 2}}
                      />
                    </View>
                  ) : null}
                  <Text
                    style={styles.orderInfo_desc_title_value_seat}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {userSeats.length > 0 ? userSeats.join(', ') : '-'}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  backgroundColor: '#E6E6E6',
                  height: 1,
                  marginTop: 33,
                }}></View>

              <View style={styles.orderInfo_desc_result}>
                <Text style={styles.orderInfo_desc_result_title}>
                  Total Payment
                </Text>
                <Text style={styles.orderInfo_desc_result_title_value_payment}>
                  {userSeats.length > 0
                    ? `Rp${new Intl.NumberFormat('id-ID', {}).format(
                        premiere === 'Hiflix'
                          ? userSeats.length * 50000
                          : premiere === 'Ebv.id'
                          ? userSeats.length * 35000
                          : premiere === 'CineOne21'
                          ? userSeats.length * 75000
                          : null,
                      )}`
                    : '-'}
                </Text>
              </View>
            </View>
          </View>

          <TouchableHighlight
            underlayColor="none"
            style={
              userSeats.length === 0
                ? styles.disabledButton
                : styles.orderInfo_button
            }
            disabled={userSeats.length === 0 && true}
            onPress={goToCheckout}>
            <Text style={styles.orderInfo_button_title}>Checkout Now</Text>
          </TouchableHighlight>
        </View>

        {/* END ORDER INFO */}
      </View>
      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  Seat_main: {
    flexGrow: 1,
    backgroundColor: '#EFF0F6',
  },
  Seat_container: {
    marginHorizontal: 34,
  },
  Seat_title: {
    marginTop: 32,
    fontWeight: '600',
    fontSize: 18,
    color: '#14142B',
  },
  Seat_card: {
    marginTop: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 41,
    paddingHorizontal: 16,
  },
  Seat_Keys: {
    marginTop: 24,
  },
  Seat_Keys_title: {
    color: '#000000',
    fontWeight: '600',
    fontSize: 16,
  },
  Seat_Keys_rows: {
    flexDirection: 'row',
    width: '55%',
    justifyContent: 'space-between',
    marginTop: 18,
  },
  Seat_Keys_column_alphabet_left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Seat_Keys_column_alphabet_right: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 30,
  },
  Seat_Keys_column_title: {
    fontWeight: '600',
    marginLeft: 13,
    fontSize: 13,
    color: '#4E4B66',
  },
  Seat_Keys_column_seat_options: {
    marginTop: 19,
    flexDirection: 'row',
    alignItems: 'center',
  },
  Seat_Keys_column_seat_options_title: {
    color: '#4E4B66',
    fontSize: 13,
    marginLeft: 10,
  },

  // ORDER INFO
  OrderInfo_container: {
    marginTop: 25,
  },
  OrderInfo_title: {
    color: '#14142B',
    fontWeight: '600',
    fontSize: 18,
  },
  OrderInfo_Card_Rows: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  OrderInfo_Card: {
    marginTop: 11,
    backgroundColor: '#FFFFFF',
    elevation: 1,
    borderRadius: 6,
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  OrderInfo_Image: {
    width: 114,
    height: 20,
    resizeMode: 'contain',
  },
  OrderInfo_title_schedule: {
    color: '#14142B',
    fontWeight: '600',
    fontSize: 24,
    letterSpacing: 0.75,
    marginTop: 9,
  },
  OrderInfo_title_movie: {
    marginTop: 8,
    fontWeight: '600',
    fontSize: 14,
    color: '#14142B',
    marginBottom: 26,
  },
  OrderInfo_desc_row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderInfo_desc_title: {
    marginTop: 11,
    color: '#6B6B6B',
    fontSize: 14,
  },
  orderInfo_desc_title_value: {
    marginTop: 11,
    color: '#14142B',
    fontWeight: '600',
    fontSize: 14,
  },
  orderInfo_desc_title_value_seat: {
    marginTop: 11,
    width: 85,
    color: '#14142B',
    fontWeight: '600',
    fontSize: 14,
  },
  orderInfo_desc_result: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  orderInfo_desc_result_title: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
  },
  orderInfo_desc_result_title_value: {
    color: '#5F2EEA',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  orderInfo_desc_result_title_value_payment: {
    color: '#5F2EEA',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  orderInfo_button: {
    backgroundColor: '#5F2EEA',
    width: '100%',
    marginTop: 90,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 16,
  },
  orderInfo_button_title: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
  },
  disabledButton: {
    backgroundColor: '#5F2EEA',
    opacity: 0.5,
    width: '100%',
    marginTop: 90,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 16,
  },
});
