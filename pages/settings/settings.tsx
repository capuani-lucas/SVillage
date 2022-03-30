import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AddSchedule from './addSchedule';
import ChangeName from './changeName';
import ChangePay from './changePay';
import DeleteLogs from './deleteLogs';
import FetchSchedule from './fetchSchedule';

const Settings: React.FC = () => {
  return (
    <>
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.header}>Update Schedule</Text>
          <FetchSchedule />
          <Text style={styles.header}>Manually Add Schedule</Text>
          <AddSchedule />
          <Text style={styles.header}>Set Name</Text>
          <ChangeName />
          <Text style={styles.header}>Set Wage</Text>
          <ChangePay />
          <Text style={styles.header}>Delete Logged Shifts</Text>
          <DeleteLogs />
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 8,
  },
  jobHeader: {
    backgroundColor: '#34495e',
    alignSelf: 'stretch',
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

  viewContainer: {
    backgroundColor: 'white',
    padding: 4,
    borderRadius: 8,
    marginTop: 8,
  },

  header: {
    color: '#34495e',
    fontWeight: 'bold',
    margin: 6,
    fontSize: 22,
  },
});

export default Settings;
