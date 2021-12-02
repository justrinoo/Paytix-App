import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
export default function InputComponent({
  childrenType,
  childrenPlaceHolder,
  childrenOnChange,
  childrenText,
  isPassword,
}) {
  return (
    <>
      <View>
        <View style={styles.inputComponentContainer}>
          <Text style={styles.inputComponentLabel}>{childrenText}</Text>
          <TextInput
            keyboardType={childrenType}
            style={[styles.inputComponent]}
            placeholderTextColor="#A0A3BD"
            placeholder={childrenPlaceHolder}
            onChangeText={childrenOnChange}
            secureTextEntry={isPassword ? true : null}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  inputComponentContainer: {
    marginTop: 29,
  },
  inputComponent: {
    paddingHorizontal: 24,
    paddingVertical: 18,
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#DEDEDE',
    color: '#A0A3BD',
    fontSize: 16,
  },
  inputComponentLabel: {
    marginBottom: 12,
    color: '#4E4B66',
    fontSize: 16,
  },
});
