import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';
import { counter } from './counter/slice';

const persistConfig = {
  key: 'root',
  storage,
};

const counterPersistReducer = persistReducer(persistConfig, counter);

export const reducer = {
  counter: counterPersistReducer,
};
