import React, {useEffect} from 'react';
import {View, Image, Text, StyleSheet, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Notification from '../Notification/notif';
export default function SuccessScreen(props) {
  const user = props.route.params.fullName;

  useEffect(() => {
    Notification.verificationEmailAccount(
      `Hello ${user}`,
      "Don't Forget to Activate Your Email! Oke!",
    );
  }, []);
  // const dummyUser = 'rino satya';
  return (
    <View style={styles.successContainer}>
      <Image
        source={require('../../assets/images/sucess-screen.png')}
        style={styles.successImage}
      />
      <Text
        style={{
          fontSize: 28,
          color: '#14142B',
          marginTop: 20,
          fontWeight: '600',
        }}>
        All Right!
      </Text>
      <Text style={styles.successText_verification}>
        Hello{' '}
        <Text style={{fontWeight: '600', fontStyle: 'italic'}}>{user}, </Text>
        thankyou for registration in PayTix and now you required verification
        account your email.
      </Text>
      <TouchableHighlight
        underlayColor="none"
        style={styles.successButton}
        onPress={() => props.navigation.navigate('Login')}>
        <Text style={styles.successButtonText}>
          Continue{' '}
          <Icon name="arrow-forward-outline" color="#14142B" size={18} />
        </Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 28,
  },
  successImage: {
    width: 250,
    height: 200,
    resizeMode: 'contain',
  },
  successText_verification: {
    color: '#4E4B66',
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 25,
  },
  successButton: {
    marginTop: 18,
    backgroundColor: '#FFFFFF',
    elevation: 5,
    padding: 8,
    borderRadius: 8,
  },
  successButtonText: {
    color: '#14142B',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
