import React from 'react';
import {View, Text, ScrollView, StyleSheet, Image} from 'react-native';
import {Footer, Header} from '../../components';
export default function Ticket({navigation}) {
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
                Spiderman HomeComing
              </Text>
              <Text style={styles.ticket_card_desc_column_title_value}>
                PG-13
              </Text>
            </View>
            <View style={styles.ticket_card_desc_column}>
              <Text style={styles.ticket_card_desc_column_title}>Date</Text>
              <Text style={styles.ticket_card_desc_column_title}>Time</Text>
            </View>
            <View style={styles.ticket_card_desc_column}>
              <Text style={styles.ticket_card_desc_column_title_value}>
                07 Jul
              </Text>
              <Text style={styles.ticket_card_desc_column_title_value}>
                2:00pm
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
                3 pcs
              </Text>
              <Text style={styles.ticket_card_desc_column_title_value}>
                C4, C5, C6
              </Text>
            </View>
          </View>
          <View style={styles.ticket_card_desc_row_total}>
            <Text style={styles.ticket_card_desc_row_total_title}>Total</Text>
            <Text style={styles.ticket_card_desc_row_total_value}>$30.00</Text>
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
    width: '50%',
  },
  ticket_card_desc_column_title_value: {
    color: '#14142B',
    fontWeight: '600',
    fontSize: 14,
    marginTop: 5,
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
