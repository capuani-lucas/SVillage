import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

export const ADD_SCHEDULE: string = 'ADD_SCHEDULE';
export const CHANGE_NAME: string = 'CHANGE_NAME';
export const REMOVE_FROM_SCHEDULE: string = 'REMOVE_FROM_SCHEDULE';
export const UPDATE_SHIFT: string = 'UPDATE_SHIFT';
export const ADD_LOG: string = 'ADD_LOG';
export const CHANGE_PAY: string = 'CHANGE_PAY';
export const REMOVE_LOG: string = 'REMOVE_LOG';
export const REMOVE_ALL_LOGS: string = 'REMOVE_ALL_LOGS';

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

export interface LogObject {
  clockIn: string;
  clockOut: string;
  rate: number;
  hours: number;
  id: string;
}

export interface LogState {
  logs: Array<LogObject>;
}

export interface PayState {
  pay: number;
}

export const payInitialState: PayState = {
  pay: 0,
};

export const logInitialState: LogState = {
  logs: [],
};

export const nameInitialState: NameState = {
  name: '',
};

export interface ReduxAction {
  type: string;
  payload?: any;
}

type StackParamList = {
  Home: undefined;
  AddJobEntry: undefined;
  Settings: undefined;
  Shifts: undefined;
  ShiftsHandler: undefined;
};

export type NavProps = NativeStackNavigationProp<StackParamList>;
