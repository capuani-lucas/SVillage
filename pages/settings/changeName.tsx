import React, { useState } from 'react';
import { Text, StyleSheet, TextInput, Pressable, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { changeName } from '../../redux/actions/actions';
import { RootState } from '../../redux/store';

const ChangeName: React.FC = () => {
  const { name } = useSelector((state: RootState) => state.nameReducer);
  const [input, setInput] = useState<string>(name);
  const dispatch = useDispatch();

  const alert = (passed: boolean): void => {
    if (passed) {
      Alert.alert('Name Changed');
    } else {
      Alert.alert('Name Not Changed', 'The data is malformed');
    }
  };

  const handlePress = () => {
    if (input) {
      dispatch(changeName(input));
      alert(true);
    } else {
      alert(false);
    }
  };

  return (
    <>
      <TextInput
        placeholder="Name on schedule"
        defaultValue={name}
        placeholderTextColor="black"
        style={styles.textInput}
        onChangeText={setInput}
        value={input}
      />

      <Pressable style={styles.submit} onPress={handlePress}>
        <Text style={styles.submitText}>Change Name</Text>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    backgroundColor: 'white',
    padding: 4,
    borderRadius: 8,
    marginTop: 8,
  },

  textInput: {
    height: 80,
    borderWidth: 1,
    padding: 10,
    borderColor: '#34495e',
  },

  submit: {
    backgroundColor: '#34495e',
    marginTop: 8,
    borderRadius: 6,
    padding: 14,
    alignItems: 'center',
  },

  submitText: {
    color: 'white',
  },
});

export default ChangeName;
