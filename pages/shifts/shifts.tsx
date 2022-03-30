import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import ActionButtons from './actionButtons';
import InfoContainer from './infoContainer';
import ShiftScroll from './shiftScroll';

const Shifts: React.FC = () => {
  const { logs } = useSelector((state: RootState) => state.logReducer);
  const [filterLogs, setFilterLogs] = useState(logs);

  useEffect(() => {
    setFilterLogs(logs);
  }, [logs]);

  return (
    <>
      <View style={styles.container}>
        <InfoContainer logs={filterLogs} />
        <ShiftScroll logs={filterLogs} />
        <ActionButtons logs={logs} filterFunc={setFilterLogs} />
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
