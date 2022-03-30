import React from 'react';
import {
  Alert,
  FlatList,
  ListRenderItem,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { removeLog } from '../../redux/actions/actions';
import { LogObject } from '../../redux/reduxConstants';

const ShiftScroll: React.FC<{ logs: Array<LogObject> }> = ({ logs }) => {
  const dispatch = useDispatch();

  const getDateString = (date: string): string => {
    let d = new Date(date);
    const o = d.getTimezoneOffset();
    d = new Date(d.getTime() - o * 60 * 1000);
    return d.toISOString().split('T')[0];
  };

  const createAlert = (message: string, id: string) =>
    Alert.alert('Manage Entry', message, [
      {
        text: 'Delete',
        onPress: () => dispatch(removeLog(id)),
        style: 'cancel',
      },
      { text: 'OK' },
    ]);

  const Item = ({ clockIn, clockOut, rate, hours, id }: LogObject) => (
    <Pressable
      onPress={_ =>
        createAlert(
          `\nClocked In: ${new Date(clockIn)}\n\nClocked Out: ${new Date(
            clockOut,
          )}`,
          id,
        )
      }>
      <View
        style={[styles.header, { margin: 2, justifyContent: 'space-between' }]}>
        <Text style={styles.headerText}>{getDateString(clockIn)}</Text>
        <Text style={styles.headerText}>{hours.toFixed(2)}</Text>
        <Text style={styles.headerText}>${rate.toFixed(2)}</Text>
        <Text style={[styles.headerText, { color: 'green' }]}>
          ${(rate * hours).toFixed(2)}
        </Text>
      </View>
    </Pressable>
  );

  const renderItem: ListRenderItem<LogObject> = ({ item }) => (
    <Item
      clockIn={item.clockIn}
      clockOut={item.clockOut}
      rate={item.rate}
      hours={item.hours}
      id={item.id}
    />
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={[styles.header, { marginBottom: 16 }]}>
        <Text style={styles.headerText}>yyyy-mm-dd</Text>
        <Text style={styles.headerText}>Hours</Text>
        <Text style={styles.headerText}>Rate</Text>
        <Text style={[styles.headerText, { color: 'green', marginRight: 30 }]}>
          Pay
        </Text>
      </View>

      <FlatList data={logs} renderItem={renderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: { flex: 1 },
  header: {
    backgroundColor: 'white',
    margin: 4,
    padding: 10,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#34495e',
  },
});

export default ShiftScroll;
