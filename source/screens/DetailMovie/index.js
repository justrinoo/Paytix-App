import React, {useEffect, useState} from 'react';
import {Header, Footer} from '../../components';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableHighlight,
  ActivityIndicator,
  ToastAndroid,
  FlatList,
} from 'react-native';

import DatePicker from 'react-native-date-picker';
import {Picker} from '@react-native-picker/picker';
import {getMovieById} from '../../stores/action/movie';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from '../../utils/axios';
import {getAllSchedule} from '../../stores/action/schedule';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import Icon from 'react-native-vector-icons/FontAwesome5';

export default function DetailMovie({navigation, value, route}) {
  const state = useSelector(state => state.schedule);
  // SCHEDULE
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(2);
  const [totalPage, setTotalPage] = useState(1);
  const [schedules, setSchedules] = useState(state.schedules);
  const [selectedActiveTime, setSelectedActiveTime] = useState('');
  const [ActivePagePagination, setActivePagePagination] = useState(1);

  const dispatch = useDispatch();
  // const movieState = useSelector(state => state.movie);
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState({});
  const [provinces, setProvinces] = useState([]);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const {id} = route.params;
  const [selectedLocation, setSelectedLocation] = useState('');

  const getMovieId = async () => {
    try {
      setLoading(true);
      const response = await dispatch(getMovieById(id));
      setLoading(false);
      setMovie(response.value.data.data[0]);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovieId();
    getLocationProvince();
    getListAllSchedule();
  }, [id, page, limit]);

  const chooseDateNow = dateNow => {
    const tanggalSekarang = new Date(Date.now()).toISOString().split('T')[0];
    const userChooseDate = new Date(dateNow).toISOString().split('T')[0];
    if (userChooseDate >= tanggalSekarang) {
      setDate(dateNow);
    } else {
      showToast("Can't choose yesterday's date");
    }
  };

  const getLocationProvince = async () => {
    try {
      const response = await axios.get(
        'http://www.emsifa.com/api-wilayah-indonesia/api/provinces.json',
      );
      setProvinces(response.data);
    } catch (error) {
      setProvinces([]);
    }
  };

  const getListAllSchedule = async () => {
    try {
      const response = await dispatch(getAllSchedule(page, limit, id));
      setTotalPage(response.value.data.pagination.totalPage);
      setSchedules(response.value.data.data);
    } catch (error) {
      setSchedules([]);
    }
  };

  const findScheduleByLocation = async location => {
    try {
      const response = await axios.get(
        `schedule?searchMovieId=${id}&searchLocation=${location}&page=${page}&limit=${limit}`,
      );
      setTotalPage(response.data.pagination.totalPage);
      setSchedules(response.data.data);
    } catch (error) {
      setSchedules([]);
      console.log(error.response);
    }
  };

  const clickSelectedTime = (time, item) => {
    setSelectedActiveTime(time);
    setSchedules([item]);
    setTotalPage(1);
  };

  const changeHandlerPagination = async num => {
    const selectedPage = num;
    console.log('select page =>', selectedPage);
    setPage(selectedPage);
    getListAllSchedule();
    setActivePagePagination(num);
  };

  const BookMovieNow = (...rest) => {
    if (selectedActiveTime === '') {
      showToast('Please choose your time!');
    } else {
      navigation.navigate('Seat', {
        detailOrder: rest,
      });
    }
  };

  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.LONG);
  };

  let newtTotalPage = [];
  for (let i = 1; i <= totalPage; i++) {
    newtTotalPage.push(i);
  }
  return (
    <ScrollView contentContainerStyle={styles.homeDetail_Container}>
      <Header navigation={navigation} />
      <View style={styles.homeDetailRows}>
        {!loading ? (
          <View>
            <View style={styles.homeDetailImage_row}>
              <Image
                style={styles.homeDetail_ImageMovie}
                source={{
                  uri: `https://backend-rino.fwebdev2.xyz/uploads/movie/${movie.image}`,
                }}
              />
            </View>
            <View style={styles.homeDetail_contentText}>
              <Text style={styles.homeDetail_TextMovie}>{movie.title}</Text>
              <Text style={styles.homeDetail_CategoryMovie}>
                {movie.category}
              </Text>
            </View>
            <View style={styles.homeDetail_Description}>
              <View style={styles.homeDetail_Description_column}>
                <Text style={styles.homeDetail_Description_column_label}>
                  Release date
                </Text>
                <Text style={styles.homeDetail_Description_desc_title}>
                  {new Date(movie.releaseDate).toDateString()}
                </Text>
              </View>
              <View style={styles.homeDetail_Description_column}>
                <Text style={styles.homeDetail_Description_column_label}>
                  Directed by
                </Text>
                <Text style={styles.homeDetail_Description_desc_title}>
                  {movie.directedBy}
                </Text>
              </View>
              <View style={styles.homeDetail_Description_column}>
                <Text style={styles.homeDetail_Description_column_label}>
                  Duration
                </Text>
                <Text style={styles.homeDetail_Description_desc_title}>
                  {movie.durationHour} hrs {movie.durationMinute} min
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
                  {movie.casts}
                </Text>
              </View>
            </View>
            <View style={styles.homeDetail_Line}></View>
            <View style={styles.homeDetail_SynopsisContainer}>
              <Text style={styles.homeDetail_Synopsis_title}>Synopsis</Text>
              <Text style={styles.homeDetail_Synopsis_desc}>
                {movie.synopsis}
              </Text>
            </View>
          </View>
        ) : (
          <View>
            <Text
              style={{color: '#000000', textAlign: 'center', marginBottom: 5}}>
              Please Wait...
            </Text>
            <ActivityIndicator size="large" />
          </View>
        )}

        {/* SCHEDULES */}
        <View style={styles.scheduleDetail_Container}>
          <Text style={styles.scheduleDetail_title}>Showtimes and Tickets</Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <DatePicker
              modal
              open={open}
              date={date}
              fadeToColor="#FFFFFF"
              textColor="#FFFFFF"
              onConfirm={date => {
                setOpen(false);
                chooseDateNow(date);
                // setDate(date);
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
            <TouchableHighlight
              style={styles.scheduleDetail_card_button_date}
              onPress={() => setOpen(true)}
              underlayColor="none">
              <View>
                <View>
                  <Icon
                    name="calendar-week"
                    color="#4E4B66"
                    style={{position: 'absolute', left: 18}}
                    size={20}
                  />
                </View>
                <Text style={styles.scheduleDetail_card_button_date_title}>
                  {date ? (
                    new Date(date).toISOString().split('T')[0]
                  ) : (
                    <Text>Set a Date</Text>
                  )}
                </Text>
              </View>
            </TouchableHighlight>
          </View>
          <View
            style={{
              marginTop: 12,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                backgroundColor: '#EFF0F6',
                width: '70%',
                borderRadius: 16,
              }}>
              <View>
                <Icon
                  name="map-marker-alt"
                  color="#4E4B66"
                  style={{position: 'absolute', left: 18, top: 16}}
                  size={18}
                />
              </View>
              <Picker
                dropdownIconColor="#4E4B66"
                selectedValue={selectedLocation}
                onValueChange={value => {
                  setSelectedLocation(value);
                  findScheduleByLocation(value);
                }}
                style={{color: '#4E4B66', marginLeft: 46}}
                mode="dialog">
                <Picker.Item label="Set a city" enabled={false} />
                {provinces.map(province => (
                  <Picker.Item
                    label={province.name.toLowerCase()}
                    value={province.name.toLowerCase()}
                    key={province.id}
                  />
                ))}
              </Picker>
            </View>
          </View>
          <View>
            {schedules.length > 0 ? (
              schedules.map((item, idx) => (
                <View style={styles.scheduleDetail_card} key={idx}>
                  <View style={{flexDirection: 'column', alignItems: 'center'}}>
                    <Image
                      source={
                        item.premiere === 'Ebv.id'
                          ? require('../../assets/images/Sponsor2.png')
                          : item.premiere === 'Hiflix'
                          ? require('../../assets/images/Sponsor1.png')
                          : item.premiere === 'CineOne21'
                          ? require('../../assets/images/Sponsor3.png')
                          : null
                      }
                      style={styles.scheduleDetil_card_image}
                    />
                    <Text style={styles.scheduleDetail_card_address}>
                      {item.location}
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
                    {item.time.map((time, idx) => {
                      return (
                        <View key={idx}>
                          <Text
                            style={
                              selectedActiveTime === time
                                ? styles.schedule_card_time_title_active
                                : styles.scheduleDetail_card_time_title
                            }
                            onPress={() => clickSelectedTime(time, item)}>
                            {time}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                  <View style={styles.scheduleDetail_card_time_desc}>
                    <Text style={styles.sheduleDetail_card_time_desc_title}>
                      Price
                    </Text>
                    <Text
                      style={styles.scheduleDetail_card_time_desc_title_value}>
                      ${item.price},00/seat
                    </Text>
                  </View>

                  <TouchableHighlight
                    underlayColor="none"
                    style={styles.scheduleDetail_card_button}
                    onPress={async () =>
                      BookMovieNow({
                        movieId: movie.id,
                        scheduleId: item.id_schedule,
                        premiere: item.premiere,
                        nameMovie: await AsyncStorage.getItem('nameMovie'),
                        date: new Date(date).toDateString(),
                        dateBooking: new Date(date).toISOString().split('T')[0],
                        time: selectedActiveTime,
                      })
                    }>
                    <Text style={styles.scheduleDetail_card_button_title}>
                      Book Now
                    </Text>
                  </TouchableHighlight>
                </View>
              ))
            ) : (
              <View style={styles.ScheduleDetail_card_containerNotFound}>
                <Text style={styles.ScheduleDetail_card_textNotFound}>
                  Schedule not available
                </Text>
              </View>
            )}
          </View>
        </View>
        {/* END SCHEDULES */}

        {/* PAGINATION */}
        <View style={styles.schedulePagination_container}>
          {schedules.length > 0
            ? newtTotalPage.map(num => (
                <TouchableHighlight
                  style={
                    ActivePagePagination === num
                      ? styles.schedulePagination_Active
                      : styles.schedulePagination_Default
                  }
                  underlayColor="none"
                  onPress={() => changeHandlerPagination(num)}>
                  <Text
                    style={
                      ActivePagePagination === num
                        ? styles.schedulePagination_title_active
                        : styles.schedulePagination_title_Default
                    }>
                    {num}
                  </Text>
                </TouchableHighlight>
              ))
            : null}
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
    borderRadius: 24,
    resizeMode: 'contain',
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
    textAlign: 'center',
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  scheduleDetil_card_image: {
    resizeMode: 'contain',
    marginBottom: 5,
    width: 100,
    height: 39,
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
    marginTop: 2,
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
    marginTop: 32,
    marginHorizontal: 8,
    marginVertical: 10,
    borderRadius: 16,
    paddingVertical: 40,
    paddingHorizontal: 22,
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
    justifyContent: 'flex-start',
    marginTop: 12,
  },
  scheduleDetail_card_time_title: {
    color: '#4E4B66',
    fontSize: 12,
    marginTop: 17,
    marginHorizontal: 16,
  },
  schedule_card_time_title_active: {
    color: '#FFFFFF',
    padding: 3,
    borderRadius: 8,
    fontWeight: '600',
    backgroundColor: '#5F2EEA',
    fontSize: 12,
    marginTop: 17,
    marginHorizontal: 10,
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
    marginHorizontal: 5,
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
  ScheduleDetail_card_textNotFound: {
    marginTop: 20,
    fontSize: 24,
    color: '#F4B740',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
