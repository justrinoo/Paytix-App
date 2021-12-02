import React from 'react';
import {View, Image, StyleSheet, Text, Touch} from 'react-native';
import {Input, Button} from '../../components';
import Icon from 'react-native-vector-icons/FontAwesome5';
export default function SignUp({navigation}) {
  return (
    <View style={styles.auth_signupContainer}>
      <Image
        source={require('../../assets/images/tickitz.png')}
        style={styles.auth_signupImage}
      />
      <Text style={styles.auth_signInTitle}>Sign In</Text>
      <Input
        childrenType="email-address"
        childrenText="Email"
        childrenPlaceHolder="Write your email"
        childrenOnChange={() => null}
      />
      <Input
        childrenType="visible-password"
        childrenText="Password"
        childrenPlaceHolder="Write your password"
        childrenOnChange={() => null}
      />
      <Button childrenOnPress={() => navigation.navigate('HomeScreen')}>
        <Text style={styles.authButtonTitle}>Sign In</Text>
      </Button>

      <View>
        <Text style={styles.auth_alreadyAccount}>
          Forgot your password?{' '}
          <Text
            style={styles.auth_loggedLink}
            onPress={() => navigation.navigate('ForgotPassword')}>
            Reset now
          </Text>
        </Text>
      </View>

      <View style={styles.authQuestion}>
        <View style={styles.authSpaceQuestion}></View>
        <View>
          <Text style={styles.authQuestionTitle}>Or</Text>
        </View>
        <View style={styles.authSpaceQuestion}></View>
      </View>

      <View style={styles.authThirdPartyContainer}>
        <View style={styles.authThirdPartyColumn}>
          <Icon.Button
            name="google"
            size={20}
            color="#FF3D00"
            underlayColor="none"
            backgroundColor="white"
            style={styles.authThirdParty}></Icon.Button>
        </View>
        <View style={styles.authThirdPartyColumn}>
          <Icon.Button
            name="facebook"
            size={20}
            underlayColor="none"
            color="#395185"
            backgroundColor="white"
            style={styles.authThirdParty}></Icon.Button>
        </View>
      </View>
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
  auth_signInTitle: {
    marginTop: 46,
    fontSize: 26,
    color: '#121212',
  },
  authButtonTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Mulish-Bold',
    fontSize: 16,
    color: '#F7F7FC',
  },
  auth_alreadyAccount: {
    color: '#6E7191',
    fontWeight: '400',
    fontSize: 16,
    marginTop: 30,
    textAlign: 'center',
  },
  auth_loggedLink: {
    color: '#5F2EEA',
    textDecorationLine: 'underline',
  },
  authQuestion: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  authQuestionTitle: {
    color: '#AAAAAA',
    marginLeft: 20,
    marginRight: 20,
  },
  authSpaceQuestion: {
    marginTop: 10,
    width: '40%',
    height: 2,
    borderWidth: 1,
    borderColor: '#DEDEDE',
  },
  authThirdPartyContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  authThirdParty: {
    marginLeft: 5,
    borderRadius: 12,
    width: 50,
    shadowOffset: 4,
    shadowOpacity: 10,
    shadowColor: 'rgba(0, 0, 0, 0.08)',
  },
  authThirdPartyColumn: {
    width: '14%',
    marginLeft: 5,
    marginRight: 5,
  },
});
