import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const InfoContainer: React.FC = () => {
  return (
    <>
      <View style={[styles.topContainer]}>
        <View style={[styles.viewContainer, styles.topContainerInner]}>
          <Text style={styles.topText}>Hours</Text>
          <Text style={styles.topTextSmall}>548.63</Text>
        </View>

        <View style={[styles.viewContainer, styles.topContainerInner]}>
          <Text style={styles.topText}>Income</Text>
          <Text style={[styles.topTextSmall]}>$9999</Text>
        </View>
      </View>

      <View
        style={[
          styles.viewContainer,
          { padding: 10, alignItems: 'center', margin: 4 },
        ]}>
        <Text style={styles.topTextSmall}>
          Next paycheck: Friday December 4th
        </Text>
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
