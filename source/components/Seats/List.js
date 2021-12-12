import React, {useEffect, useState} from 'react';
import {View, TouchableHighlight, StyleSheet} from 'react-native';

export default function ListSeats({
  keyAlphabet,
  selectedSeats,
  soldSeats,
  chooseSeats,
}) {
  const [leftSeats, setLeftSeats] = useState([1, 2, 3, 4, 5, 6]);
  const [rightSeats, setRightSeats] = useState([7, 8, 9, 10, 11, 12]);

  const seatsListAlphabet = () => {
    const leftSeatsValue = leftSeats.map(value => `${keyAlphabet}${value}`);
    const rightSeatsValue = rightSeats.map(value => `${keyAlphabet}${value}`);
    setLeftSeats(leftSeatsValue);
    setRightSeats(rightSeatsValue);
  };

  useEffect(() => {
    seatsListAlphabet();
  }, []);

  return (
    <View style={styles.Seat_ListSeats}>
      <View style={styles.Seat_ListSeats_column}>
        {leftSeats.map((num, idx) => (
          <TouchableHighlight
            key={idx}
            underlayColor="none"
            onPress={() => {
              soldSeats.includes(num) ? null : chooseSeats(num);
            }}>
            <View
              style={
                soldSeats.includes(num)
                  ? styles.Seat_ListSeats_choose_sold
                  : selectedSeats.includes(num)
                  ? styles.Seat_ListSeats_choose_selected
                  : styles.Seat_ListSeats_choose_available
              }></View>
          </TouchableHighlight>
        ))}
      </View>
      <View style={styles.Seat_ListSeats_column_space}></View>
      <View style={styles.Seat_ListSeats_column}>
        {rightSeats.map((num, idx) => (
          <TouchableHighlight
            key={idx}
            underlayColor="none"
            onPress={() => {
              soldSeats.includes(num) ? null : chooseSeats(num);
            }}>
            <View
              style={
                soldSeats.includes(num)
                  ? styles.Seat_ListSeats_choose_sold
                  : selectedSeats.includes(num)
                  ? styles.Seat_ListSeats_choose_selected
                  : styles.Seat_ListSeats_choose_available
              }></View>
          </TouchableHighlight>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Seat_ListSeats: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  Seat_ListSeats_column: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '53%',
  },
  Seat_ListSeats_column_space: {
    width: '2%',
  },
  Seat_SeatsContainer: {
    marginTop: 16,
  },
  Seat_ListSeats_choose_available: {
    backgroundColor: '#D6D8E7',
    width: 14,
    height: 14,
    borderRadius: 2,
    marginHorizontal: 3,
    marginTop: 6,
    marginVertical: 2,
  },
  Seat_ListSeats_choose_sold: {
    backgroundColor: '#6E7191',
    width: 14,
    height: 14,
    borderRadius: 2,
    marginHorizontal: 3,
    marginTop: 6,
    marginVertical: 2,
  },
  Seat_ListSeats_choose_selected: {
    backgroundColor: '#5F2EEA',
    width: 14,
    height: 14,
    borderRadius: 2,
    marginHorizontal: 3,
    marginTop: 6,
    marginVertical: 2,
  },
});
