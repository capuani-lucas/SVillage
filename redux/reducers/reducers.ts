import {
  ADD_SCHEDULE,
  CHANGE_NAME,
  nameInitialState,
  NameState,
  ReduxAction,
  REMOVE_FROM_SCHEDULE,
  scheduleInitialState,
  ScheduleObject,
  ScheduleState,
  UPDATE_SHIFT,
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
      var schedules: Array<ScheduleObject> = [...state.schedules];

      if (schedules.length === 0) {
        schedules.push(action.payload);
        return { schedules };
      }

      var schedule: ScheduleObject = schedules[0];

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

      schedules[0] = { shifts: obj3 };

      return {
        schedules,
      };

    case REMOVE_FROM_SCHEDULE:
      var schedules: Array<ScheduleObject> = [...state.schedules];

      if (schedules.length === 0) {
        return { schedules };
      }

      var schedule: ScheduleObject = schedules[0];

      if (
        schedule.shifts === undefined ||
        schedule.shifts[action.payload.date] === undefined ||
        schedule.shifts[action.payload.date].people === undefined
      )
        return { schedules };

      var forDate = schedule.shifts[action.payload.date];
      var newPeople = [];

      for (let i = 0; i < forDate.people.length; i++) {
        if (forDate.people[i].name !== action.payload.name) {
          newPeople.push(forDate.people[i]);
        }
      }

      schedule.shifts[action.payload.date].people = newPeople;

      return { schedules: [schedule] };

    case UPDATE_SHIFT:
      var schedules: Array<ScheduleObject> = [...state.schedules];

      if (schedules.length === 0) {
        return { schedules };
      }

      var schedule: ScheduleObject = schedules[0];

      if (
        schedule.shifts === undefined ||
        schedule.shifts[action.payload.date] === undefined ||
        schedule.shifts[action.payload.date].people === undefined
      )
        return { schedules };

      var forDate = schedule.shifts[action.payload.date];

      for (let i = 0; i < forDate.people.length; i++) {
        if (forDate.people[i].name === action.payload.name) {
          forDate.people[i].time = action.payload.newTime;
        }
      }

      schedule.shifts[action.payload.date] = forDate;

      return { schedules: [schedule] };

    default:
      return state;
  }
};
