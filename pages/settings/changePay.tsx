import React, { useState } from 'react';
import { Text, StyleSheet, TextInput, Pressable, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { changePay } from '../../redux/actions/actions';
import { RootState } from '../../redux/store';

const ChangePay: React.FC = () => {
  const { pay } = useSelector((state: RootState) => state.payReducer);
  const [input, setInput] = useState<string>(pay.toFixed(2));
  const dispatch = useDispatch();

  const alert = (passed: boolean): void => {
    if (passed) {
      Alert.alert('Wage Changed');
    } else {
      Alert.alert('Wage Not Changed', 'The data is malformed');
    }
  };

  const handlePress = () => {
    const f: number = parseFloat(input);
    if (!(f > 0)) {
      alert(false);
    } else {
      dispatch(changePay(Math.round(f * 100) / 100));
      alert(true);
    }
  };

  return (
    <>
      <TextInput
        placeholder="Hourly Wage"
        defaultValue={pay.toString()}
        placeholderTextColor="black"
        style={styles.textInput}
        onChangeText={setInput}
        value={input}
      />

      <Pressable style={styles.submit} onPress={handlePress}>
        <Text style={styles.submitText}>Change Wage</Text>
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
    marginBottom: 15,
  },

  submitText: {
    color: 'white',
  },
});

export default ChangePay;
