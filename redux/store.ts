import { combineReducers, createStore } from 'redux';
import {
  logReducer,
  nameReducer,
  payReducer,
  scheduleReducer,
} from './reducers/reducers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';

const schedule = persistReducer(
  {
    key: 'schedule',
    storage: AsyncStorage,
    whitelist: ['schedules'],
  },
  scheduleReducer,
);

const name = persistReducer(
  {
    key: 'name',
    storage: AsyncStorage,
    whitelist: ['name'],
  },
  nameReducer,
);

const logs = persistReducer(
  {
    key: 'logs',
    storage: AsyncStorage,
  },
  logReducer,
);

const pay = persistReducer(
  {
    key: 'pay',
    storage: AsyncStorage,
  },
  payReducer,
);

const rootReducer = combineReducers({
  scheduleReducer: schedule,
  nameReducer: name,
  logReducer: logs,
  payReducer: pay,
});

export const store = createStore(rootReducer);
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof rootReducer>;
