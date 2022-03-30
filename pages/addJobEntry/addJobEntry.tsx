import React, { useState } from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import DropDown from '../../general_components/dropDown';
import DismissKeyboard from '../../general_components/dismissKeyboard';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useNavigation } from '@react-navigation/native';
import { NavProps } from '../../redux/reduxConstants';
import { addLog } from '../../redux/actions/actions';

const AddJobEntry: React.FC = () => {
  const [showPicker, setShowPicker] = useState(true);

  const [clockIn, setClockIn] = useState(new Date());
  const [clockOut, setClockOut] = useState(new Date());

  const { pay } = useSelector((state: RootState) => state.payReducer);
  const [rate, setRate] = useState<string>(pay.toFixed(2));

  const [output, setOutput] = useState<string>('Set Information First');
  const navigation = useNavigation<NavProps>();
  const dispatch = useDispatch();

  const handleClockInChange: any = (event: any, value: any) => {
    setClockIn(value);
    calculateOutput(value, clockOut, rate);
    if (Platform.OS === 'android') {
      setShowPicker(false);
    }
  };

  const handleClockOutChange: any = (event: any, value: any) => {
    setClockOut(value);
    calculateOutput(clockIn, value, rate);
    if (Platform.OS === 'android') {
      setShowPicker(false);
    }
  };

  const calculateHours: any = (firstDate: Date, secondDate: Date) => {
    return (
      Math.round(((secondDate.getTime() - firstDate.getTime()) / 36e5) * 100) /
      100
    );
  };

  const calculateOutput: any = (date1: Date, date2: Date, w: string) => {
    const f: number = parseFloat(w);
    if (!(f > 0)) {
      setOutput('Data not valid');
    } else {
      setOutput(
        `${calculateHours(date1, date2)} hours -- $${
          Math.round(calculateHours(date1, date2) * f * 100) / 100
        }`,
      );
    }
  };

  const alert = (passed: boolean): void => {
    if (passed) {
      Alert.alert('Shift Logged');
    } else {
      Alert.alert(
        'Shift Not Logged',
        'Clock out time must be greater than clock in time and wage cannot be negative.',
      );
    }
  };

  const handlePress = () => {
    if (clockOut.getTime() - clockIn.getTime() <= 0) {
      alert(false);
      return;
    }

    const f: number = parseFloat(rate);
    if (!(f > 0)) {
      alert(false);
      return;
    }

    alert(true);

    dispatch(addLog(clockIn.toISOString(), clockOut.toISOString(), f));
    navigation.navigate('ShiftsHandler');
  };

  return (
    <>
      <DismissKeyboard>
        <View style={styles.container}>
          <Text style={styles.headerText}>Times</Text>

          <View style={{ marginBottom: 10 }}>
            <DropDown title="Select Clock In Time" style={styles.dropDownStyle}>
              <DateTimePicker
                mode={'datetime'}
                display={'spinner'}
                value={clockIn}
                style={{ flex: 1, backgroundColor: 'white' }}
                textColor={'#34495e'}
                onChange={handleClockInChange}
              />
            </DropDown>
          </View>
          <View style={{ marginBottom: 10 }}>
            <DropDown
              title="Select Clock Out Time"
              style={styles.dropDownStyle}>
              <DateTimePicker
                mode={'datetime'}
                display={'spinner'}
                value={clockOut}
                style={{ flex: 1, backgroundColor: 'white' }}
                textColor={'#34495e'}
                onChange={handleClockOutChange}
              />
            </DropDown>
          </View>
          <Text style={styles.headerText}>Information</Text>

          <View style={styles.hoursInputContainer}>
            <Text style={{ fontSize: 16, marginLeft: 8 }}>$</Text>
            <TextInput
              keyboardType="numeric"
              value={rate}
              placeholder="Enter hourly pay..."
              placeholderTextColor={'black'}
              style={styles.hoursInput}
              onChangeText={setRate}
              onEndEditing={_ => calculateOutput(clockIn, clockOut, rate)}
            />
          </View>
          <Text style={styles.payOutput}>{output}</Text>
        </View>
      </DismissKeyboard>
      <Pressable style={styles.submit} onPress={handlePress}>
        <Text style={styles.submitText}>Submit</Text>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  jobHeader: {
    backgroundColor: '#34495e',
    textAlign: 'center',
    padding: 18,
    marginTop: -15,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  jobHeaderText: {
    fontSize: 24,
    color: '#ecf0f1',
    fontWeight: 'bold',
  },
  container: {
    margin: 8,
    flex: 1,
  },
  picker: {
    height: 150,
  },
  dropDownStyle: {
    backgroundColor: 'white',
    padding: 10,
  },
  headerText: {
    color: '#34495e',
    fontWeight: 'bold',
    fontSize: 32,
    margin: 8,
  },
  hoursInput: {
    height: 50,
    padding: 10,
    backgroundColor: 'white',
    flex: 1,
  },
  hoursInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  payOutput: {
    backgroundColor: 'white',
    padding: 14,
    marginTop: 10,
  },
  submit: {
    backgroundColor: '#34495e',
    margin: 8,
    borderRadius: 6,
    padding: 14,
    alignItems: 'center',
    marginBottom: 10,
  },

  submitText: {
    color: 'white',
  },
});

export default AddJobEntry;
