import React, { useState } from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import DateTimePicker from '@react-native-community/datetimepicker';
import DropDown from '../../general_components/dropDown';
import DismissKeyboard from '../../general_components/dismissKeyboard';

const AddJobEntry: React.FC = () => {
  const [showPicker, setShowPicker] = useState(true);

  const [clockIn, setClockIn] = useState(new Date());
  const [hours, setHours] = useState<string>('');

  const onChange: any = (event: any, value: any) => {
    console.log(value);
    setClockIn(value);

    if (Platform.OS === 'android') {
      setShowPicker(false);
    }
  };

  return (
    <>
      <SafeAreaView style={{ backgroundColor: '#34495e' }} />
      <View style={styles.jobHeader}>
        <Text style={styles.jobHeaderText}>Log Shift</Text>
      </View>
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
                onChange={onChange}
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
                value={clockIn}
                style={{ flex: 1, backgroundColor: 'white' }}
                textColor={'#34495e'}
                onChange={onChange}
              />
            </DropDown>
          </View>
          <Text style={styles.headerText}>Information</Text>

          <View style={styles.hoursInputContainer}>
            <Text style={{ fontSize: 16, marginLeft: 8 }}>$</Text>
            <TextInput
              keyboardType="numeric"
              value={hours}
              placeholder="Enter hourly pay..."
              placeholderTextColor={'black'}
              style={styles.hoursInput}
              onChangeText={text => setHours(text)}
            />
          </View>
          <Text style={styles.payOutput}>{hours || 'Example Pay Output'}</Text>
        </View>
      </DismissKeyboard>
      <Pressable style={styles.submit}>
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
