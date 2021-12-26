import { ADD_SCHEDULE, CHANGE_NAME, ReduxAction } from '../reduxConstants';

export const addSchedule = (obj: any): ReduxAction => {
  return {
    type: ADD_SCHEDULE,
    payload: obj,
  };
};

export const changeName = (name: string): ReduxAction => {
  return {
    type: CHANGE_NAME,
    payload: name,
  };
};
