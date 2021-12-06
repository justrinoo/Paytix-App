import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableHighlight,
} from 'react-native';
import {Header, Footer} from '../../components';

import Icon from 'react-native-vector-icons/FontAwesome5';
export default function Seats({navigation}) {
  const listAlphabet = ['A', 'B', 'C', 'D', 'E', 'F'];

  let seats = [];
  for (let i = 1; i <= 36; i++) {
    seats.push(i);
  }

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
            <View style={styles.Seat_ListSeats}>
              <View style={styles.Seat_ListSeats_column}>
                {seats.map((seat, idx) => (
                  <View
                    key={idx}
                    style={[
                      styles.Seat_ListSeats_choose_available,
                      styles.Seat_ListSeats_choose_selected,
                      styles.Seat_ListSeats_choose_sold,
                    ]}></View>
                ))}
              </View>
              <View style={styles.Seat_ListSeats_column_space}></View>
              <View style={styles.Seat_ListSeats_column}>
                {seats.map((seat, idx) => (
                  <View
                    key={idx}
                    style={styles.Seat_ListSeats_choose_available}></View>
                ))}
              </View>
            </View>
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
                source={require('../../assets/images/Sponsor3.png')}
                style={styles.OrderInfo_Image}
              />
              <Text style={styles.OrderInfo_title_schedule}>
                CineOne21 Cinema
              </Text>
              <Text style={styles.OrderInfo_title_movie}>
                Spider-Man: Homecoming
              </Text>
            </View>
            <View style={styles.OrderInfo_desc}>
              <View style={styles.OrderInfo_desc_row}>
                <View>
                  <Text style={styles.orderInfo_desc_title}>
                    Tuesday, 07 July 2020
                  </Text>
                </View>
                <View style={styles.orderInfo_desc_title_value}>
                  <Text style={styles.orderInfo_desc_title_value}>02:00pm</Text>
                </View>
              </View>
              <View style={styles.OrderInfo_desc_row}>
                <View>
                  <Text style={styles.orderInfo_desc_title}>
                    One ticket price
                  </Text>
                </View>
                <View>
                  <Text style={styles.orderInfo_desc_title_value}>$10</Text>
                </View>
              </View>
              <View style={styles.OrderInfo_desc_row}>
                <View>
                  <Text style={styles.orderInfo_desc_title}>Seat choosed</Text>
                </View>
                <View>
                  <Text style={styles.orderInfo_desc_title_value}>
                    C4, C5, C6
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
                <Text style={styles.orderInfo_desc_result_title_value}>
                  $30
                </Text>
              </View>
            </View>
          </View>

          <TouchableHighlight
            underlayColor="none"
            style={styles.orderInfo_button}
            onPress={() => navigation.navigate('Payment')}>
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
  Seat_ListSeats: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  Seat_ListSeats_column: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '53%',
  },
  Seat_ListSeats_column_space: {
    width: '2%',
  },
  Seat_SeatsContainer: {
    marginTop: 16,
  },
  Seat_ListSeats_choose_available: {
    backgroundColor: '#D6D8E7',
    width: 14,
    height: 14,
    borderRadius: 2,
    marginHorizontal: 3,
    marginTop: 6,
    marginVertical: 2,
  },
  Seat_ListSeats_choose_sold: {
    backgroundColor: '#6E7191',
    width: 14,
    height: 14,
    borderRadius: 2,
    marginHorizontal: 3,
    marginTop: 6,
    marginVertical: 2,
  },
  Seat_ListSeats_choose_selected: {
    backgroundColor: '#5F2EEA',
    width: 14,
    height: 14,
    borderRadius: 2,
    marginHorizontal: 3,
    marginTop: 6,
    marginVertical: 2,
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
});
