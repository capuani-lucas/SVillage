import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import WorkingWithView from './workingWithView';
import CalendarView from './calendarView';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {DateData} from 'react-native-calendars/src/types';
import {
  getAllWorkingOnDate,
  getCurrentDay,
  getMarkedShifts,
  getWorkingTimeAtDate,
  months,
  notWorkingMessage,
} from '../../utils';
import {ScheduleObject} from '../../redux/reduxConstants';

const Home: React.FC = () => {
  const {name} = useSelector((state: RootState) => state.nameReducer);
  const {schedules} = useSelector((state: RootState) => state.scheduleReducer);
  const markedShifts = getMarkedShifts(schedules[0], name);

  const [currentDay, changeCurrentDay] = useState<DateData>(getCurrentDay());

  const getTime = (data: DateData): string => {
    if (!name) {
      return '';
    }
    const n: string = name;

    return getWorkingTimeAtDate(
      schedules[0],
      n,
      months[data?.month - 1],
      data?.day,
    );
  };

  const getWorkingWith = (data: DateData): any => {
    return getAllWorkingOnDate(
      schedules[0],
      months[data?.month - 1],
      data?.day,
    );
  };

  const [workingTime, setWorkingTime] = useState<string>(getTime(currentDay));
  const [workingWith, setWorkingWith] = useState<any>(
    getWorkingWith(currentDay),
  );

  const setCurrentDay = (data: DateData) => {
    // TODO: ADD MARKED DATES

    console.log(data);
    setWorkingTime(getTime(data));
    setWorkingWith(getWorkingWith(data));
  };

  return (
    <>
      <SafeAreaView style={{backgroundColor: '#34495e'}} />
      <View style={styles.jobHeader}>
        <Text style={styles.jobHeaderText}>The Sports Village</Text>
      </View>

      <View style={styles.container}>
        <View style={[styles.viewContainer, styles.workingContainer]}>
          <Image
            style={styles.zamboniLogo}
            source={require('../../assets/zamboni-removebg-preview.png')}
          />
          <Text
            style={{
              color: workingTime !== notWorkingMessage ? '#34495e' : '#e74c3c',
              fontSize: 18,
              fontWeight: '700',
            }}>
            {workingTime}
          </Text>
        </View>

        <ScrollView>
          <CalendarView
            setCurrentDay={setCurrentDay}
            markedShifts={markedShifts}
          />
          <WorkingWithView workingWith={workingWith} />
          <View style={{marginBottom: 250}}></View>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 8,
  },

  zamboniLogo: {
    width: 50,
    height: 50,
    marginRight: 10,
    marginLeft: -30,
  },

  viewContainer: {
    backgroundColor: 'white',
    padding: 4,
    borderRadius: 8,
    marginTop: 8,
  },

  workingContainer: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  jobHeader: {
    backgroundColor: '#34495e',
    alignSelf: 'stretch',
    textAlign: 'center',
    padding: 18,
    marginTop: -20,
  },

  jobHeaderText: {
    fontSize: 24,
    color: '#ecf0f1',
    fontWeight: 'bold',
  },
});

export default Home;
