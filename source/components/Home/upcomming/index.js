import React, {useEffect, useState} from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  Image,
  TouchableHighlight,
  ScrollView,
  StyleSheet,
  FlatList,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import axios from '../../../utils/axios';
import {Card} from '../../../components';

export default function UpCommingMovie({navigation}) {
  const [filterDate, setFilterDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [moviesUpcomming, setMoviesUpcomming] = useState([]);
  const [activeDate, setActiveDate] = useState(
    new Date(Date.now()).toLocaleString('default', {month: 'long'}),
  );

  const date = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const getAllDataMovieUpComming = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`movie/upcomming?date=${filterDate}`);
      setLoading(false);
      setMoviesUpcomming(response.data.data);
    } catch (error) {
      setLoading(false);
      setMoviesUpcomming([]);
    }
  };
  const changeDateFilter = date => {
    setFilterDate(date);
    setActiveDate(date);
  };

  useEffect(() => {
    getAllDataMovieUpComming();
  }, [filterDate]);

  return (
    <View>
      <View style={styles.homeRows_listUpComming_column}>
        <Text style={styles.homeRows_listUpComming_title}>Upcoming Movies</Text>
        <Text style={styles.homeRows_listUpComming_viewAll}>view all</Text>
      </View>

      <ScrollView
        horizontal
        contentContainerStyle={styles.homeRows_listUpCommingDate}>
        {date
          .map((date, idx) => (
            <TouchableHighlight
              key={idx}
              underlayColor="none"
              style={
                activeDate === date
                  ? styles.homeRows_listUpCommingDate_button_active
                  : styles.homeRows_listUpCommingDate_button_visible
              }
              onPress={() => changeDateFilter(date)}>
              <Text
                style={
                  activeDate === date
                    ? styles.homeRows_listUpCommingDate_title_active
                    : styles.homeRows_listUpCommingDate_title
                }>
                {date}
              </Text>
            </TouchableHighlight>
          ))
          .reverse()}
      </ScrollView>

      {moviesUpcomming.length > 0 ? (
        loading ? (
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: 18,
            }}>
            <ActivityIndicator size="large" color="#F4B740" />
          </View>
        ) : (
          <FlatList
            horizontal
            contentContainerStyle={
              styles.homeRows_listUpCommingDate_column_movies
            }
            data={moviesUpcomming}
            renderItem={({item}) => (
              <Card index={item.id} key={item.id}>
                <View
                  style={
                    styles.homeRows_listUpCommingDate_column_movies_cardBody
                  }>
                  <Image
                    style={styles.homeRows_listmovie_card_image}
                    source={{
                      uri: `https://paytix.herokuapp.com/uploads/movie/${item.image}`,
                    }}
                  />
                  <Text style={styles.homeRows_listMovie_card_upcomming_title}>
                    {item.title}
                  </Text>
                  <Text
                    style={styles.homeRows_listMovie_card_upcomming_category}>
                    {item.category}
                  </Text>
                  <TouchableHighlight
                    underlayColor="none"
                    style={styles.homeRows_listUpCommingDate_movie_detail}
                    onPress={() =>
                      navigation.navigate('Detail', {id: item.id})
                    }>
                    <Text
                      style={
                        styles.homeRows_listUpCommingDate_title_movie_detail
                      }>
                      Details
                    </Text>
                  </TouchableHighlight>
                </View>
              </Card>
            )}
          />
        )
      ) : (
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Icon name="alert-circle" size={30} color="#F4B740" />
          <Text style={{fontWeight: 'bold', color: '#F4B740', fontSize: 28}}>
            Movie coming soon 🥺
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  homeRows_listUpComming_column: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 135,
  },
  homeRows_listUpComming_title: {
    color: '#14142B',
    fontWeight: 'bold',
    fontSize: 18,
  },
  homeRows_listUpComming_viewAll: {
    color: '#5F2EEA',
    fontWeight: '600',
    fontSize: 14,
  },
  homeRows_listUpCommingDate: {
    marginTop: 24,
    flexDirection: 'row',
  },
  homeRows_listUpCommingDate_title: {
    color: '#5F2EEA',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  homeRows_listUpCommingDate_title_active: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  homeRows_listUpCommingDate_button_active: {
    width: 127,
    marginLeft: 12,
    backgroundColor: '#5F2EEA',
    borderRadius: 8,
    elevation: 7,
    paddingHorizontal: 27,
    paddingVertical: 12,
  },
  homeRows_listUpCommingDate_button_visible: {
    width: 127,
    marginLeft: 12,
    borderColor: '#5F2EEA',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 8,
    elevation: 7,
    paddingHorizontal: 27,
    paddingVertical: 12,
  },
  homeRows_listUpCommingDate_column_movies_cardBody: {
    textAlign: 'center',
    alignItems: 'center',
  },
  homeRows_listUpCommingDate_column_movies: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  homeRows_listMovie_card_upcomming_title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    marginTop: 12,
  },
  homeRows_listMovie_card_upcomming_category: {
    color: '#A0A3BD',
    fontSize: 11,
    fontWeight: '300',
    marginTop: 4,
  },
  homeRows_listUpCommingDate_movie_detail: {
    marginTop: 24,
    borderColor: '#5F2EEA',
    borderWidth: 0.5,
    borderStyle: 'solid',
    borderRadius: 4,
    backgroundColor: '#ffffff',
    paddingVertical: 8,
    paddingHorizontal: 30,
  },
  homeRows_listUpCommingDate_title_movie_detail: {
    color: '#5F2EEA',
    fontWeight: '300',
    fontSize: 10,
    width: 100,
    textAlign: 'center',
  },
  homeRows_listmovie_card_image: {
    resizeMode: 'contain',
    borderRadius: 24,
    width: 122,
    height: 205,
  },
});
