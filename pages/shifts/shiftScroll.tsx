import React from 'react';
import {
  FlatList,
  ListRenderItem,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface TempData {
  date: string;
  hours: number;
  rate: number;
  pay: number;
}

const ShiftScroll: React.FC = () => {
  const data: TempData[] = [
    { date: '03-01-2022', hours: 8.5, rate: 18.0, pay: 153 },
    { date: '05-01-2022', hours: 8.5, rate: 18.0, pay: 153 },
    { date: '05-01-2022', hours: 8.5, rate: 18.0, pay: 153 },
    { date: '05-01-2022', hours: 8.5, rate: 18.0, pay: 153 },
    { date: '05-01-2022', hours: 8.5, rate: 18.0, pay: 153 },
    { date: '05-01-2022', hours: 8.5, rate: 18.0, pay: 153 },
    { date: '05-01-2022', hours: 8.5, rate: 18.0, pay: 153 },
    { date: '05-01-2022', hours: 8.5, rate: 18.0, pay: 153 },
    { date: '05-01-2022', hours: 8.5, rate: 18.0, pay: 153 },
    { date: '05-01-2022', hours: 8.5, rate: 18.0, pay: 153 },
    { date: '05-01-2022', hours: 8.5, rate: 18.0, pay: 153 },
    { date: '05-01-2022', hours: 8.5, rate: 18.0, pay: 153 },
    { date: '05-01-2022', hours: 8.5, rate: 18.0, pay: 153 },
    { date: '05-01-2022', hours: 8.5, rate: 18.0, pay: 153 },
    { date: '05-01-2022', hours: 8.5, rate: 18.0, pay: 153 },
    { date: '05-01-2022', hours: 8.5, rate: 18.0, pay: 153 },
    { date: '05-01-2022', hours: 8.5, rate: 18.0, pay: 153 },
    { date: '05-01-2022', hours: 8.5, rate: 18.0, pay: 153 },
    { date: '05-01-2022', hours: 8.5, rate: 18.0, pay: 153 },
    { date: '05-01-2022', hours: 8.5, rate: 18.0, pay: 153 },
    { date: '05-01-2022', hours: 8.5, rate: 18.0, pay: 153 },
    { date: '05-01-2022', hours: 8.5, rate: 18.0, pay: 153 },
  ];

  const Item = ({ date, hours, rate, pay }: TempData) => (
    <View
      style={[styles.header, { margin: 2, justifyContent: 'space-between' }]}>
      <Text style={styles.headerText}>{date}</Text>
      <Text style={styles.headerText}>{hours.toFixed(2)}</Text>
      <Text style={styles.headerText}>${rate.toFixed(2)}</Text>
      <Text style={[styles.headerText, { color: 'green' }]}>
        ${pay.toFixed(2)}
      </Text>
    </View>
  );

  const renderItem: ListRenderItem<TempData> = ({ item }) => (
    <Item date={item.date} hours={item.hours} rate={item.rate} pay={item.pay} />
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={[styles.header, { marginBottom: 16 }]}>
        <Text style={styles.headerText}>DD/MM/YYYY</Text>
        <Text style={styles.headerText}>Hours</Text>
        <Text style={styles.headerText}>Rate</Text>
        <Text style={[styles.headerText, { color: 'green', marginRight: 30 }]}>
          Pay
        </Text>
      </View>

      <FlatList data={data} renderItem={renderItem} />

      <Text>Hey there</Text>
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
