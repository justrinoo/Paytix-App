import React, {useState} from 'react';
import {View, Image, StyleSheet, Text, Touch, ScrollView} from 'react-native';
import {Input, Button} from '../../components';
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from '../../utils/axios';
export default function SignUp({navigation}) {
  const [showEyeStatus, setShowEyeStatus] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    try {
      const setDataFormSubmit = {
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
      };

      const response = await axios.post('auth/register', setDataFormSubmit);

      console.log('Submit Prevent running..', setDataFormSubmit);
      console.log('Success Create Account', response.data);
    } catch (error) {
      console.log('Failed to create account.', error);
    }
  };

  // console.log(showEyeStatus);

  return (
    <ScrollView contentContainerStyle={styles.auth_signupContainer}>
      <Image
        source={require('../../assets/images/tickitz.png')}
        style={styles.auth_signupImage}
      />
      <Text style={styles.auth_signupTitle}>Sign Up</Text>
      <Input
        childrenType="default"
        childrenText="First Name"
        childrenOnChange={firstNameText => setFirstName(firstNameText)}
        childrenPlaceHolder="Write your firstName"
      />
      <Input
        childrenType="default"
        childrenText="Last Name"
        childrenOnChange={lastNameText => setLastName(lastNameText)}
        childrenPlaceHolder="Write your lastName"
      />
      <Input
        childrenType="email-address"
        childrenText="Email"
        childrenOnChange={emailText => setEmail(emailText)}
        childrenPlaceHolder="Write your email"
      />
      <Input
        childrenType="numeric"
        childrenText="Phone Number"
        childrenOnChange={phoneNumberText => setPhoneNumber(phoneNumberText)}
        childrenPlaceHolder="Write your PhoneNumber"
      />
      <View style={styles.authContainerEye}>
        <Icon
          name="eye-slash"
          color="#A0A3BD"
          size={15}
          style={styles.auth_Eye}
        />

        <Input
          childrenText="Password"
          isPassword
          childrenOnChange={passwordText => setPassword(passwordText)}
          childrenPlaceHolder="Write your password"
        />
      </View>
      <Button childrenOnPress={handleSubmit}>
        <Text style={styles.authButtonTitle}>Join for free</Text>
      </Button>

      <View>
        <Text style={styles.auth_alreadyAccount}>
          Do you already have an account?{' '}
          <Text
            style={styles.auth_loggedLink}
            onPress={() => navigation.navigate('Login')}>
            Login
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
    </ScrollView>
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
  auth_signupTitle: {
    marginTop: 46,
    fontWeight: '600',
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
  authContainerEye: {
    position: 'relative',
  },
  auth_Eye: {
    right: 20,
    bottom: 25,
    position: 'absolute',
  },
});
