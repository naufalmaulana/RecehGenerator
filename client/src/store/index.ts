import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice';
import counterReducer from './appSlice/index';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    counter: counterReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch