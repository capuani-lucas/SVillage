import React, { useState } from 'react';
import { Text, StyleSheet, TextInput, Pressable, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addSchedule } from '../../redux/actions/actions';
import { RootState } from '../../redux/store';
import { PASSWORD } from '../../safe';

const FetchSchedule: React.FC = () => {
  const dispatch = useDispatch();
  const { schedules } = useSelector(
    (state: RootState) => state.scheduleReducer,
  );

  const checkPassword = (password: string) => {
    if (password === PASSWORD) {
    } else {
      Alert.alert('No access');
    }
  };

  const handlePress = () => {
    Alert.prompt(
      'Enter password',
      'Enter password to retrieve schedule data',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: password => checkPassword(password || ''),
        },
      ],
      'secure-text',
    );
  };

  return (
    <>
      <Pressable style={styles.submit} onPress={handlePress}>
        <Text style={styles.submitText}>Update</Text>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  submit: {
    backgroundColor: '#34495e',
    marginTop: 8,
    borderRadius: 6,
    padding: 14,
    alignItems: 'center',
    marginBottom: 10,
    height: 80,
    justifyContent: 'center',
  },

  submitText: {
    color: 'white',
    fontSize: 20,
  },
});

export default FetchSchedule;
