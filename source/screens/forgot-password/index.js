import React from 'react';
import {Input, Button} from '../../components';
import {View, Text, StyleSheet, Image} from 'react-native';

export default function ForgotPassword() {
  return (
    <View style={styles.auth_signupContainer}>
      <Image
        source={require('../../assets/images/tickitz.png')}
        style={styles.auth_signupImage}
      />
      <Text style={styles.auth_forgotPasswordTitle}>Forgot password</Text>
      <Text style={styles.auth_forgotPasswordDesc}>
        we'll send a link to your email shortly
      </Text>

      <Input
        childrenType="email-address"
        childrenText="Email"
        childrenPlaceHolder="Write your email"
        childrenOnChange={() => null}
      />

      <Button childrenOnPress={() => null}>
        <Text style={styles.authButtonTitle}>Activate now</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  auth_signupContainer: {
    paddingTop: 55,
    paddingBottom: 55,
    paddingLeft: 24,
    paddingRight: 24,
  },
  auth_signupImage: {
    width: 100,
    height: 30,
  },
  auth_forgotPasswordTitle: {
    marginTop: 45,
    fontWeight: '600',
    fontSize: 26,
    color: '#000000',
  },
  auth_forgotPasswordDesc: {
    marginTop: 10,
    color: '#8692A6',
    fontSize: 15,
  },
  authButtonTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Mulish-Bold',
    fontSize: 16,
    color: '#F7F7FC',
  },
});
