import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { noDataMessage } from '../../utils';

const WorkingWithView: React.FC<{ workingWith: any }> = ({ workingWith }) => {
  if (workingWith === noDataMessage || workingWith.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No data for today.</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Working Today</Text>

        {workingWith.map((val: any, index: number) => {
          return (
            <View
              style={[
                styles.nameContainer,
                {
                  backgroundColor:
                    index % 2 == 0 ? 'rgba(220,220, 220, 0.3)' : 'white',
                },
              ]}
              key={index}>
              <Text style={styles.label}>{val.name}</Text>
              <Text style={styles.label}>{val.time}</Text>
            </View>
          );
        })}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },

  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 3,
  },

  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#34495e',
    marginBottom: 8,
  },

  label: {
    fontSize: 18,
    fontWeight: '500',
    color: '#34495e',
  },
});

export default WorkingWithView;
