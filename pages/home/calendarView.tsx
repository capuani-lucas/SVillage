import React, { useEffect, useState } from 'react';
import { Calendar } from 'react-native-calendars';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Alert,
  Pressable,
  TextInput,
} from 'react-native';
import { DateData } from 'react-native-calendars/src/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { getCurrentDay, getWorkingTimeAtDate, months } from '../../utils';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { removeFromSchedule, updateShift } from '../../redux/actions/actions';

const CalendarView: React.FC<{ setCurrentDay: any; markedShifts: any }> = ({
  setCurrentDay,
  markedShifts,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [dateToUpdate, setDateToUpdate] = useState<DateData>(getCurrentDay());

  const { name } = useSelector((state: RootState) => state.nameReducer);
  const { schedules } = useSelector(
    (state: RootState) => state.scheduleReducer,
  );

  const [input, setInput] = useState('');

  const dispatch = useDispatch();

  const [currentSelectedDate, setCurrentSelectedDate] = useState(
    getCurrentDay().dateString,
  );
  const pickDay = (day: DateData) => {
    setCurrentSelectedDate(day.dateString);
    setCurrentDay(day);
  };

  const handleSaveData = () => {
    setShowModal(false);

    if (!input) {
      return;
    }

    ReactNativeHapticFeedback.trigger('impactHeavy');
    dispatch(
      updateShift({
        name,
        date: `${months[dateToUpdate.month - 1]}${dateToUpdate.day}`,
        newTime: input,
      }),
    );

    setInput('');
  };

  const handleLongPress = (day: DateData) => {
    ReactNativeHapticFeedback.trigger('impactLight');
    setDateToUpdate(day);
    setShowModal(true);
  };

  const handleDeleteData = () => {
    dispatch(
      removeFromSchedule({
        name,
        date: `${months[dateToUpdate.month - 1]}${dateToUpdate.day}`,
      }),
    );
    ReactNativeHapticFeedback.trigger('impactHeavy');
    setShowModal(false);
    setInput('');
  };

  const confirmDeleteData = () => {
    Alert.alert(
      'Are you sure?',
      'Are you sure you want to remove this shift?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        { text: 'OK', onPress: handleDeleteData },
      ],
    );
  };

  return (
    <>
      {showModal && (
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={showModal}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setShowModal(!showModal);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                {!name ? (
                  <Text>Go to settings and set your name first!</Text>
                ) : (
                  <>
                    <View
                      style={{
                        position: 'absolute',
                        right: 5,
                        top: 5,
                      }}>
                      <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={_ => setShowModal(false)}>
                        <Text style={styles.textStyle}>X</Text>
                      </Pressable>
                    </View>
                    <Text>Change Hours For Shift</Text>
                    <Text></Text>
                    <TextInput
                      value={input}
                      onChangeText={setInput}
                      placeholder={getWorkingTimeAtDate(
                        schedules[0],
                        name,
                        months[dateToUpdate?.month - 1],
                        dateToUpdate?.day,
                      )}
                      placeholderTextColor="black"
                      style={styles.input}
                    />
                  </>
                )}
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={handleSaveData}>
                    <Text style={styles.textStyle}>Save Shift</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.buttonRed]}
                    onPress={confirmDeleteData}>
                    <Text style={styles.textStyle}>Cancel Shift</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      )}

      <View style={{ marginTop: 10 }}>
        <Calendar
          current={currentSelectedDate}
          markedDates={{
            ...markedShifts,
            [currentSelectedDate]: {
              selected: true,
              selectedColor: '#34495e',
              selectedTextColor: 'white',
            },
          }}
          onDayPress={pickDay}
          onDayLongPress={handleLongPress}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginLeft: 5,
    marginRight: 5,
  },
  buttonRed: {
    backgroundColor: '#c44d56',
  },
  buttonClose: {
    backgroundColor: '#34495e',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'lightgrey',
    width: 200,
    borderRadius: 12,
    padding: 12,
    margin: 12,
  },
});

export default CalendarView;
