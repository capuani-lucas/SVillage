import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import InfoContainer from './infoContainer';
import ShiftScroll from './shiftScroll';

const Shifts: React.FC = () => {
  return (
    <>
      <SafeAreaView style={{ backgroundColor: '#34495e' }} />
      <View style={styles.jobHeader}>
        <Text style={styles.jobHeaderText}>Shifts</Text>
      </View>

      <View style={styles.container}>
        <InfoContainer />
        <ShiftScroll />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 8,
    flex: 1,
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
});

export default Shifts;
