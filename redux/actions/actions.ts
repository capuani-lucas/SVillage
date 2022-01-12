import {
  ADD_SCHEDULE,
  CHANGE_NAME,
  ReduxAction,
  REMOVE_FROM_SCHEDULE,
  UPDATE_SHIFT,
} from '../reduxConstants';

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
