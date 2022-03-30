import React, { useState } from 'react';
import { Text, StyleSheet, TextInput, Pressable, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { removeAllLogs } from '../../redux/actions/actions';
import { RootState } from '../../redux/store';

const DeleteLogs: React.FC = () => {
  const dispatch = useDispatch();

  const confirm = () => {
    Alert.alert('Please confirm', 'This action cannot be reversed', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      { text: 'OK', onPress: () => dispatch(removeAllLogs()) },
    ]);
  };

  const handlePress = () => {
    Alert.alert('Delete all logs?', 'This will remove all logged shifts', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      { text: 'OK', onPress: () => confirm() },
    ]);
  };

  return (
    <>
      <Pressable style={styles.submit} onPress={handlePress}>
        <Text style={styles.submitText}>Delete Logs</Text>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  submit: {
    backgroundColor: '#c44d56',
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

export default DeleteLogs;
