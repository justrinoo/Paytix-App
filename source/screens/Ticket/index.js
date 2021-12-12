import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, StyleSheet, Image} from 'react-native';
import {Footer, Header} from '../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
export default function Ticket({navigation}) {
  const [title, setTitle] = useState('');
  const dataTicket = useSelector(state => state.user);
  const setDetailTicketBooking = dataTicket.setDataTicket;
  const getNameMovie = async () => {
    const nameMovie = await AsyncStorage.getItem('title');
    setTitle(nameMovie);
  };
  useEffect(() => {
    getNameMovie();
  }, []);
  return (
    <ScrollView contentContainerStyle={styles.ticket_container}>
      <Header navigation={navigation} />

      <View style={styles.ticket_card}>
        <Image
          source={require('../../assets/images/success.png')}
          style={styles.ticket_card_image}
        />
        <Text style={styles.ticket_card_title}>Thank You!</Text>
        <Text style={styles.ticket_card_desc}>
          Your transaction was successful!
        </Text>
        <View style={styles.ticket_card_space_line}></View>

        <View style={styles.ticket_card_bitmap_container}>
          <Image
            source={require('../../assets/images/bitmap1.png')}
            style={styles.ticket_card_bitmap}
          />
          <Image
            source={require('../../assets/images/bitmap2.png')}
            style={styles.ticket_card_bitmap}
          />
          <Image
            source={require('../../assets/images/bitmap3.png')}
            style={styles.ticket_card_bitmap}
          />
          <Image
            source={require('../../assets/images/bitmap4.png')}
            style={styles.ticket_card_bitmap}
          />
        </View>

        <View style={styles.ticket_card_desc_container}>
          <View style={styles.ticket_card_desc_row}>
            <View style={styles.ticket_card_desc_column}>
              <Text style={styles.ticket_card_desc_column_title}>Movie</Text>
              <Text style={styles.ticket_card_desc_column_title}>Category</Text>
            </View>
            <View style={styles.ticket_card_desc_column}>
              <Text
                style={styles.ticket_card_desc_column_title_value_movie}
                numberOfLines={1}
                ellipsizeMode="tail">
                {title}
              </Text>
              <Text style={styles.ticket_card_desc_column_title_value}>
                PG-{setDetailTicketBooking.id.substring(1, 3)}
              </Text>
            </View>
            <View style={styles.ticket_card_desc_column}>
              <Text style={styles.ticket_card_desc_column_title}>Date</Text>
              <Text style={styles.ticket_card_desc_column_title}>Time</Text>
            </View>
            <View style={styles.ticket_card_desc_column}>
              <Text style={styles.ticket_card_desc_column_title_value}>
                {new Date(setDetailTicketBooking.dateBooking).toDateString()}
              </Text>
              <Text style={styles.ticket_card_desc_column_title_value}>
                {setDetailTicketBooking.timeBooking >= 18
                  ? `${setDetailTicketBooking.timeBooking.substring(0, 5)}pm`
                  : `${setDetailTicketBooking.timeBooking.substring(0, 5)}am`}
              </Text>
            </View>
            <View style={styles.ticket_card_desc_column}>
              <Text style={styles.ticket_card_desc_column_title}>Count</Text>
              <Text style={styles.ticket_card_desc_column_title}>Seats</Text>
            </View>
            <View style={styles.ticket_card_desc_column}>
              <Text
                style={styles.ticket_card_desc_column_title_value}
                numberOfLines={1}
                ellipsizeMode="tail">
                {setDetailTicketBooking.seat.length} pcs
              </Text>
              <Text
                style={styles.ticket_card_desc_column_title_value_seat}
                numberOfLines={1}
                ellipsizeMode="tail">
                {setDetailTicketBooking.seat.join(', ')}
              </Text>
            </View>
          </View>
          <View style={styles.ticket_card_desc_row_total}>
            <Text style={styles.ticket_card_desc_row_total_title}>Total</Text>
            <Text style={styles.ticket_card_desc_row_total_value}>
              Rp
              {new Intl.NumberFormat('id-ID').format(
                setDetailTicketBooking.totalPayment,
              )}
            </Text>
          </View>
        </View>
      </View>
      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  ticket_container: {
    flexGrow: 1,
    backgroundColor: '#5F2EEA',
  },
  ticket_card: {
    position: 'relative',
    backgroundColor: '#FFFFFF',
    marginTop: 48,
    marginHorizontal: 40,
    borderRadius: 8,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 72,
  },
  ticket_card_image: {
    width: 46.67,
    height: 46.67,
    marginTop: 20,
  },
  ticket_card_title: {
    color: '#000000',
    fontWeight: '700',
    fontSize: 24,
    marginTop: 12,
  },
  ticket_card_desc: {
    color: '#AAAAAA',
    fontSize: 13,
    marginTop: 8,
    marginBottom: 48,
  },
  ticket_card_space_line: {
    width: '100%',
    marginBottom: 20,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#DEDEDE',
  },
  ticket_card_bitmap_container: {
    marginBottom: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ticket_card_bitmap: {
    width: 61,
    height: 61,
  },
  ticket_card_desc_row: {},
  ticket_card_desc_column: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ticket_card_desc_column_title: {
    color: '#AAAAAA',
    fontWeight: '600',
    fontSize: 12,
    marginTop: 20,
  },
  ticket_card_desc_column_title_value_movie: {
    color: '#14142B',
    fontWeight: '600',
    fontSize: 14,
    width: '60%',
  },
  ticket_card_desc_column_title_value: {
    color: '#14142B',
    fontWeight: '600',
    fontSize: 14,
    marginTop: 5,
  },
  ticket_card_desc_column_title_value_seat: {
    color: '#14142B',
    fontWeight: '600',
    fontSize: 14,
    marginTop: 5,
    width: 80,
  },
  ticket_card_desc_row_total: {
    flexDirection: 'row',
    marginTop: 40,
    justifyContent: 'space-between',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#DEDEDE',
    paddingVertical: 10,
    paddingHorizontal: 24,
    marginBottom: 32,
    alignItems: 'center',
  },
  ticket_card_desc_row_total_title: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
  ticket_card_desc_row_total_value: {
    color: '#000000',
    fontSize: 16,
  },
});
