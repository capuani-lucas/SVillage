import {
  ADD_LOG,
  ADD_SCHEDULE,
  CHANGE_NAME,
  CHANGE_PAY,
  ReduxAction,
  REMOVE_ALL_LOGS,
  REMOVE_FROM_SCHEDULE,
  REMOVE_LOG,
  UPDATE_SHIFT,
} from '../reduxConstants';

import uuid from 'react-native-uuid';

export const addSchedule = (obj: any): ReduxAction => {
  return {
    type: ADD_SCHEDULE,
    payload: obj,
  };
};

export const removeFromSchedule = (obj: any): ReduxAction => {
  return {
    type: REMOVE_FROM_SCHEDULE,
    payload: obj,
  };
};

export const updateShift = (obj: any): ReduxAction => {
  return {
    type: UPDATE_SHIFT,
    payload: obj,
  };
};

export const changeName = (name: string): ReduxAction => {
  return {
    type: CHANGE_NAME,
    payload: name,
  };
};

export const changePay = (pay: number): ReduxAction => {
  return {
    type: CHANGE_PAY,
    payload: pay,
  };
};

export const addLog = (
  clockIn: string,
  clockOut: string,
  rate: number,
): ReduxAction => {
  return {
    type: ADD_LOG,
    payload: {
      clockIn,
      clockOut,
      rate,
      hours:
        Math.round(
          ((new Date(clockOut).getTime() - new Date(clockIn).getTime()) /
            36e5) *
            100,
        ) / 100,
      id: uuid.v4(),
    },
  };
};

export const removeLog = (id: string): ReduxAction => {
  return {
    type: REMOVE_LOG,
    payload: id,
  };
};

export const removeAllLogs = (): ReduxAction => {
  return {
    type: REMOVE_ALL_LOGS,
    payload: '',
  };
};
