import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { DateData } from 'react-native-calendars/src/types';
import { LogObject, NavProps } from '../../redux/reduxConstants';
import { getDaysBetween } from '../../utils';

interface Loose {
  [key: string]: any;
}

const ActionButtons: React.FC<{ filterFunc: any; logs: Array<LogObject> }> = ({
  filterFunc,
  logs,
}) => {
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation<NavProps>();

  const [selectingFirst, setSelectingFirst] = useState(true);
  const [selectedFirst, setSelectedFirst] = useState<number>(0);
  const [selectedSecond, setSelectedSecond] = useState<number>(0);

  const [markedDates, setMarkedDates] = useState({});

  const createFilter = () => {
    const start = new Date(selectedFirst);
    const end = new Date(selectedSecond);
    start.setUTCHours(0, 0, 0, 0);
    end.setUTCHours(23, 59, 59, 999);

    filterFunc(
      logs.filter(log => {
        let date1 = new Date(log.clockIn);
        const offset = date1.getTimezoneOffset();
        date1 = new Date(date1.getTime() - offset * 60 * 1000);
        return date1 >= start && date1 <= end;
      }),
    );
  };

  const handleRemoveFilter = () => {
    setShowModal(false);
    setSelectedFirst(0);
    setSelectedSecond(0);
    filterFunc(logs);
    setMarkedDates({});
  };

  const daySelection = (date: DateData) => {
    if (selectingFirst) {
      let obj: Loose = {};
      obj[date.dateString] = {
        startingDay: true,
        color: '#34495e',
        textColor: 'white',
      };

      setSelectedFirst(date.timestamp);
      setMarkedDates({
        ...obj,
      });
      setSelectingFirst(false);
    } else {
      const first = new Date(selectedFirst);
      first.setDate(first.getDate() + 1);
      const between = getDaysBetween(first, new Date(date.timestamp));

      const obj: Loose = {
        ...markedDates,
      };

      between.forEach(v => {
        obj[v] = { color: '#2E5A88', textColor: 'white' };
      });

      obj[date.dateString] = {
        endingDay: true,
        color: '#34495e',
        textColor: 'white',
      };

      setSelectedSecond(date.timestamp);
      setMarkedDates({ ...obj });
      setSelectingFirst(true);
    }
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
                <View
                  style={{
                    position: 'absolute',
                    right: 5,
                    top: 5,
                  }}>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={handleRemoveFilter}>
                    <Text style={styles.textStyle}>X</Text>
                  </Pressable>
                </View>
                <Calendar
                  markingType={'period'}
                  markedDates={markedDates}
                  onDayPress={daySelection}
                />

                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={_ => {
                    setShowModal(false);
                    createFilter();
                  }}>
                  <Text style={styles.textStyle}>Create Filter</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
      )}
      <View style={styles.horizontal}>
        <Pressable onPress={_ => setShowModal(true)} hitSlop={25}>
          <Image
            source={require('../../assets/107799.png')}
            style={styles.image}
          />
        </Pressable>
        <Pressable
          onPress={_ => navigation.navigate('AddJobEntry')}
          hitSlop={25}>
          <Image
            source={require('../../assets/icons8-plus-+-50.png')}
            style={styles.image}
          />
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginTop: 5,
  },
  image: {
    width: 20,
    height: 20,
    tintColor: 'black',
  },
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
  buttonClose: {
    backgroundColor: '#34495e',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ActionButtons;
