import {combineReducers, createStore} from 'redux';
import {nameReducer, scheduleReducer} from './reducers/reducers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';

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

const rootReducer = combineReducers({
  scheduleReducer: schedule,
  nameReducer: name,
});

export const store = createStore(rootReducer);
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof rootReducer>;
