import {
  ADD_SCHEDULE,
  CHANGE_NAME,
  nameInitialState,
  NameState,
  ReduxAction,
  scheduleInitialState,
  ScheduleObject,
  ScheduleState,
} from '../reduxConstants';

export const nameReducer = (
  state: NameState = nameInitialState,
  action: ReduxAction,
): NameState => {
  switch (action.type) {
    case CHANGE_NAME:
      return {
        name: action.payload,
      };
    default:
      return state;
  }
};

export const scheduleReducer = (
  state: ScheduleState = scheduleInitialState,
  action: ReduxAction,
): ScheduleState => {
  switch (action.type) {
    case ADD_SCHEDULE:
      const schedules: Array<ScheduleObject> = [...state.schedules];

      if (schedules.length === 0) {
        schedules.push(action.payload);
        return {schedules};
      }

      const schedule: ScheduleObject = schedules[0];

      const obj1: any = schedule.shifts;
      const obj2: any = action.payload.shifts;

      let obj3: any = obj1;

      const newKeys: Array<string> = Object.keys(obj2);
      for (let i = 0; i < newKeys.length; i++) {
        obj3[newKeys[i]] = obj2[newKeys[i]];
      }

      const check: Array<string> = Object.keys(obj3);
      if (check.length > 90) {
        const temp: any = {};
        for (let i = 30; i < check.length; i++) {
          temp[check[i]] = obj3[check[i]];
        }
        obj3 = temp;
      }

      schedules[0] = {shifts: obj3};

      return {
        schedules,
      };

    default:
      return state;
  }
};
