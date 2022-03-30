import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LogObject } from '../../redux/reduxConstants';

const InfoContainer: React.FC<{ logs: Array<LogObject> }> = ({ logs }) => {
  const calculateTotalHours = (): number => {
    let num = 0;
    logs.forEach((val, index) => (num += val.hours));
    return num;
  };

  const calculateTotalIncome = (): number => {
    let num = 0;
    logs.forEach((val, index) => (num += val.hours * val.rate));
    return num;
  };

  return (
    <>
      <View style={[styles.topContainer]}>
        <View style={[styles.viewContainer, styles.topContainerInner]}>
          <Text style={styles.topText}>Hours</Text>
          <Text style={styles.topTextSmall}>
            {calculateTotalHours().toFixed(2)}
          </Text>
        </View>

        <View style={[styles.viewContainer, styles.topContainerInner]}>
          <Text style={styles.topText}>Income</Text>
          <Text style={[styles.topTextSmall]}>
            ${calculateTotalIncome().toFixed(2)}
          </Text>
        </View>
      </View>
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

  topContainer: {
    flexDirection: 'row',
  },

  topContainerInner: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
    padding: 8,
  },

  topText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#34495e',
  },

  topTextSmall: {
    fontSize: 16,
    fontWeight: '500',
    color: '#34495e',
  },
});

export default InfoContainer;
