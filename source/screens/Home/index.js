import React, {useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  Image,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  FlatList,
} from 'react-native';
import {Header, Card, Footer} from '../../components';

export default function Home({navigation}) {
  const dummyData = [
    {
      id: 1,
      title: 'Spiderman HomeComing',
      category: 'Action, Adventure, Sci-Fi',
      image: require('../../assets/images/movies1.png'),
    },
    {
      id: 2,
      title: 'Lion King',
      category: 'Action',
      image: require('../../assets/images/movies2.png'),
    },
    {
      id: 3,
      title: 'Black Widow',
      category: 'Romance',
      image: require('../../assets/images/movies3.png'),
    },
    {
      id: 4,
      title: 'Upin & Ipin The Movie',
      category: 'Adventure',
      image: require('../../assets/images/movies4.png'),
    },
  ];

  const dateDummy = [
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

  // const [isComming] = useState('');
  // const renderCardsMovie = ({value}) => <CardMovies title={value.title} />;

  return (
    <ScrollView contentContainerStyle={styles.homeMain_container}>
      <Header />
      <View style={styles.homeMain_rowParent}>
        <Text style={styles.homeMain_HeadingDesc}>
          Nearest Cinema, Newest Movie,
        </Text>
        <Text style={styles.homeMain_HeadingBanner}>Find out now!</Text>
        <Image
          source={require('../../assets/images/Banner-Hero.png')}
          style={styles.home_bannerHero}
        />

        <View style={styles.homeRows_listmovie}>
          <View style={styles.homeRows_listmovie_column}>
            <Text style={styles.homeRows_listmovie_column_title}>
              Now Showing
            </Text>
            <Text style={styles.homeRows_listmovie_column_ShowAll}>
              view all
            </Text>
          </View>
          <ScrollView
            horizontal
            contentContainerStyle={styles.homeRows_listmovie_column_card}>
            {dummyData.map((value, idx) => (
              <Card index={idx} key={idx}>
                <TouchableHighlight
                  underlayColor="none"
                  onPress={() =>
                    navigation.navigate('Detail', {
                      value,
                    })
                  }>
                  <Image
                    source={value.image}
                    style={styles.homeRows_listmovie_card_image}
                  />
                </TouchableHighlight>
              </Card>
            ))}
          </ScrollView>
        </View>

        <View>
          <View style={styles.homeRows_listUpComming_column}>
            <Text style={styles.homeRows_listUpComming_title}>
              Upcoming Movies
            </Text>
            <Text style={styles.homeRows_listUpComming_viewAll}>view all</Text>
          </View>

          <ScrollView
            horizontal
            contentContainerStyle={styles.homeRows_listUpCommingDate}>
            {dateDummy.map((date, idx) => (
              <TouchableHighlight
                key={idx}
                underlayColor="none"
                style={[styles.homeRows_listUpCommingDate_button_visible]}>
                <Text style={styles.homeRows_listUpCommingDate_title}>
                  {date}
                </Text>
              </TouchableHighlight>
            ))}
          </ScrollView>

          <ScrollView
            horizontal
            contentContainerStyle={
              styles.homeRows_listUpCommingDate_column_movies
            }>
            {dummyData
              .map((movie, idx) => (
                <Card index={idx} key={idx}>
                  <View
                    style={
                      styles.homeRows_listUpCommingDate_column_movies_cardBody
                    }>
                    <Image
                      style={styles.homeRows_listmovie_card_image}
                      source={movie.image}
                    />
                    <Text
                      style={styles.homeRows_listMovie_card_upcomming_title}>
                      {movie.title}
                    </Text>
                    <Text
                      style={styles.homeRows_listMovie_card_upcomming_category}>
                      {movie.category}
                    </Text>
                    <TouchableHighlight
                      underlayColor="none"
                      style={styles.homeRows_listUpCommingDate_movie_detail}
                      onPress={() => navigation.navigate('Detail')}>
                      <Text
                        style={
                          styles.homeRows_listUpCommingDate_title_movie_detail
                        }>
                        Details
                      </Text>
                    </TouchableHighlight>
                  </View>
                </Card>
              ))
              .reverse()}
          </ScrollView>
        </View>

        <View style={styles.homeRows_SubscribeMain}>
          <Text style={styles.homeRows_Subscribe_title}>
            Be the vanguard of the
          </Text>
          <Text style={styles.homeRows_Subscribe_title_active}>Moviegoers</Text>

          <TextInput
            keyboardType="default"
            placeholder="Type your email"
            placeholderTextColor="#A0A3BD"
            style={styles.homeRows_Subscribe_input}
          />
          <TouchableHighlight style={styles.Subscribe_Button}>
            <Text style={styles.Subscribe_Button_title}>Join Now</Text>
          </TouchableHighlight>

          <Text style={styles.Subscribe_Desc}>
            By joining you as a Tickitz member, we will always send you the
            latest updates via email .
          </Text>
        </View>
      </View>
      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  homeMain_container: {
    backgroundColor: '#FFFFFF',
    flexGrow: 1,
  },
  homeMain_rowParent: {
    position: 'relative',
    marginVertical: 33,
    marginHorizontal: 24,
  },

  home_bannerHero: {
    width: 325,
    height: 325,
  },
  homeMain_HeadingDesc: {
    color: '#A0A3BD',
    fontSize: 14,
    marginBottom: 10,
  },
  homeMain_HeadingBanner: {
    fontSize: 38,
    color: '#5F2EEA',
    fontWeight: 'bold',
    fontFamily: 'Mulish-Bold',
    marginBottom: 64,
  },
  homeRows_listmovie: {
    // backgroundColor: '#D6D8E7',
  },
  homeRows_listmovie_column: {
    marginTop: 215,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  homeRows_listmovie_column_title: {
    fontSize: 18,
    fontWeight: '500',
    color: '#14142B',
  },
  homeRows_listmovie_column_ShowAll: {
    color: '#5F2EEA',
    fontWeight: '600',
    fontSize: 14,
  },
  homeRows_listmovie_column_card: {
    flexDirection: 'row',
  },
  homeRows_listmovie_card_image: {
    width: 122,
    height: 185,
  },

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
  homeRows_SubscribeMain: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    elevation: 16,
    borderRadius: 8,
    marginTop: 70,
  },
  homeRows_Subscribe_title: {
    fontSize: 14,
    color: '#4E4B66',
    fontWeight: '400',
    marginTop: 48,
  },
  homeRows_Subscribe_title_active: {
    fontSize: 32,
    color: '#5F2EEA',
    fontWeight: '600',
  },
  homeRows_Subscribe_input: {
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#DEDEDE',
    width: '85%',
    marginTop: 42,
    marginHorizontal: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  Subscribe_Button: {
    backgroundColor: '#5F2EEA',
    paddingVertical: 10,
    paddingHorizontal: 100,
    marginTop: 16,
    borderRadius: 12,
  },
  Subscribe_Button_title: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
  Subscribe_Desc: {
    color: '#6E7191',
    fontSize: 12,
    textAlign: 'center',
    width: '60%',
    marginTop: 32,
    lineHeight: 22,
    marginBottom: 48,
  },
});
