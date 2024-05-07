import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userSlice from './features/user/userSlice'
import languageSlice from './features/language/languageSlice'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import localVariableSlice from './features/localVariable/localVariableSlice';
import accountListSlice from './features/accountList/accountListSlice';



const createNoopStorage = (): {
  getItem: (_key: string) => Promise<null>;
  setItem: (_key: string, value: unknown) => Promise<unknown>;
  removeItem: (_key: string) => Promise<void>;
} => {
  return {
    getItem(_key): Promise<null> {
      return Promise.resolve(null);
    },
    setItem(_key, value): Promise<unknown> {
      return Promise.resolve(value);
    },
    removeItem(_key): Promise<void> {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const persistConfig = {
  key: "state",
  version: 1,
  storage: storage
};

const rootReducers = combineReducers({  
  accountList: accountListSlice,
  user: userSlice,
  localVariable: localVariableSlice,
  language: languageSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducers);


export const makeStore = () => {
  return configureStore({
   reducer: persistedReducer,
      devTools: process.env.NODE_ENV !== "production",
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
    }),
  })
}


export type AppStore = ReturnType<typeof makeStore>

export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

