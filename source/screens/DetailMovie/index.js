import React, {useState} from 'react';
import {Header, Footer} from '../../components';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Button,
  TextInput,
  TouchableHighlight,
} from 'react-native';

import DatePicker from 'react-native-date-picker';
// import Icon from 'react-native-vector-icons/FontAwesome5';

export default function DetailMovie({value, navigation}) {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  // console.log('data =>', value);

  return (
    <ScrollView contentContainerStyle={styles.homeDetail_Container}>
      <Header navigation={navigation} />
      <View style={styles.homeDetailRows}>
        <View style={styles.homeDetailImage_row}>
          <Image
            style={styles.homeDetail_ImageMovie}
            source={require('../../assets/images/movies1.png')}
          />
        </View>
        <View style={styles.homeDetail_contentText}>
          <Text style={styles.homeDetail_TextMovie}>
            Spider-Man: Homecoming
          </Text>
          <Text style={styles.homeDetail_CategoryMovie}>
            Adventure, Action, Sci-Fi
          </Text>
        </View>

        <View style={styles.homeDetail_Description}>
          <View style={styles.homeDetail_Description_column}>
            <Text style={styles.homeDetail_Description_column_label}>
              Release date
            </Text>
            <Text style={styles.homeDetail_Description_desc_title}>
              June 28, 2021
            </Text>
          </View>
          <View style={styles.homeDetail_Description_column}>
            <Text style={styles.homeDetail_Description_column_label}>
              Directed by
            </Text>
            <Text style={styles.homeDetail_Description_desc_title}>
              Jon Watss
            </Text>
          </View>
          <View style={styles.homeDetail_Description_column}>
            <Text style={styles.homeDetail_Description_column_label}>
              Duration
            </Text>
            <Text style={styles.homeDetail_Description_desc_title}>
              2 hrs 13 min
            </Text>
          </View>
          <View style={styles.homeDetail_Description_column}>
            <Text style={styles.homeDetail_Description_column_label}>
              Casts
            </Text>
            <Text
              style={styles.homeDetail_Description_desc_title_Casts}
              numberOfLines={1}
              ellipsizeMode="tail">
              Tom Holland, Robert Downey Jr., etc.
            </Text>
          </View>
        </View>

        <View style={styles.homeDetail_Line}></View>

        <View style={styles.homeDetail_SynopsisContainer}>
          <Text style={styles.homeDetail_Synopsis_title}>Synopsis</Text>
          <Text style={styles.homeDetail_Synopsis_desc}>
            Thrilled by his experience with the Avengers, Peter returns home,
            where he lives with his Aunt May, under the watchful eye of his new
            mentor Tony Stark, Peter tries to fall back into his normal daily
            routine - distracted by thoughts of proving himself to be more than
            just your friendly neighborhood Spider-Man - but when the Vulture
            emerges as a new villain, everything that Peter holds most important
            will be threatened.
          </Text>
        </View>

        {/* SCHEDULES */}
        <View style={styles.scheduleDetail_Container}>
          {/* <Text style={styles.scheduleDetail_title}>Showtimes and Tickets</Text>
          <View style={styles.scheduleDetail_filterOptions}></View> */}
          {/* <Icon name="calendar-week" color="#4E4B66" size={20} /> */}
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <DatePicker
              modal
              open={open}
              date={date}
              fadeToColor="#FFFFFF"
              textColor="#FFFFFF"
              onConfirm={date => {
                setOpen(false);
                setDate(date);
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
            <TouchableHighlight
              style={styles.scheduleDetail_card_button_date}
              onPress={() => setOpen(true)}
              underlayColor="none">
              <Text style={styles.scheduleDetail_card_button_date_title}>
                Set a Date
              </Text>
            </TouchableHighlight>
          </View>

          <View style={styles.scheduleDetail_rows}>
            <View style={styles.scheduleDetail_card}>
              <View style={styles.scheduleDetail_card_container}>
                <Image
                  source={require('../../assets/images/Sponsor1.png')}
                  style={styles.scheduleDetil_card_image}
                />
                <Text style={styles.scheduleDetail_card_address}>
                  Whatever street No.12, South Purwokerto
                </Text>
                <View
                  style={{
                    backgroundColor: '#DEDEDE',
                    height: 1,
                    width: '100%',
                    marginTop: 23,
                  }}></View>
              </View>

              <View style={styles.scheduleDetail_card_time}>
                <Text style={styles.scheduleDetail_card_time_title}>
                  08:30am
                </Text>
                <Text style={styles.scheduleDetail_card_time_title_close}>
                  08:30am
                </Text>
                <Text style={styles.scheduleDetail_card_time_title}>
                  08:30am
                </Text>
                <Text style={styles.scheduleDetail_card_time_title_close}>
                  08:30am
                </Text>
                <Text style={styles.scheduleDetail_card_time_title}>
                  08:30am
                </Text>
                <Text style={styles.scheduleDetail_card_time_title_close}>
                  08:30am
                </Text>
              </View>
              <View style={styles.scheduleDetail_card_time_desc}>
                <Text style={styles.sheduleDetail_card_time_desc_title}>
                  Price
                </Text>
                <Text style={styles.scheduleDetail_card_time_desc_title_value}>
                  $10.00/seat
                </Text>
              </View>

              <TouchableHighlight
                underlayColor="none"
                style={styles.scheduleDetail_card_button}
                onPress={() => navigation.navigate('Seat')}>
                <Text style={styles.scheduleDetail_card_button_title}>
                  Book Now
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
        {/* END SCHEDULES */}

        {/* PAGINATION */}
        <View style={styles.schedulePagination_container}>
          <View style={styles.schedulePagination_Active}>
            <Text style={styles.schedulePagination_title_active}>1</Text>
          </View>
          <View style={styles.schedulePagination_Default}>
            <Text style={styles.schedulePagination_title_Default}>2</Text>
          </View>
        </View>
        {/* END PAGINATION */}
      </View>
      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  homeDetail_Container: {
    flexGrow: 1,
    alignContent: 'center',
    backgroundColor: '#ffffff',
  },
  homeDetailRows: {
    marginHorizontal: 24,
  },
  homeDetailImage_row: {
    borderRadius: 24,
    backgroundColor: '#ffffff',
    padding: 32,
    marginHorizontal: 55,
    marginTop: 37,
    elevation: 8,
    width: '70%',
  },
  homeDetail_ImageMovie: {
    width: 159,
    height: 244,
  },
  homeDetail_contentText: {
    alignItems: 'center',
  },
  homeDetail_TextMovie: {
    marginTop: 32,
    fontWeight: '600',
    color: '#000000',
    fontSize: 20,
  },
  homeDetail_CategoryMovie: {
    color: '#4E4B66',
    fontSize: 16,
    fontWeight: '400',
    marginTop: 8,
  },
  homeDetail_Description: {
    marginTop: 32,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  homeDetail_Description_column: {
    marginHorizontal: 21,
  },
  homeDetail_Description_column_label: {
    color: '#8692A6',
    textAlign: 'left',
    fontSize: 13,
  },
  homeDetail_Description_desc_title: {
    color: '#121212',
    fontSize: 16,
    marginTop: 7,
    marginBottom: 20,
  },
  homeDetail_Description_desc_title_Casts: {
    color: '#121212',
    fontSize: 16,
    width: 80,
    marginTop: 7,
    marginBottom: 20,
  },
  homeDetail_Line: {
    backgroundColor: '#D6D8E7',
    height: 1,
    marginTop: 40,
  },
  homeDetail_SynopsisContainer: {
    marginTop: 24,
  },
  homeDetail_Synopsis_title: {
    color: '#14142B',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  homeDetail_Synopsis_desc: {
    color: '#4E4B66',
    textAlign: 'justify',
    letterSpacing: 0.75,
    lineHeight: 22,
  },

  // SCHEDULE AREA
  scheduleDetail_Container: {
    marginTop: 96,
    marginBottom: 48,
  },
  scheduleDetail_title: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  scheduleDetil_card_image: {
    resizeMode: 'contain',
    width: 77,
    height: 29,
  },
  scheduleDetail_card_button_date: {
    backgroundColor: '#EFF0F6',
    borderRadius: 16,
    width: '70%',
    paddingVertical: 11,
  },
  scheduleDetail_card_button_date_title: {
    color: '#4E4B66',
    marginHorizontal: 58,
    fontSize: 14,
    fontWeight: '600',
  },
  scheduleDetail_rows: {
    marginTop: 48,
  },
  scheduleDetail_card_container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scheduleDetail_card: {
    backgroundColor: '#FFFFFF',
    elevation: 8,
    borderRadius: 16,
    paddingVertical: 40,
    paddingHorizontal: 32,
  },
  scheduleDetail_card_address: {
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 22,
    color: '#AAAAAA',
    fontSize: 13,
    fontWeight: '300',
    letterSpacing: 0.75,
  },
  scheduleDetail_card_time: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  scheduleDetail_card_time_title: {
    color: '#4E4B66',
    fontSize: 12,
    marginTop: 8,
    marginHorizontal: 16,
  },
  scheduleDetail_card_time_title_close: {
    color: '#A0A3BD',
    fontSize: 12,
    marginTop: 8,
    marginHorizontal: 16,
  },
  scheduleDetail_card_time_desc: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    marginHorizontal: 16,
  },
  sheduleDetail_card_time_desc_title: {
    color: '#6B6B6B',
    fontSize: 14,
    fontWeight: '400',
  },
  scheduleDetail_card_time_desc_title_value: {
    fontWeight: '600',
    fontSize: 14,
    color: '#000000',
  },
  scheduleDetail_card_button: {
    backgroundColor: '#5F2EEA',
    borderRadius: 4,
    elevation: 4,
    marginTop: 16,
    paddingVertical: 11,
  },
  scheduleDetail_card_button_title: {
    textAlign: 'center',
    color: '#F7F7FC',
    fontWeight: 'bold',
    fontSize: 14,
  },
  schedulePagination_container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  schedulePagination_Active: {
    backgroundColor: '#5F2EEA',
    borderRadius: 8,
    elevation: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: '14%',
    height: '100%',
  },
  schedulePagination_Default: {
    backgroundColor: '#FFFFFF',
    borderWidth: 0.75,
    borderColor: '#DEDEDE',
    borderRadius: 8,
    elevation: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: '14%',
    height: '100%',
    marginHorizontal: 8,
  },
  schedulePagination_title_Default: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '400',
    color: '#4E4B66',
  },
  schedulePagination_title_active: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '400',
    color: '#FFFFFF',
  },
});
