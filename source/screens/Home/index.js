import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  Image,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  FlatList,
  Pressable,
  Modal,
} from 'react-native';

import {Header, Card, Footer, UpCommingMovie} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {getAllMovie} from '../../stores/action/movie';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from '../../utils/axios';

export default function Home({navigation}) {
  const [limit] = useState(5);
  const movie = useSelector(state => state.movie);
  const [showModalViewAll, setShowModalViewAll] = useState(false);
  const [search, setSearch] = useState('');

  const [selectHoverMovie, setSelectHoverMovie] = useState('');
  const [movies, setMovies] = useState(movie.movies);
  const disptach = useDispatch();

  const getAllDataMovie = async () => {
    try {
      const response = await disptach(getAllMovie(limit));
      setMovies(response.value.data.data);
    } catch (error) {
      new Error(error.response);
    }
  };

  const showDescriptionMovie = id => {
    setSelectHoverMovie(id);
  };

  const goToDetailMovie = async value => {
    await AsyncStorage.setItem('nameMovie', value.title);
    return navigation.navigate('Detail', {
      id: value.id,
    });
  };

  const searchAllMovie = async () => {
    try {
      const response = await axios.get(`movie?searchName=${search}`);
      setMovies(response.data.data);
    } catch (error) {
      setMovies([]);
    }
  };

  useEffect(() => {
    getAllDataMovie();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.homeMain_container}>
      <Header navigation={navigation} />
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
            <Text
              style={styles.homeRows_listmovie_column_ShowAll}
              onPress={() => setShowModalViewAll(true)}>
              view all
            </Text>
          </View>

          <Modal
            animationType="slide"
            transparent={false}
            visible={showModalViewAll}
            onRequestClose={() => {
              setShowModalViewAll(!showModalViewAll);
            }}>
            <View style={styles.homeRows_modalMain}>
              <View style={styles.homeRows_modalMainHeader}>
                <Text style={styles.homeRows_modalMainText}>
                  List All Movie
                </Text>
                <Icon
                  name="close"
                  size={20}
                  color="#4E4B66"
                  style={{textAlign: 'right'}}
                  onPress={() => setShowModalViewAll(!showModalViewAll)}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <TextInput
                  style={styles.modalInputSearch}
                  placeholder="Find your movie"
                  placeholderTextColor="#A0A3BD"
                  onChangeText={searchText => setSearch(searchText)}
                />
                <Pressable
                  onPress={searchAllMovie}
                  style={{
                    backgroundColor: '#1CC8EE',
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 16,
                    borderBottomRightRadius: 16,
                    borderBottomLeftRadius: 0,
                    padding: 14,
                    marginTop: 20,
                  }}>
                  <Icon name="search" size={20} color="#FFFFFF" />
                </Pressable>
              </View>
              <ScrollView
                contentContainerStyle={
                  styles.homeRows_listmovie_column_card_modal
                }>
                {movies.length > 0 ? (
                  movies.map(value => (
                    <View
                      index={value.id}
                      key={value.id}
                      style={styles.homeRows_modalCard}>
                      <TouchableHighlight
                        underlayColor="none"
                        onPress={() => showDescriptionMovie(value.id)}>
                        <View
                          style={{
                            height: selectHoverMovie === value.id ? 320 : 220,
                          }}>
                          <Image
                            source={{
                              uri: `https://backend-rino.fwebdev2.xyz/uploads/movie/${value.image}`,
                            }}
                            style={styles.homeRows_listmovie_card_image}
                          />
                          {selectHoverMovie === value.id && (
                            <View
                              style={{
                                flexDirection: 'column',
                              }}>
                              <Text
                                style={
                                  styles.homeRows_listMovie_card_hover_title_movie
                                }
                                numberOfLines={1}
                                ellipsizeMode="tail">
                                {value.title}
                              </Text>
                              <Text
                                style={
                                  styles.homeRows_listMovie_card_hover_title_category
                                }>
                                {value.category}
                              </Text>
                              <TouchableHighlight
                                underlayColor="none"
                                style={{
                                  borderColor: '#5F2EEA',
                                  borderWidth: 0.5,
                                  borderStyle: 'solid',
                                  paddingVertical: 5,
                                  paddingHorizontal: 40,
                                  marginTop: 33,
                                  borderRadius: 4,
                                }}
                                onPress={() => goToDetailMovie(value)}>
                                <Text
                                  style={{
                                    color: '#5F2EEA',
                                    fontWeight: '300',
                                    fontSize: 10,
                                  }}>
                                  Details
                                </Text>
                              </TouchableHighlight>
                            </View>
                          )}
                        </View>
                      </TouchableHighlight>
                    </View>
                  ))
                ) : (
                  <View>
                    <Text
                      style={{
                        fontSize: 20,
                        color: '#ED2E7E',
                        fontWeight: 'bold',
                        marginTop: 10,
                      }}>
                      Movie not found
                    </Text>
                  </View>
                )}
              </ScrollView>
            </View>
          </Modal>

          <FlatList
            horizontal
            contentContainerStyle={styles.homeRows_listmovie_column_card}
            data={movies}
            renderItem={({item: value}) => (
              <Card index={value.id} key={value.id}>
                <TouchableHighlight
                  underlayColor="none"
                  onPress={() => showDescriptionMovie(value.id)}>
                  <View
                    style={{height: selectHoverMovie === value.id ? 320 : 220}}>
                    <Image
                      source={{
                        uri: `https://backend-rino.fwebdev2.xyz/uploads/movie/${value.image}`,
                      }}
                      style={styles.homeRows_listmovie_card_image}
                    />
                    {selectHoverMovie === value.id && (
                      <View
                        style={{
                          flexDirection: 'column',
                        }}>
                        <Text
                          style={
                            styles.homeRows_listMovie_card_hover_title_movie
                          }
                          numberOfLines={1}
                          ellipsizeMode="tail">
                          {value.title}
                        </Text>
                        <Text
                          style={
                            styles.homeRows_listMovie_card_hover_title_category
                          }>
                          {value.category}
                        </Text>
                        <TouchableHighlight
                          underlayColor="none"
                          style={{
                            borderColor: '#5F2EEA',
                            borderWidth: 0.5,
                            borderStyle: 'solid',
                            paddingVertical: 5,
                            paddingHorizontal: 40,
                            marginTop: 33,
                            borderRadius: 4,
                          }}
                          onPress={() => goToDetailMovie(value)}>
                          <Text
                            style={{
                              color: '#5F2EEA',
                              fontWeight: '300',
                              fontSize: 10,
                            }}>
                            Details
                          </Text>
                        </TouchableHighlight>
                      </View>
                    )}
                  </View>
                </TouchableHighlight>
              </Card>
            )}
          />
        </View>

        {/* UpComming Movie */}
        <UpCommingMovie navigation={navigation} />
        {/* End UpComming Movie */}

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
            By joining you as a Paytix member, we will always send you the
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
  homeRows_listmovie_column_card_modal: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  homeRows_listmovie_card_image: {
    resizeMode: 'contain',
    borderRadius: 24,
    width: 122,
    height: 205,
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
  homeRows_listMovie_card_hover_title_movie: {
    color: '#14142B',
    fontSize: 14,
    width: 120,
    textAlign: 'center',
    marginTop: 12,
    fontWeight: '600',
  },
  homeRows_listMovie_card_hover_title_category: {
    color: '#A0A3BD',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 4,
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
  homeRows_modalMain: {
    flex: 1,
    backgroundColor: '#FCFCFC',
    paddingVertical: 24,
    paddingHorizontal: 24,
  },
  homeRows_modalMainHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  homeRows_modalMainText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#14142B',
  },
  homeRows_modalCard: {
    borderRadius: 16,
    backgroundColor: '#ffffff',
    borderWidth: 0.5,
    borderStyle: 'solid',
    padding: 11,
    marginHorizontal: 5,
    marginVertical: 29,
    borderColor: '#DEDEDE',
  },
  modalInputSearch: {
    color: '#6E7191',
    marginTop: 20,
    width: '88%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 16,
    borderColor: '#DEDEDE',
    borderWidth: 1,
    borderStyle: 'solid',
    paddingHorizontal: 18,
  },
});
