export const ADD_SCHEDULE: string = 'ADD_SCHEDULE';
export const CHANGE_NAME: string = 'CHANGE_NAME';
export const REMOVE_FROM_SCHEDULE: string = 'REMOVE_FROM_SCHEDULE';
export const UPDATE_SHIFT: string = 'UPDATE_SHIFT';

export interface ScheduleObject {
  shifts: any;
}

export interface ScheduleState {
  schedules: Array<ScheduleObject>;
}

export const scheduleInitialState: ScheduleState = {
  schedules: [],
};

export interface NameState {
  name: string;
}

export const nameInitialState: NameState = {
  name: '',
};

export interface ReduxAction {
  type: string;
  payload?: any;
}
